<?php

namespace Database\Seeders;

use App\Consts\Api\Number;
use App\Models\Api\Admin;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Admin::create([
            'name' => Str::random(10),
            'email' => Str::random(10).'@test.com',
            'password' => Hash::make('test1234'),
            'token' => Str::random(60),
            'is_admin' => Number::Is_Admin_True,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
