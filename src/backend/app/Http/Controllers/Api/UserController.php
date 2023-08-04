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
use App\Http\Resources\Api\UserAllCollection;
use App\Http\Resources\Api\UserResource;
use App\Models\Api\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Request;
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

            User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'statusMessage' => Message::OK,
                'created_at' => Carbon::now(),
            ]);
            DB::commit();

            return new UserResource($request);
        } catch (\Exception $e) {
            DB::rollBack();
            $request->merge(['statusMessage' => sprintf(Common::REGISTER_FAILED, 'ユーザーアカウント')]);

            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
        }
    }

    function updateUser(UpdateNameRequest $request)
    {
        try {
            DB::beginTransaction();
            $userId = $request->user_id;
            $authentication = User::find($userId);

            if (empty($authentication)) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_05)]);
                $statusCode = Message::Unauthorized;

                return new ErrorResource($request, $statusCode);
            }

            User::where('id', $userId)->update([
                'name' => $request->input('name'),
                'updated_at' => Carbon::now(),
            ]);
            DB::commit();
            return new UpdateAdminResource($request);

        } catch (\Exception $e) {
            DB::rollBack();
            $request->merge(['statusMessage' => sprintf(Common::REGISTER_FAILED, 'ユーザーアカウント')]);

            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
        }
    }

    public function updateEmail(UpdateEmailRequest $request)
    {
        try {
            DB::beginTransaction();
            $userId = $request->user_id;
            $authentication = User::find($userId);

            if (!$authentication) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_05)]);
                $statusCode = Message::Not_Acceptable;

                return new ErrorResource($request, $statusCode);
            }

            User::where('id', $userId)->update([
                'email' => $request->email,
                'updated_at' => Carbon::now()
            ]);

            DB::commit();

            return new UpdateEmailResource($request);

        } catch (\Exception $e) {
            DB::rollBack();
            $request->merge(['statusMessage' => sprintf(Common::UPDATE_FAILED, 'メールアドレス')]);

            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
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

            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
        }
    }

}
