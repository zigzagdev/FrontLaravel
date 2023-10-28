<?php

namespace App\Models\Api;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;


class Admin extends Authenticatable
{
    use HasFactory, SoftDeletes, HasApiTokens;

    protected $model = Admin::class;
    protected $guarded = ['id'];


    public function Items()
    {
        return $this->hasMany(Item::class, 'foreign_key');
    }
}
