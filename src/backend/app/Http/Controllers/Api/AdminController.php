<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\UpdateNameRequest;
use App\Http\Requests\Api\UpdateEmailRequest;
use App\Http\Resources\Api\UpdateAdminResource;
use App\Http\Resources\Api\UpdateEmailResource;
use App\Http\Resources\Api\UserAllCollection;
use App\Models\Api\Admin;
use App\Models\Api\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\Api\AdminRequest;
use App\Http\Resources\Api\ErrorResource;
use App\Http\Resources\Api\RegisterAdminResource;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use App\Consts\Common;
use App\Consts\Api\Number;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\Api\AdminResource;


class AdminController extends Controller
{

    public function __construct()
    {
        $this->middleware('admin')->except('createAdmin', 'adminCreateData');
    }

    function createAdmin(AdminRequest $request)
    {
        try {
            DB::beginTransaction();

            $existUser = Admin::where('email', $request->email)->first();

            if (!empty($existUser)) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_08)]);
                return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
            }

            $this->adminCreateData($request);
            DB::commit();

            return new RegisterAdminResource($request);
        } catch (\Exception $e) {
            DB::rollBack();
            $request->merge(['statusMessage' => sprintf(Common::REGISTER_FAILED, 'アカウント')]);
            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
        }
    }

    function updateAdminName(UpdateNameRequest $request)
    {
        try {
            DB::beginTransaction();
            $adminId = $request->route('id');
            $currentAdminData = Admin::where('id', $adminId)->first();

            if (empty($currentAdminData)) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_05)]);
                return new ErrorResource($request, Response::HTTP_NOT_FOUND);
            }

            $expiration = $currentAdminData->expiration;
            if ($expiration < Carbon::now('Asia/Tokyo')) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_09)]);
                return new ErrorResource($request, Response::HTTP_UNAUTHORIZED);
            }

            $adminId = $currentAdminData->id;
            $this->updateAdminNameData($request, $adminId);
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
            $adminId = $request->route('id');
            $currentAdminData = Admin::where('id', $adminId)->first();

            if (empty($currentAdminData)) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_05)]);
                return new ErrorResource($request, Response::HTTP_NOT_FOUND);
            }
            $adminId = $currentAdminData->id;
            $this->updateAdminEmailData($request, $adminId);
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
            $adminId = $request->route('id');
            $authentication = Admin::where('id', $adminId)->first();
            if (empty($authentication)) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_05)]);
                return new ErrorResource($request, Response::HTTP_NOT_FOUND);
            }
            return new AdminResource($authentication);
        } catch (\Exception $e) {
            $request->merge(['statusMessage' => sprintf(Common::FETCH_FAILED, '管理者データ')]);
            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
        }
    }

    function allUser(Request $request)
    {
        try {
            $adminId = $request->route('id');
            $currentAdminData = Admin::where('id', $adminId)->first();
            if (empty($currentAdminData)) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_05)]);
                return new ErrorResource($request, Response::HTTP_NOT_FOUND);
            }
            $users = User::all();
            if (empty($users)) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_05)]);
                return new ErrorResource($request, Response::HTTP_NOT_FOUND);
            }

            return new UserAllCollection($users);
        } catch (\Exception $e) {
            $request->merge(['statusMessage' => sprintf(Common::FETCH_FAILED, 'ユーザーデータ')]);
            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
        }
    }

    private function adminCreateData($request)
    {
        Admin::create(
            [
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'token' => Str::random(60),
                'is_admin' => Number::Is_Admin_True,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        );
    }

    private function updateAdminNameData($request, $adminId)
    {
        Admin::where('id', $adminId)->update(
            [
                'name' => $request->input('name'),
                'updated_at' => Carbon::now(),
                'expiration' => Carbon::today()->addDays(Number::Three_Days),
            ]
        );
    }

    private function updateAdminEmailData($request, $adminId)
    {
        Admin::where('id', $adminId)->update(
            [
                'email' => $request->input('email'),
                'updated_at' => Carbon::now(),
                'expiration' => Carbon::today()->addDays(Number::Three_Days),
            ]
        );
    }
}
