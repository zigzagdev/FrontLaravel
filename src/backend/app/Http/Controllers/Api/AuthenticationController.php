<?php

namespace App\Http\Controllers\Api;

use App\Consts\Api\Number;
use App\Consts\Common;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LoginRequest;
use App\Http\Resources\Api\AdminLoginResource;
use App\Http\Resources\Api\UserLoginResource;
use App\Http\Resources\Api\ErrorResource;
use App\Models\Api\Admin;
use App\Models\Api\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;

class AuthenticationController extends Controller
{
    public function adminLogin(LoginRequest $request)
    {
        try {
            DB::beginTransaction();
            $credentials = $request->only(['email', 'password']);
            if (!Auth::guard('admin')->attempt($credentials)) {
                $request->merge(['statusMessage' => sprintf(Common::LOGIN_FAILED, '管理者')]);
                return new ErrorResource($request, Response::HTTP_NOT_ACCEPTABLE);
            }
            $adminData = Admin::where('email', $request->email)->first();
            if ($adminData->is_admin !== Number::Is_Admin_True) {
                $request->merge(['statusMessage' => sprintf(Common::STATUS_NOT_FOUND, '管理者')]);
                return new ErrorResource($request, Response::HTTP_NOT_ACCEPTABLE);
            }
            $adminData->update(
                [
                    'token' => Str::random(60),
                    'updated_at' => Carbon::now()
                ]
            );

            DB::commit();
            return new AdminLoginResource($adminData);
        } catch (\Exception $e) {
            DB::rollBack();
            $request->merge(['statusMessage' => sprintf(Common::FETCH_FAILED, 'アカウント')]);
            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
        }
    }

    public function userLogin(LoginRequest $request)
    {
        try {
            DB::beginTransaction();
            $credentials = $request->only(['email', 'password']);
            if (!Auth::guard('user')->attempt($credentials)) {
                $request->merge(['statusMessage' => sprintf(Common::LOGIN_FAILED, 'ユーザー')]);
                return new ErrorResource($request, Response::HTTP_NOT_ACCEPTABLE);
            }
            $userData = User::where('email', $request->email)->first();
            if ($userData->is_admin !== Number::Is_Admin_False) {
                $request->merge(['statusMessage' => sprintf(Common::STATUS_NOT_FOUND, 'ユーザー')]);
                return new ErrorResource($request, Response::HTTP_NOT_ACCEPTABLE);
            }
            $userData->update(
                [
                    'token' => Str::random(60),
                    'updated_at' => Carbon::now()
                ]
            );
            $userData->save();

            DB::commit();
            return new UserLoginResource($userData);
        } catch (\Exception $e) {
            DB::rollBack();
            $request->merge(['statusMessage' => sprintf(Common::FETCH_FAILED, 'ユーザー')]);
            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
        }
    }

//    public function logoutAuth($request)
//    {
//        try {
//            DB::beginTransaction();
//        } catch (\Exception $e) {
//            DB::rollBack();
//
//            $request->merge(['statusMessage' => sprintf(Common::FETCH_FAILED, '管理者')]);
//            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
//        }
//    }
}
