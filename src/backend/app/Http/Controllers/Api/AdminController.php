<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Api\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\Api\AdminRequest;
use App\Http\Resources\Api\ErrorResource;
use App\Http\Resources\Api\RegisterAdminResource;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use App\Consts\Common;
use App\Consts\Api\Message;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\Api\AdminResource;
use Illuminate\Support\Facades\Route;



class AdminController extends Controller
{
    function createAdmin(AdminRequest $request)
    {
        try {
            DB::beginTransaction();
            $existUser = Admin::where('email', $request->email)->first();

            if (!empty($existUser)) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_08)]);
                $statusCode = Message::Unauthorized;

                return new ErrorResource($request, $statusCode);
            }

           Admin::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'statusMessage' => Message::OK,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'expiration' => Carbon::now()->addDays(3)
            ]);
            DB::commit();

            return new RegisterAdminResource($request);
        } catch(\Exception $e) {
            DB::rollBack();
            $request->merge(['statusMessage' => sprintf(Common::REGISTER_FAILED, 'アカウント')]);
            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
        }
    }

    function updateAdmin(AdminRequest $request)
    {
        try {
            DB::beginTransaction();
            $authentication = Admin::where('email', $request->email)->first();

            if (empty($authentication)) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_08)]);
                $statusCode = Message::Unauthorized;

                return new ErrorResource($request, $statusCode);
            }

            $expiration = $authentication->expiration;
            if ($expiration < Carbon::now('Asia/Tokyo')) {
                $request->merge(['statusMessage' => Message::Unauthorized]);
                $statusCode = Message::Unauthorized;

                return new ErrorResource($request, $statusCode);
            }

            Admin::update([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'statusMessage' => Message::OK,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'expiration' => Carbon::now()->addDay(3)
            ]);
            DB::commit();
            return new AdminResource($request);

        } catch (\Exception $e) {
            DB::rollBack();

            $request->merge(['statusMessage' => sprintf(Common::REGISTER_FAILED, 'アカウント')]);
            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
        }
    }

    function getAdmin(Request $request)
    {
        try {
            DB::beginTransaction();
            $authentication = Admin::where('email', $request->email)->first();

            if (empty($authentication)) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_08)]);
                $statusCode = Message::Unauthorized;

                return new ErrorResource($request, $statusCode);
            }

            return new AdminResource($authentication);

        } catch (\Exception $e) {
            DB::rollBack();
        }
    }
}
