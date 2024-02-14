<?php

namespace Database\Factories\Api;

use App\Consts\Api\Number;
use App\Models\Api\Admin;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Api\>
 */
class AdminFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => Str::random(10),
            'email' => Str::random(10).'@test.com',
            'password' => Hash::make('test1234'),
            'token' => Str::random(60),
            'is_admin' => Number::Is_Admin_True,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
