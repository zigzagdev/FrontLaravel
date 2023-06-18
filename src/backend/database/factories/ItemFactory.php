<?php

namespace Database\Factories;

use App\Models\Api\Item;
use App\Models\Api\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ItemFactory extends Factory
{
    protected $model = Item::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
//            'name' => $this->faker->colorName,
//            'description' => $this->faker->text,
//            'category' => $this->faker->numberBetween(0, 20),
//            'price' => $this->faker->numberBetween(100, 1000000),
//            'click_count' => $this->faker->randomDigit(),
//            'admin_id' => User::factory(),
        ];
    }
}
