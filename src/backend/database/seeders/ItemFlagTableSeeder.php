<?php

namespace Database\Seeders;

use App\Models\Api\ItemFlag;
use Illuminate\Database\Seeder;

class ItemFlagTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ItemFlag::factory(50)->create();
    }
}
