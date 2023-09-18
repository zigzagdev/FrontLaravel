<?php

namespace App\Http\Controllers\Api;

use App\Consts\Api\Category;
use App\Consts\Api\Message;
use App\Consts\Common;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ItemRequest;
use App\Http\Resources\Api\DetailItemResource;
use App\Http\Resources\Api\ErrorResource;
use App\Http\Resources\Api\FetchItemResource;
use App\Http\Resources\Api\ItemCollection;
use App\Http\Resources\Api\ItemResource;
use App\Http\Resources\Api\SearchCollection;
use App\Models\Api\Admin;
use App\Models\Api\ItemFlag;
use App\Models\Api\Item;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Mockery\Exception;
use App\Consts\Api\Number;
use Symfony\Component\HttpFoundation\Response;

class ItemController extends Controller
{
    function createItem(ItemRequest $request)
    {
        try {
            DB::beginTransaction();
            $adminId = $request->admin_id;

            $admin = Admin::find($adminId);

            if (empty($admin)) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_08)]);
                return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
            }

            $existItem = Item::where([
                'name' => $request->name,
                'price' => $request->price,
                'category' => $request->category
            ])->first();

            if (($existItem)) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_08)]);
                $statusCode = Message::Unauthorized;

                return new ErrorResource($request, $statusCode);
            }

            $Item = Item::create([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'price' => $request->input('price'),
                'category' => $request->input('category'),
                'admin_id' => $adminId,
                'statusMessage' => Message::OK,
                'created_at' => Carbon::now(),
                'expiration' => Carbon::now()->addYear(1),
                'slug' => Str::slug($request->input('name'))
            ]);
            $itemId = $Item->id;

            ItemFlag::create([
                'flag' => Number::Display_Flag,
                'item_id' => $itemId,
                'expired_at' => Carbon::now()->addMonth(6),
                'created_at' => Carbon::now(),
            ]);
            DB::commit();

            $categoryNumber = intval($request->input('category'));
            $request->merge(['categoryName' => Category::genre[$categoryNumber]]);

            return new ItemResource($request);
        } catch (\Exception $e) {
            DB::rollBack();
            $request->merge(['statusMessage' => sprintf(Common::REGISTER_FAILED, 'アイテム')]);

            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
        }
    }


    function updateItem(ItemRequest $request)
    {
        try {
            DB::beginTransaction();
            $adminId = $request->admin_id;
            $itemId = $request->item_id;
            $authentication = Item::find($itemId);

            if (!$authentication) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_08)]);
                return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
            }

            if ($authentication->slug !== $authentication->name) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_05)]);
                return new ErrorResource($request, Response::HTTP_NOT_FOUND);
            }

            $existItem = Item::where([
                'name' => $request->name,
                'price' => $request->price,
                'category' => $request->category
            ])->first();

            if (($existItem)) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_08)]);
                $statusCode = Message::Unauthorized;

                return new ErrorResource($request, $statusCode);
            }
            Item::where('id', $itemId)->update([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'price' => $request->input('price'),
                'category' => $request->input('category'),
                'admin_id' => $adminId,
                'updated_at' => Carbon::now(),
                'expiration' => Carbon::now()->addYear(1),
                'slug' => Str::slug($request->input('name'))
            ]);

            ItemFlag::where('item_id', $itemId)->update([
                'flag' => 1,
                'item_id' => $itemId,
                'expired_at' => Carbon::now()->addMonth(6),
                'updated_at' => Carbon::now(),
            ]);
            DB::commit();

            $categoryNumber = intval($request->input('category'));
            $request->merge(['categoryName' => Category::genre[$categoryNumber]]);

            return new ItemResource($request);
        } catch (Exception $e) {
            DB::rollBack();
        }
    }

    function allItems(Request $request)
    {
        try {
            $displayItems = ItemFlag::onDateAllItems();

            if (empty($displayItems)) {
                return new ErrorResource($request);
            }
            $changeItems = $displayItems->toArray();
            foreach ($changeItems as $key => $value) {
                $insertNumber = $value['category'];
                $changeItems[$key]['categoryName'] = Category::genre[$insertNumber];
            }

            return new ItemCollection($changeItems);
        } catch (Exception $e) {
            $request->merge(['statusMessage' => sprintf(Common::FAILED, 'アイテム取得')]);
            return new ErrorResource($request, Common::FAILED);
        }
    }

    function searchItems(Request $request)
    {
        try {
            $searchQuery = $request->q;
            $resultItem = ItemFlag::onDateSearchItems($searchQuery);

            if (empty($searchQuery) || count($resultItem) == 0) {
                $searchItems = ItemFlag::onDateAllItems();
                $arrayResult = $searchItems->toArray();

                foreach ($arrayResult as $key => $value) {
                    $insertNumber = $value['category'];
                    $arrayResult[$key]['categoryName'] = Category::genre[$insertNumber];
                }
                return new SearchCollection($arrayResult);
            } else {
                $arrayResult = $resultItem->toArray();

                foreach ($arrayResult as $key => $value) {
                    $insertNumber = $value['category'];
                    $arrayResult[$key]['categoryName'] = Category::genre[$insertNumber];
                }
                return new SearchCollection($arrayResult);
            }
        } catch (Exception $e) {
            $request->merge(['statusMessage' => sprintf(Common::FAILED, 'アイテム取得')]);
            return new ErrorResource($request, Common::FAILED);
        }
    }

    function displayDetail(Request $request, $slug)
    {
        try {
            $fetchItem = ItemFlag::onDateAllItems()->where('slug', $slug)->first();
            if (!$fetchItem) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_05)]);
                return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
            }
            $category = $fetchItem->category;
            $fetchItem['categoryName'] = Category::genre[$category];

            return new FetchItemResource($fetchItem);
        } catch (\Exception $e) {
            $request->merge(['statusMessage' => sprintf(Common::FAILED, 'アイテム取得')]);
            return new ErrorResource($request, Common::FAILED);
        }
    }
}
