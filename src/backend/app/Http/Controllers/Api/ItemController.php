<?php

namespace App\Http\Controllers\Api;

use App\Consts\Api\Message;
use App\Consts\Common;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ItemRequest;
use App\Http\Resources\Api\ErrorResource;
use App\Http\Resources\Api\ItemResource;
use App\Models\Api\Admin;
use App\Models\Api\Item;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class ItemController extends Controller
{
    function createItem(ItemRequest $request)
    {
        try {
            DB::beginTransaction();
            $adminId = $request->admin_id;

            $admin = Admin::where('id', $adminId)->first();
            if (!$admin) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_08)]);
                return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
            }

            $existItem = Item::where([
                'name' => $request->name,
                'price' => $request->price,
                'category' => $request->category
            ])->first();

            if (!empty($existItem)) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_08)]);
                $statusCode = Message::Unauthorized;

                return new ErrorResource($request, $statusCode);
            }

            $newItem = Item::create([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'price' => $request->input('price'),
                'category' => $request->input('category'),
                'admin_id' => $adminId,
                'statusMessage' => Message::OK,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
            DB::commit();

            return new ItemResource($request);
        } catch (\Exception $e) {
            DB::rollBack();

            $request->merge(['statusMessage' => sprintf(Common::REGISTER_FAILED, 'アイテム')]);
            $statusMessage = $e->getMessage();

            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);

        }
    }
}
