<?php

namespace App\Models\Api;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Click extends Model
{
    use HasFactory, SoftDeletes;

    protected $model = Click::class;
    protected $guarded = ['id'];
    protected $table = 'click_counts';
    protected $dates = ['deleted_at'];

    public function Item()
    {
        return $this->belongsTo(Item::class);
    }

    public static function displayPopularItems()
    {
        return self::select([
            'click_count', 'item_id'
        ])->leftjoin('items', function ($join) {
            $join->on('click_count.item_id', '=', 'items.id');
        })->orderBy('items.id', 'DESC')
            ->limit(10);
    }
}
