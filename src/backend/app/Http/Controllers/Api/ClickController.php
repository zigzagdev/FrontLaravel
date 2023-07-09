<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\ClickCountsCollection;
use App\Models\Api\Click;
use App\Consts\Api\Number;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Mockery\Exception;

class ClickController extends Controller
{
    public function clickCount(Request $request)
    {
        try {
            DB::beginTransaction();

            return new ClickCountsCollection($request);
        } catch (Exception $e) {
            DB::rollBack();
        }
    }

    public function calculateCount($request)
    {
        try {
            DB::beginTransaction();
        } catch (Exception $e) {
            DB::rollBack();
        }
    }
}
