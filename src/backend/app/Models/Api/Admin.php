<?php

namespace App\Models\Api;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Admin extends Model
{
    use HasFactory, SoftDeletes;

    protected $model = Admin::class;

    protected  $guarded = [
        'id',
        'admin_id'
    ];

    public function Items()
    {
        return $this->hasMany('App\Api\Item');
    }
}
