<?php

namespace App\Libraries\ExcelParser;

use App\Models\Company;
use App\Models\UmdlCompanyProperties;
use App\Models\UmdlKpiValues;
use PhpOffice\PhpSpreadsheet\Reader\Xlsx;
use Saloon\XmlWrangler\Exceptions\MissingNodeException;
use Saloon\XmlWrangler\Exceptions\MultipleNodesFoundException;
use Saloon\XmlWrangler\Exceptions\QueryAlreadyReadException;
use Saloon\XmlWrangler\Exceptions\XmlReaderException;
use Saloon\XmlWrangler\XmlReader;


class ExcelParser
{
    /**
     * @throws MissingNodeException
     * @throws MultipleNodesFoundException
     * @throws \Throwable
     * @throws QueryAlreadyReadException
     * @throws XmlReaderException
     */
    public function getKVK($excel_file) : string
    {
        $reader = new Xlsx();
        $spreadsheet = $reader->load($excel_file);
        $worksheet = $spreadsheet->getSheetByName('UMDL invulblad');

        return $worksheet->getCell('E8')->getValue();
    }

    /**
     * @throws \Throwable
     * @throws XmlReaderException
     */
    public function writeCompanyData($excel_file, $company_id) : int
    {
        $totalWritten = 0;

        // Get all fields
        $reader = new Xlsx();
        $spreadsheet = $reader->load($excel_file);
        $worksheet = $spreadsheet->getSheetByName('UMDL invulblad');

        $umdlcompanyproperties = UmdlCompanyProperties::firstOrNew(array(
            'company_id' => $company_id,
        ));

        // Set all properties
        $umdlcompanyproperties->mbp = $this->transformMBP($worksheet->getCell('C20')->getValue());
        $umdlcompanyproperties->website = $worksheet->getCell('F23')->getValue();
        $umdlcompanyproperties->ontvangstruimte = $worksheet->getCell('F24')->getValue();
        $umdlcompanyproperties->winkel = $worksheet->getCell('F25')->getValue();
        $umdlcompanyproperties->educatie = $worksheet->getCell('F26')->getValue();
        $umdlcompanyproperties->meerjarige_monitoring = $worksheet->getCell('F27')->getValue();
        $umdlcompanyproperties->open_dagen = $worksheet->getCell('F28')->getValue();
        $umdlcompanyproperties->wandelpad = $worksheet->getCell('F29')->getValue();
        $umdlcompanyproperties->erkend_demobedrijf = $worksheet->getCell('F30')->getValue();
        $umdlcompanyproperties->bed_and_breakfast = $worksheet->getCell('F31')->getValue();

        $umdlcompanyproperties->save();

        // Set additional company properties (email, bank account etc.)
        $company = Company::where(array('id' => $company_id))->first();

        if ($company != null) {
            $company->phone = $worksheet->getCell('E14')->getValue();
            $company->email = $worksheet->getCell('E15')->getValue();
            $company->bank_account = $worksheet->getCell('E16')->getValue();
            $company->bank_account_name = $worksheet->getCell('E17')->getValue();
            $company->save();
        }

        // TODO: Also reads the green KPI scores (needs to be fixed later)
        $umdlkpivalues = UmdlKpiValues::where('company_id', $company_id)->get();
        $result_sheet = $spreadsheet->getSheetByName('Eindresultaat');

        foreach ($umdlkpivalues as $umdl)
        {
            $umdl->kpi10 = $result_sheet->getCell('D29')->getCalculatedValue();
            $umdl->kpi11 = $result_sheet->getCell('D30')->getCalculatedValue();
            $umdl->kpi12 = $result_sheet->getCell('D31')->getCalculatedValue();
            $umdl->save();
        }


        return $totalWritten;
    }

    /**
     * @param $mbp
     * @return string
     */
    public function transformMBP($mbp) : int
    {
        return match ($mbp) {
            1 => 9,
            2 => 8,
            3 => 7,
            4 => 6,
            5 => 5,
            6 => 4,
            7 => 3,
            8 => 2,
            9 => 1,
            default => 0
        };
    }
}
