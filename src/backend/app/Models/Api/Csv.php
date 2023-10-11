<?php

namespace App\Models\Api;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Csv extends Model
{
    use HasFactory;

    protected $model = Item::class;
    protected $table = 'items';
    protected $dates = ['deleted_at'];

}
