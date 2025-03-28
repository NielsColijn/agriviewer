<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCompanyRequest;
use App\Http\Requests\UpdateCompanyRequest;
use App\Http\Resources\CompanyResource;
use App\Models\Company;
use App\Models\KlwDump;
use App\Models\KlwField;
use App\Models\KlwValue;
use App\Models\KvkNumber;
use App\Models\SystemLog;
use App\Models\UmdlCollective;
use App\Models\UmdlCollectiveCompany;
use App\Models\UmdlCompanyProperties;
use App\Models\UmdlKpiValues;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CompanyController extends Controller
{
    /**
     * Display a listing of all companies.
     */
    public function index(): AnonymousResourceCollection
    {
        return CompanyResource::collection(
            Company::query()->orderBy('name')->get()
        );
    }

    /**
     * Display a listing of all companies with data anonymized.
     */
    public function anonymous(): AnonymousResourceCollection
    {
        $companies = Company::all();
        $modified_companies = array();

        foreach($companies as $company) {
            $company->name = "...";
            $company->address = "...";
            $company->postal_code = "...";
            $company->city = "...";
            $company->province = "...";
            $company->brs = "...";
            $company->ubn = "...";
            $company->phone = "...";
            $company->bank_account = "...";
            $company->bank_account_name = "...";
            $company->email = "...";
            $company->type = "...";
            $company->bio = false;

            $modified_companies[] = $company;
        }
        return CompanyResource::collection($modified_companies);
    }

    public function getcurrentcollective(): AnonymousResourceCollection
    {
        $collectiveId = Auth::user()->collectives()->first()->id;

        $companies = Company::whereHas('collectives', function ($query) use ($collectiveId) {
            $query->where('umdl_collectives.id', $collectiveId);
        })->orderBy('name')->get();

        return CompanyResource::collection($companies);
    }

    /**
     * Get standard properties of a company
     */
    public function getcompany($id): Company
    {
        // 1. Get all data
        $company = Company::where('id', $id)->first();

        // 2. Add KVK-numbers
        $kvk_string = "";
        $kvks = KvkNumber::where('company_id', $id)->get();

        foreach ($kvks as $kvk) {
            $kvk_string .= $kvk->kvk . ", ";
        }

        if ($kvk_string != "") {
            $kvk_string = substr($kvk_string, 0, -2);
        }
        $company->kvks = $kvk_string;

        // 3. Add collectieven
        $collectief_companies = UmdlCollectiveCompany::where('company_id', $id)->get();
        $collectieven_data = array();
        foreach ($collectief_companies as $collectief_company) {

            $collectief = UmdlCollective::where('id', $collectief_company->collective_id)->first();
            $collectieven_data[] = array(
                'id' => $collectief->id,
                'name' => $collectief->name,
            );
        }

        $company->collectieven = $collectieven_data;

        return $company;
    }

    /**
     * Get standard properties of a company, anonymized
     */
    public function getcompanyanon($id): Company
    {
        // 1. Get all data
        $company = Company::where('id', $id)->first();
        $company->name = "...";
        $company->address = "...";
        $company->postal_code = "...";
        $company->city = "...";
        $company->province = "...";
        $company->brs = "...";
        $company->ubn = "...";
        $company->phone = "...";
        $company->bank_account = "...";
        $company->bank_account_name = "...";
        $company->email = "...";
        $company->type = "...";
        $company->bio = false;

        // 2. Add KVK-numbers
        $kvk_string = "...";
        $company->kvks = $kvk_string;

        // 3. Add collectieven
        $company->collectieven = "...";

        return $company;
    }

    /**
     * Get UMDL-specific properties of a company
     */
    public function getproperties($id): UmdlCompanyProperties
    {
        return UmdlCompanyProperties::where('company_id', $id)->first();
    }

    public function saveproperties(Request $request)
    {
        $properties = UmdlCompanyProperties::where('company_id', $request['id'])->first();

        $properties->name = $request['name'];
        $properties->save();

        return response()->json(['success' => true]);
    }

    public function getCompanyFields(Request $request)
    {
        // Get the fieldnames from the request
        $fieldNames = $request->input('fields');

        // Fetch the fields by the provided fieldnames
        $fields = KlwField::whereIn('fieldname', $fieldNames)->get();
        $fieldIds = $fields->pluck('id')->toArray();

        // Fetch companies with their related dumps
        $companies = Company::select('companies.id', 'companies.name')
            ->with('klwDumps')
            ->get();

        // Prepare the response data
        $data = [];

        foreach ($companies as $company) {
            foreach ($company->klwDumps as $dump) {
                $companyData = [
                    'row_id' => $company->id . '-' . $dump->id,  // Unique identifier for the row
                    'id' => $company->id,
                    'name' => $company->name,
                    'year' => $dump->year,  // Include the dump year
                ];

                // Fetch all values for this dump in a key-value format (field_id => value)
                $klwValues = KlwValue::where('dump_id', $dump->id)
                    ->whereIn('field_id', $fieldIds)
                    ->get()
                    ->keyBy('field_id');

                // For each field, get the corresponding value from this dump
                foreach ($fields as $field) {
                    $companyData[$field->fieldname] = isset($klwValues[$field->id])
                        ? $klwValues[$field->id]->value
                        : null;
                }

                // Add this dump's data to the result
                $data[] = $companyData;
            }
        }

        return response()->json($data);
    }

    /**
     * Return all open actions for companies within a collective (in the collective dashboard)
     * @return array[]|\Illuminate\Http\JsonResponse
     */
    public function getCollectiveActions()
    {
        $user = User::where('id', Auth::id())->first();

        if (!$user) {
            return ['$companies' => []];
        }

        foreach ($user->collectives as $collective) {
            $companies = array();

            foreach ($collective->companies as $company) {

                $actions = array();

                // 1. NatuurKPI's nog niet ingevuld
                $umdlkpivalues = UmdlKpiValues::where('company_id', $company->id)->get();
                $action_set = false;
                foreach ($umdlkpivalues as $ukv) {
                    if (!$ukv->kpi10 && !$ukv->kpi11 && !$ukv->kpi12 && !$action_set) {
                        $actions[] = "NatuurKPI's zijn niet ingevuld.";
                        $action_set = true;
                    }
                }

                // 2. Check MBP
                $company_properties = UmdlCompanyProperties::where('company_id', $company->id)->first();

                if ($company_properties->mbp == 0) {
                    $actions[] = "Milieubelasting is nog onbekend.";
                }

                // 3. SMA's zijn niet ingevuld
                if ($company_properties->website == 0 && $company_properties->ontvangstruimte == 0 &&
                    $company_properties->winkel == 0 && $company_properties->educatie == 0 &&
                    $company_properties->meerjarige_monitoring == 0 && $company_properties->open_dagen == 0 &&
                    $company_properties->wandelpad == 0 && $company_properties->erkend_demobedrijf == 0 &&
                    $company_properties->bed_and_breakfast == 0) {

                    $actions[] = "Sociaal-maatschappelijke activiteiten nog niet ingevuld.";
                }

                // 4. Bankgegevens nog niet ingevuld
                if ($company->bank_account == "" || $company->bank_account_name == "") {


                    $actions[] = "Bankgegevens nog niet ingevuld.";
                }

                $companies[] = array_merge($company->toArray(), [
                    'actions' => $actions,
                ]);

            }

            return response()->json([
                'companies' => $companies,
            ]);
        }
    }

    /**
     * Return all open actions for companies within a collective (in the collective dashboard)
     * @return array[]|\Illuminate\Http\JsonResponse
     */
    public function getAllActions()
    {
        $companies = Company::all();
        $data_companies = array();

        foreach ($companies as $company) {

            $actions = array();

            // 1. NatuurKPI's nog niet ingevuld
            $umdlkpivalues = UmdlKpiValues::where('company_id', $company->id)->get();
            $action_set = false;
            foreach ($umdlkpivalues as $ukv) {
                if (!$ukv->kpi10 && !$ukv->kpi11 && !$ukv->kpi12 && !$action_set) {
                    $actions[] = "NatuurKPI's zijn niet ingevuld.";
                    $action_set = true;
                }
            }

            // 2. Check MBP
            $company_properties = UmdlCompanyProperties::where('company_id', $company->id)->first();

            if ($company_properties->mbp == 0) {
                $actions[] = "Milieubelasting is nog onbekend.";
            }

            // 3. SMA's zijn niet ingevuld
            if ($company_properties->website == 0 && $company_properties->ontvangstruimte == 0 &&
                $company_properties->winkel == 0 && $company_properties->educatie == 0 &&
                $company_properties->meerjarige_monitoring == 0 && $company_properties->open_dagen == 0 &&
                $company_properties->wandelpad == 0 && $company_properties->erkend_demobedrijf == 0 &&
                $company_properties->bed_and_breakfast == 0) {

                $actions[] = "Sociaal-maatschappelijke activiteiten nog niet ingevuld.";
            }

            // 4. Bankgegevens nog niet ingevuld
            if ($company->bank_account == "" || $company->bank_account_name == "") {


                $actions[] = "Bankgegevens nog niet ingevuld.";
            }

            $data_companies[] = array_merge($company->toArray(), [
                'actions' => $actions,
            ]);
        }

        return response()->json([
            'companies' => $data_companies,
        ]);
    }

    /**
     * Return all signals for companies within a collective (in the confrontation matrix)
     * @return array[]|\Illuminate\Http\JsonResponse
     */
    public function getCollectiveSignals()
    {
        $user = Auth::user(); // Get the authenticated user
        $user->load('collectives.companies.klwDumps.signals'); // Eager load related data

        return response()->json($user);
    }

    public function getAllSignals()
    {
        // Get all companies with their associated dumps and signals
        $companies = Company::with('klwDumps.signals')->get();

        return response()->json($companies);
    }

    /**
     * Returns an array for the completion gauges of a collective
     * @return array[]|\Illuminate\Http\JsonResponse
     */
    public function getCompletion()
    {
        $company_data = array();

        $bedrijfUsers = User::whereHas('roles', function ($query) {
            $query->where('name', 'bedrijf');
        })->get();

        // TODO: Admin not counted. Needs elegant fix
        $company_data["total_klw"] = count($bedrijfUsers) * 3;
        $company_data["total_mbp"] = count($bedrijfUsers);
        $company_data["total_sma"] = count($bedrijfUsers);
        $company_data["total_klw_completed"] = 0;
        $company_data["total_mpb_completed"] = 0;
        $company_data["total_sma_completed"] = 0;

        $companies = Company::all();

        foreach ($companies as $company) {
            $company_data["total_klw_completed"] += count(KlwDump::where('company_id', $company->id)->get());

            $company_properties = UmdlCompanyProperties::where('company_id', $company->id)->first();

            if ($company_properties->mbp != 0) {
                $company_data["total_mpb_completed"] += 1;
            }

            // 3. SMA's zijn niet ingevuld
            if ($company_properties->website == 1 || $company_properties->ontvangstruimte == 1 ||
                $company_properties->winkel == 1 || $company_properties->educatie == 1 ||
                $company_properties->meerjarige_monitoring == 1 || $company_properties->open_dagen == 1 ||
                $company_properties->wandelpad == 1 || $company_properties->erkend_demobedrijf == 1 ||
                $company_properties->bed_and_breakfast == 1) {
                $company_data["total_sma_completed"] += 1;
            }

        }
        return response()->json([
            'company_data' => $company_data,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCompanyRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCompanyRequest $request, Company $company)
    {
        $data = $request->validated();
        $company->update($data);

        // Log
        SystemLog::firstOrCreate(array(
            'user_id' => Auth::user()->id,
            'type' => 'UPDATE',
            'message' => 'Bedrijf aangepast: ' . $company->name,
        ));

        return new CompanyResource($company);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        //1. Delete KPI-values for the corresponding company
        UmdlKpiValues::where('company_id', $company->id)->delete();

        // 2. Remove all connections to collectives
        UmdlCollectiveCompany::where('company_id', $company->id)->delete();

        // 3. Remove all KVK-numbers associated to this company
        KvkNumber::where('company_id', $company->id)->delete();

        // 4. Delete company properties for the corresponding company
        UmdlCompanyProperties::where('company_id', $company->id)->delete();

        // 5. Get all dumps for this company
        $dumps = KlwDump::where('company_id', $company->id)->get();

        foreach ($dumps as $dump) {
            // 6. Delete all Klw values associated with this dump
            KlwValue::where('dump_id', $dump->id)->delete();

            // 7. Remove all signals associated with this dumo
        }

        //8. Remove the dumps themselves.
        KlwDump::where('company_id', $company->id)->delete();

        // 9. Log
        SystemLog::firstOrCreate(array(
            'user_id' => Auth::user()->id,
            'type' => 'DELETE',
            'message' => 'Bedrijf verwijderd: ' . $company->name,
        ));

        // 10. Finally, remove the company itself.
        $company->delete();

        return response()->json(['success' => true]);
    }
}
