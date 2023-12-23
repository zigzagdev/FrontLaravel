<?php

namespace App\Models\Api;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRememberToken extends Model
{
    use HasFactory;

    protected $model = UserRememberToken::class;
    protected $table = 'user_remember_tokens';

    protected $guarded = ['id'];
}
