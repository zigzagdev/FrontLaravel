<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ItemController;
use App\Http\Controllers\Api\AuthenticationController;

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

Route::middleware(['api', 'cors'])->group(function () {

    Route::controller(AuthenticationController::class)->group(function () {
        Route::post('/login', 'loginAuth');
        Route::post('/logout', 'logoutAuth');
    });

    Route::controller(AdminController::class)->group(function () {
        Route::post('/registerAdmin', 'createAdmin');
        Route::put('/updateAdmin', 'updateAdmin');
        Route::get('/getAdmin', 'getAdmin');
        Route::put('/updateAdminEmail', 'updateAdminEmail');
    });

    Route::controller(UserController::class)->group(function () {
        Route::post('/registerUser', 'createUser');
        Route::put('/updateUser', 'updateUser');
        Route::get('/userAll', 'allUser');
        Route::get('/each/:id', 'eachUser');
        Route::put('/userEmail', 'updateEmail');
    });

    Route::controller(ItemController::class)->group(function () {
        Route::post('/registerItem', 'createItem');
        // first display URL
        Route::get('/allItems', 'allItems');
        Route::get('/displayItem/{id}', 'displayDetail');
        Route::get('/searchItem', 'searchItems');
        Route::put('/updateItem/{id}', 'updateItem');
    });
});

