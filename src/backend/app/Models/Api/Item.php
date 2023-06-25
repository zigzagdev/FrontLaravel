<?php

namespace App\Models\Api;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory, SoftDeletes;

    protected $model = Item::class;
    protected $guarded = ['id'];
    protected $table = 'items';
    protected $dates = ['deleted_at'];

//    public function Admin()
//    {
//        return $this->belongsTo(Admin::class, 'foreign_key');
//    }

}
