<?php

namespace Database\Factories\Api;

use App\Consts\Api\Number;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Api\>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->unique()->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => Hash::make('test1234'),
            'token' => Str::random(60),
            'is_admin' => Number::Is_Admin_False,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'is_able' => Number::Is_Able
        ];
    }
}
