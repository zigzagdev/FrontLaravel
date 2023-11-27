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

    public static function onDateAllItems()
    {
        return self::select([
            'items.name'
            , 'items.description'
            , 'items.category'
            , 'items.price'
            , 'items.expiration'
            , 'items.slug'
            , 'items.id as itemId'
            , 'items.admin_id as adminId'
        ])->leftjoin('items', function ($join) {
            $join->on('item_display.item_id', '=', 'items.id');
        })->where('item_display.is_display', '=', Number::Display_Flag)
            ->orderBy('items.id', 'asc')
            ->paginate(9);
    }

    public static function onDateSearchItems($searchQuery)
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
        })->where('item_display.is_display', '=', Number::Display_Flag)
            ->where(function ($query) use ($searchQuery) {
                $query->where('items.name', "like", "%" . $searchQuery . "%");
                $query->orWhere('items.description', "like", "%" . $searchQuery . "%");
                $query->orWhere('items.category', "like", "%" . $searchQuery . "%");
            })
            ->orderBy('items.id', 'asc')
            ->paginate(10);
    }
}
