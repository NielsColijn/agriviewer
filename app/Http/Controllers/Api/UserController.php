<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\SystemLog;
use App\Models\User;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {

        Log::info('bla');
        return UserResource::collection(
            User::query()->orderBy('id')->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreUserRequest $request
     * @return Response
     */
    public function store(StoreUserRequest $request): Response
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);

        if (isset($data['image'])) {
            if (gettype($data['image']) != "string")
            {
                $fileName = time().'.' . $data['image']->extension();
                $data['image']->move(public_path('uploads/users/'), $fileName);
                $userImage = 'uploads/users/' . $fileName;
                $data['image'] = $userImage;
            }
        }

        $user = User::create($data);

        SystemLog::firstOrCreate(array(
            'user_id' => Auth::user()->id,
            'type' => 'CREATE',
            'message' => 'Gebruiker toegevoegd: ' . $data['email'],
        ));

        return response(new UserResource($user),201);
    }

    /**
     * Display the specified resource.
     *
     * @param User $user
     * @return UserResource
     */
    public function show(User $user): UserResource
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateUserRequest $request
     * @param User $user
     * @return UserResource
     */
    public function update(UpdateUserRequest $request, User $user): UserResource
    {
        $data = $request->validated();

        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }
        if (isset($data['image'])) {
            if (gettype($data['image']) != "string")
            {
                if ($user->image !== null && file_exists(public_path($user->image))) {
                    unlink(public_path($user->image));
                }

                $fileName = time().'.' . $data['image']->extension();
                $data['image']->move(public_path('uploads/users/'), $fileName);
                $userImage = 'uploads/users/' . $fileName;
                $data['image'] = $userImage;
            }
        }
        $user->update($data);

        // Log
        SystemLog::firstOrCreate(array(
            'user_id' => Auth::user()->id,
            'type' => 'UPDATE',
            'message' => 'Gebruiker gewijzigd: ' . $data['email'],
        ));

        return new UserResource($user);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param User $user
     * @return Response
     */
    public function destroy(User $user): Response
    {
        if ($user->image !== null && file_exists(public_path($user->image))) {
            unlink(public_path($user->image));
        }

        // Log
        SystemLog::firstOrCreate(array(
            'user_id' => Auth::user()->id,
            'type' => 'DELETE',
            'message' => 'Gebruiker verwijderd: ' . $user->email,
        ));

        $user->delete();
        return response("",204);

    }
}
