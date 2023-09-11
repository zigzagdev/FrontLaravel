<?php

namespace App\Models\Api;

use App\Consts\Api\Number;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class ItemFlag extends Model
{
    use HasFactory;

    protected $table = 'item_display';
    protected $guarded = ['id'];

    public function Item()
    {
        return $this->belongsTo(Item::class);
    }

    public static function onDateItems()
    {
        return self::select([
            'items.name'
            , 'items.description'
            , 'items.category'
            , 'items.price'
            , 'items.expiration'
            , 'items.slug'
            , 'items.id as itemId'
        ])->leftjoin('items', function ($join) {
            $join->on('item_display.item_id', '=', 'items.id');
        })->where('item_display.flag', '=', Number::Display_Flag)
            ->orderBy('items.id', 'desc')
            ->get();
    }
}
