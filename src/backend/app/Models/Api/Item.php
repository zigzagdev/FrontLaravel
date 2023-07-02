<?php

namespace App\Models\Api;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Laravel\Scout\Searchable;
use Symfony\Component\HttpFoundation\Response;

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
        $array = 'item_index';

        return $array;

    }

}
