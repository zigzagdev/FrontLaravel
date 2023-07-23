<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\UpdateNameRequest;
use App\Http\Requests\Api\UpdateEmailRequest;
use App\Http\Resources\Api\UpdateAdminResource;
use App\Http\Resources\Api\UpdateEmailResource;
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
                'expiration' => Carbon::now()->addDays(3)
            ]);
            DB::commit();

            return new RegisterAdminResource($request);
        } catch (\Exception $e) {
            DB::rollBack();
            $request->merge(['statusMessage' => sprintf(Common::REGISTER_FAILED, 'アカウント')]);
            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
        }
    }

    function updateAdmin(UpdateNameRequest $request)
    {
        try {
            DB::beginTransaction();
            $adminId = $request->admin_id;
            $authentication = Admin::find($adminId);

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

            Admin::where('id', $adminId)->update([
                'name' => $request->input('name'),
                'updated_at' => Carbon::now(),
                'expiration' => Carbon::now()->addDay(3)
            ]);
            DB::commit();
            return new UpdateAdminResource($request);

        } catch (\Exception $e) {
            DB::rollBack();
            $request->merge(['statusMessage' => sprintf(Common::UPDATE_FAILED, 'アカウント')]);

            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
        }
    }

    function updateAdminEmail(UpdateEmailRequest $request)
    {
        try {
            DB::beginTransaction();
            $adminId = $request->admin_id;
            $authentication = Admin::find($adminId);

            if (!$authentication) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_05)]);
                $statusCode = Message::Not_Acceptable;

                return new ErrorResource($request, $statusCode);
            }

            Admin::where('id', $adminId)->update([
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
