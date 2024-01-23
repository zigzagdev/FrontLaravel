<?php

namespace App\Http\Controllers\Api;

use App\Consts\Api\Category;
use App\Consts\Common;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ItemRequest;
use App\Http\Resources\Api\DeleteResource;
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
    public function createItem(ItemRequest $request)
    {
        try {
            DB::beginTransaction();
            $adminId = $request->route('id');
            $admin = Admin::where('id', $adminId)->first();

            if (empty($admin)) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_05)]);
                return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
            }

            $existItem = Item::where('name', $request->name)->first();

            if (($existItem)) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_08)]);
                return new ErrorResource($request, Response::HTTP_UNAUTHORIZED);
            }
            $itemId = $this->createItemData($request, $adminId);
            ItemFlag::create(
                [
                    'is_display' => Number::Display_Flag,
                    'item_id' => $itemId,
                    'expired_at' => Carbon::today()->addMonth(Number::Six_Months),
                    'created_at' => Carbon::now(),
                ]
            );
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

    function allItems(Request $request)
    {
        try {
            $displayItems = ItemFlag::onDateAllItems();

            if (empty($displayItems)) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_05)]);
                return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
            }

            foreach ($displayItems as $key => $value) {
                $insertNumber = $value['category'];
                $displayItems[$key]['categoryName'] = Category::genre[$insertNumber];
            }

            return new ItemCollection($displayItems);
        } catch (Exception $e) {
            $request->merge(['statusMessage' => sprintf(Common::FETCH_FAILED, 'アイテム')]);
            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
        }
    }

    function searchItems(Request $request)
    {
        try {
            $searchQuery = $request->q;
            $resultItem = ItemFlag::onDateSearchItems($searchQuery);
            if (empty($searchQuery) || empty($resultItem)) {
                $request->merge(['statusMessage' => sprintf(Common::FETCH_FAILED, 'アイテム')]);
                return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
            } else {
                foreach ($resultItem as $key => $value) {
                    $insertNumber = $value['category'];
                    $resultItem[$key]['categoryName'] = Category::genre[$insertNumber];
                }
                return new SearchCollection($resultItem);
            }
        } catch (Exception $e) {
            $request->merge(['statusMessage' => sprintf(Common::FETCH_FAILED, 'アイテム')]);
            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
        }
    }

    function displayItem(Request $request)
    {
        try {
            $slug = $request->route('slug');
            $fetchItem = ItemFlag::onDateAllItems()->where('slug', $slug)->first();
            if (empty($fetchItem)) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_05)]);
                return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
            }
            $category = $fetchItem->category;
            $fetchItem['categoryName'] = Category::genre[$category];

            return new FetchItemResource($fetchItem);
        } catch (\Exception $e) {
            $request->merge(['statusMessage' => sprintf(Common::FETCH_FAILED, 'アイテム')]);
            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
        }
    }

    public function updateItem(ItemRequest $request)
    {
        try {
            DB::beginTransaction();
            $adminId = $request->route('id');
            if (empty(Admin::where('id', $adminId)->first)) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_11)]);
                return new ErrorResource($request, Response::HTTP_NOT_ACCEPTABLE);
            }
            $itemSlug = $request->route('slug');
            $targetItemName = Item::where('slug', $itemSlug)->first();

            if (!$targetItemName) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_09)]);
                return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
            }

            $itemId = $targetItemName->id;

            if ($targetItemName === $request->name) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_08)]);
                return new ErrorResource($request, Response::HTTP_UNAUTHORIZED);
            }

            $this->updateItemData($request, $itemSlug);

            ItemFlag::where('item_id', $itemId)->update(
                [
                    'is_display' => Number::Display_Flag,
                    'expired_at' => Carbon::today()->addMonth(Number::Three_Months),
                    'updated_at' => Carbon::now(),
                ]
            );
            DB::commit();

            $categoryNumber = intval($request->input('category'));
            $request->merge(['categoryName' => Category::genre[$categoryNumber]]);

            return new ItemResource($request);
        } catch (Exception $e) {
            DB::rollBack();
            $request->merge(['statusMessage' => sprintf(Common::REGISTER_FAILED, 'アイテム')]);
            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
        }
    }

    public function deleteItem(Request $request)
    {
        try {
            DB::beginTransaction();
            $adminId = $request->route('id');
            $itemSlug = $request->route('slug');

            if (empty(Admin::where('id', $adminId)->first())) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_11)]);
                return new ErrorResource($request, Response::HTTP_NOT_ACCEPTABLE);
            }
            if (!$itemSlug) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_05)]);
                return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
            }
            $itemData = Item::where('slug', $itemSlug)->first();

            if ($itemData->deleted_at > Carbon::now()) {
                $request->merge(['statusMessage' => sprintf(Common::ERR_15)]);
                return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
            }

            Item::where('slug', $itemSlug)->update(
                [
                    'expiration' => Carbon::today(),
                    'deleted_at' => Carbon::now(),
                ]
            );
            ItemFlag::where('item_id', $itemData->id)->update(
                [
                    'is_display' => Number::Expired_Flag,
                    'expired_at' => Carbon::now(),
                ]
            );
            DB::commit();
            return new DeleteResource($request);
        } catch (\Exception $e) {
            DB::rollBack();
            $request->merge(['statusMessage' => sprintf(Common::UPDATE_FAILED, 'アイテム')]);
            return new ErrorResource($request, Response::HTTP_BAD_REQUEST);
        }
    }

    private function createItemData($request, $adminId)
    {
        $itemData = Item::create(
            [
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'price' => $request->input('price'),
                'category' => $request->input('category'),
                'admin_id' => $adminId,
                'created_at' => Carbon::now(),
                'expiration' => Carbon::today()->addMonth(Number::Six_Months),
                'slug' => $request->input('name')
            ]
        );
        $itemId = $itemData->id;
        return $itemId;
    }

    private function updateItemData($request, string $itemSlug)
    {
        Item::where('slug', $itemSlug)->update(
            [
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'price' => $request->input('price'),
                'category' => $request->input('category'),
                'updated_at' => Carbon::now(),
                'expiration' => Carbon::today()->addMonth(Number::Three_Months),
                'slug' => Str::slug($request->input('name'))
            ]
        );
    }
}
