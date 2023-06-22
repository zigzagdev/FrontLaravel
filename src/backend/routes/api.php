<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('api')->group(function () {

    Route::controller(AdminController::class)->group(function () {
        Route::post('/registerAdmin', 'createAdmin');
        Route::put('/updateAdmin', 'updateAdmin');
    });

    Route::controller(UserController::class)->group(function () {
        Route::post('/registerUser', 'createUser');
        Route::put('/updateUser', 'updateUser');
    });

});

