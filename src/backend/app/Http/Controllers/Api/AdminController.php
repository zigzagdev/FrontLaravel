<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Api\Admin;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\Api\AdminRequest;
use App\Http\Resources\Api\ErrorResource;
use App\Http\Resources\Api\RegisterAdminResource;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use App\Consts\Common;
use App\Consts\Api\Message;
use Symfony\Component\HttpFoundation\Response;



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

            $newAdmin = Admin::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'statusMessage' => Message::OK,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
            DB::commit();

            return new RegisterAdminResource($request);
        } catch(\Exception $e) {
            DB::rollBack();
            $request->merge(['statusMessage' => sprintf(Common::REGISTER_FAILED, 'アカウント')]);
            $statusMessage = $e->getMessage();

            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
        }
    }

    function updateAdmin(AdminRequest $request)
    {

    }
}
