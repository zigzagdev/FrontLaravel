<?php

namespace Database\Factories\Api;

use App\Consts\Api\Number;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Api\>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $wordName = $this->faker->unique()->word();

        return [
            'name' => $wordName,
            'description' => $this->faker->sentence(),
            'price' => $this->faker->numberBetween(100, 100000),
            'category' => $this->faker->numberBetween(1, 28),
            'expiration' => Carbon::now(),
            'slug' => $wordName,
            'admin_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
