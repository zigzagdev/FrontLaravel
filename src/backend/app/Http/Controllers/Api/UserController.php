<?php

namespace App\Http\Controllers\Api;

use App\Consts\Api\Message;
use App\Consts\Common;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\UpdateEmailRequest;
use App\Http\Requests\Api\UpdateNameRequest;
use App\Http\Requests\Api\UserRequest;
use App\Http\Resources\Api\ErrorResource;
use App\Http\Resources\Api\UpdateAdminResource;
use App\Http\Resources\Api\UpdateEmailResource;
use App\Http\Resources\Api\UserResource;
use App\Models\Api\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
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
                return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
            }

            User::create(
                [
                    'name' => $request->input('name'),
                    'email' => $request->input('email'),
                    'password' => Hash::make($request->input('password')),
                    'statusMessage' => Message::OK,
                    'created_at' => Carbon::now()
                ]
            );

            DB::commit();
            return new UserResource($request);
        } catch (\Exception $e) {
            DB::rollBack();
            $request->merge(['statusMessage' => sprintf(Common::REGISTER_FAILED, 'ユーザーアカウント')]);

            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
        }
    }

    function updateUserName(UpdateNameRequest $request)
    {
        try {
            DB::beginTransaction();
            $userId = $request->route('id');
            $userName = User::find($userId)->value('name');

            if (empty($userName)) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_05)]);
                return new ErrorResource($request, Response::HTTP_NOT_FOUND);
            }

            User::where('id', $userId)->update(
                [
                    'name' => $request->input('name'),
                    'updated_at' => Carbon::now(),
                ]
            );

            DB::commit();
            return new UpdateAdminResource($request);
        } catch (\Exception $e) {
            DB::rollBack();
            $request->merge(['statusMessage' => sprintf(Common::REGISTER_FAILED, 'ユーザーアカウント')]);
            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
        }
    }

    public function updateUserEmail(UpdateEmailRequest $request)
    {
        try {
            DB::beginTransaction();
            $userId = $request->route('id');
            $userEmail = User::find($userId)->value('email');

            if (empty($userEmail)) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_05)]);
                return new ErrorResource($request, Response::HTTP_NOT_FOUND);
            }
            User::where('id', $userId)->update(
                [
                    'email' => $request->email,
                    'updated_at' => Carbon::now()
                ]
            );
            DB::commit();
            return new UpdateEmailResource($request);
        } catch (\Exception $e) {
            DB::rollBack();
            $request->merge(['statusMessage' => sprintf(Common::UPDATE_FAILED, 'メールアドレス')]);
            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
        }
    }

    protected function eachUser(Request $request)
    {
        try {
            $userId = $request->route('id');

            if (empty($userId)) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_05)]);
                return new ErrorResource($request, Response::HTTP_NOT_FOUND);
            }
            $fetchUserData = User::find($userId);

            return new UserResource($fetchUserData);
        } catch (\Exception $e) {
            $request->merge(['statusMessage' => sprintf(Common::FAILED, 'ユーザー')]);
            return new ErrorResource($request, Common::FAILED);
        }
    }
}
