<?php

namespace App\Models\Api;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemFlag extends Model
{
    use HasFactory;

    protected $model = Item::class;

    public function Item()
    {
        return $this->belongsTo(Item::class);
    }

    public function onDateItem()
    {
        return self::select([
            'name',
            'description',
            'price',
            'category',
        ])->leftjoin('display_flag', function ($join) {
            $join->on('items.id', '=', 'display_flag.item_id');
        })->where('item.expiration', '>', Carbon::now())
            ->orderBy('item.created_at', 'asc')
            ->get();
    }
}
