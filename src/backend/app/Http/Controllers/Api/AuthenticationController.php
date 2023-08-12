<?php

namespace App\Http\Controllers\Api;

use App\Consts\Api\Message;
use App\Consts\Common;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LoginRequest;
use App\Http\Resources\Api\ErrorResource;
use App\Http\Resources\Api\LoginResource;
use App\Models\Api\Admin;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


class AuthenticationController extends Controller
{
    public function loginAuth(LoginRequest $request)
    {
        try {
            DB::beginTransaction();
            $authentication = Admin::where('email', $request->email)->first();

            if (empty($authentication)) {
                $request->merge(['statusMessage' => Message::No_Content]);
                return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
            }

            if (Hash::check($request->password, $authentication->password)) {
                $expirationDate = Carbon::now('Asia/Tokyo')->addMonthNoOverflow()->toDateString();
                Admin::where('email', $request->email)->update([
                    'expiration' => $expirationDate,
                    'password' => Hash::make($request->password)
                ]);
                $request->merge(['expiration' => $expirationDate]);
                DB::commit();

                return new LoginResource($request);
            } else {
                $request->merge(['statusMessage' => sprintf(Common::FETCH_FAILED, 'アカウント')]);
                return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
            }
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
