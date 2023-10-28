<?php

namespace App\Http\Controllers\Api;

use App\Consts\Api\Number;
use App\Consts\Common;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LoginRequest;
use App\Http\Resources\Api\AdminLoginResource;
use App\Http\Resources\Api\ErrorResource;
use App\Models\Api\Admin;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;

class AuthenticationController extends Controller
{
    public function loginAuth(LoginRequest $request)
    {
        try {
            $credentials = $request->only(['email', 'password']);
            if (!Auth::guard('admin')->attempt($credentials)) {
                $request->merge(['statusMessage' => sprintf(Common::LOGIN_FAILED, '管理者')]);
                return new ErrorResource($request, Response::HTTP_NOT_ACCEPTABLE);
            }
            $adminData = Admin::where('email', $request->email)->first();
            if ($adminData->is_admin !== Number::Is_Admin_True) {
                $request->merge(['statusMessage' => sprintf(Common::LOGIN_FAILED, '管理者')]);
                return new ErrorResource($request, Response::HTTP_NOT_ACCEPTABLE);
            }
            $adminData->api_token = Str::random(60);
            $adminData->save();

            return new AdminLoginResource($adminData);
        } catch (\Exception $e) {
            DB::rollBack();
            $request->merge(['statusMessage' => sprintf(Common::FETCH_FAILED, 'アカウント')]);
            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
        }
    }


    public function logoutAuth($request)
    {
        try {
            DB::beginTransaction();
        } catch (\Exception $e) {
            DB::rollBack();

            $request->merge(['statusMessage' => sprintf(Common::FETCH_FAILED, 'アカウント')]);
            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
        }
    }
}
