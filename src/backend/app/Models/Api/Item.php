<?php

namespace App\Models\Api;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Item extends Model
{
    use HasFactory, SoftDeletes, Searchable;

    protected $model = Item::class;
    protected $guarded = ['id'];
    protected $table = 'items';
    protected $dates = ['deleted_at'];

    public function Admin()
    {
        return $this->belongsTo(Admin::class);
    }

    public function searchableAs()
    {
         return 'item_index';
    }

    public function Flag()
    {
        return $this->hasMany(DisplayFlag::class);
    }

}
