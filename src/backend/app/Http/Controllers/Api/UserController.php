<?php

namespace App\Http\Controllers\Api;

use App\Consts\Api\Message;
use App\Consts\Common;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\UserRequest;
use App\Http\Resources\Api\ErrorResource;
use App\Http\Resources\Api\UserAllCollection;
use App\Http\Resources\Api\UserResource;
use App\Models\Api\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    function createUser(UserRequest $request)
    {
        try {
            DB::beginTransaction();
            $existUser = User::where('email', $request->email)->first();

            if (!empty($existUser)) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_08)]);
                $statusCode = Message::Unauthorized;

                return new ErrorResource($request, $statusCode);
            }

            $newUser = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'statusMessage' => Message::OK,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
            DB::commit();

            return new UserResource($request);
        } catch (\Exception $e) {
            DB::rollBack();

            $request->merge(['statusMessage' => sprintf(Common::REGISTER_FAILED, 'アカウント')]);
            $statusMessage = $e->getMessage();

            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
        }
    }

    function updateUser(UserRequest $request)
    {
        try {
           DB::beginTransaction();

            $existUser = User::where('email', $request->email)->first();

            if (empty($existUser)) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_05)]);
                $statusCode = Message::Unauthorized;

                return new ErrorResource($request, $statusCode);
            }

        } catch (\Exception $e) {
            DB::rollBack();
        }
    }

    public function allUser(Request $request)
    {
        try {
            DB::beginTransaction();
            $users = User::all();


            if (empty($users)) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_05)]);
                $statusCode = Message::Unauthorized;

                return new ErrorResource($request, $statusCode);
            }

            return new UserAllCollection($users);

        } catch (\Exception $e) {
            DB::rollBack();

            $request->merge(['statusMessage' => sprintf(Common::FETCH_FAILED, 'ユーザーデータ')]);
            $statusMessage = $e->getMessage();

            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
        }
    }

}
