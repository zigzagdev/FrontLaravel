<?php

namespace App\Http\Controllers\Api;

use App\Consts\Api\Message;
use App\Http\Controllers\Controller;
use App\Http\Resources\Api\ErrorResource;
use App\Http\Resources\Api\LoginResource;
use App\Models\Api\Admin;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


class AuthenticationController extends Controller
{
    function loginAuth(Request $request)
    {
        try {
            DB::beginTransaction();
            $authentication = Admin::where('email', $request->email)->first();

            if (!$authentication) {
                $request->merge(['statusMessage' => Message::No_Content]);
                return new ErrorResource($request, Response::HTTP_UNAUTHORIZED);
            }

            $password = $request->password;
            if (!Hash::check($password, $authentication->password)) {
                $request->merge(['statusMessage' => Message::Unauthorized]);
                return new ErrorResource($request);
            }
            $expiration = $authentication->expiration;

            $todayDate = Carbon::now()->addMonthNoOverflow()->toDateString();
            $request->update(['expiration' => $todayDate]);

            DB::commit();

            return new LoginResource($request);
        } catch (\Exception $e) {

        }
    }

    function logoutAuth($request)
    {
        try {
            DB::beginTransaction();
        } catch (\Exception $e) {
            DB::rollBack();

            return new ErrorResource($request);
        }
    }
}






