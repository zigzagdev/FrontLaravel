<?php

namespace Database\Factories\Api;

use App\Consts\Api\Number;
use App\Models\Api\Item;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Api\ItemFlag>
 */
class ItemFlagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'is_display' => $this->faker->numberBetween(0, 1),
            'item_id' => Item::factory()->create()->id,
            'expired_at' => Carbon::today()->addMonth(Number::Six_Months),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ];
    }
}
