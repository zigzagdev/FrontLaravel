<?php

namespace App\Http\Controllers\Api;

use App\Consts\Api\Number;
use App\Consts\Common;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LoginRequest;
use App\Http\Requests\Api\PasswordResetRequest;
use App\Http\Resources\Api\AdminLoginResource;
use App\Http\Resources\Api\SendResetPasswordResource;
use App\Http\Resources\Api\UpdatePasswordResource;
use App\Http\Resources\Api\UserLoginResource;
use App\Http\Resources\Api\ErrorResource;
use App\Mail\Api\PasswordResetMail;
use App\Mail\Api\PasswordResetSuccessMail;
use App\Models\Api\Admin;
use App\Models\Api\User;
use App\Models\Api\UserRememberToken;
use App\Services\RememberToken;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
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

    public function sendResetPasswordEmail(Request $request)
    {
        try {
            DB::beginTransaction();
            $sendEmail = User::where('email', $request->email)->first();

            if (empty($sendEmail)) {
                return null;
            }
            $rememberUserData = RememberToken::generateRememberToken($sendEmail);
            $changeUrl = url((env('FRONT_URL'). 'Reset/Password?token=' . $rememberUserData->remember_token . '&email=' .  $request->email));
            $formUrl = url(env('FRONT_URL') . "Contact");

            DB::commit();

            Mail::to($rememberUserData->email)->send(new PasswordResetMail($changeUrl, $formUrl));

            return new SendResetPasswordResource($request);
        } catch (\Exception $e) {
            DB::rollBack();
            $request->merge(['statusMessage' => sprintf(Common::FETCH_FAILED, 'ユーザー')]);
            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
        }
    }

    public function resetPassword(PasswordResetRequest $request)
    {
        try {
            DB::beginTransaction();

            $validToken = $request->query('token');
            $validEmail = $request->query('email');

            $userData = UserRememberToken::where('remember_token', $validToken)->first();
            if ($userData->expire_at < Carbon::now()) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_09)]);
                return new ErrorResource($request);
            }
            if ($userData->email !== $validEmail) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_05)]);
                return new ErrorResource($request);
            }
            $this->updateUserPassword($request, $validEmail);
            $formUrl = env('FRONT_URL') . "Contact";
            $loginUrl = env('FRONT_URL') . "Login";
            DB::commit();

            Mail::to($userData->email)->send(new PasswordResetSuccessMail($formUrl, $loginUrl));
            return new UpdatePasswordResource($request);

        } catch (\Exception $e) {
            DB::rollBack();
            $request->merge(['statusMessage' => sprintf(Common::UPDATE_FAILED, 'パスワード')]);
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
    private function updateUserPassword($request, $validEmail)
    {
        User::where('email', $validEmail)->update(
            [
                'password' => Hash::make($request->input('password')),
                'updated_at' => Carbon::now(),
            ]
        );
    }
}
