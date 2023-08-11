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
        Route::post('/create', 'createAdmin');
        Route::put('/update', 'updateAdmin');
        Route::get('/get', 'getAdmin');
        Route::put('/update/email', 'updateAdminEmail');
    });

    Route::controller(UserController::class)->group(function () {
        Route::post('/register', 'createUser');
        Route::put('/update', 'updateUser');
        Route::get('/users', 'allUser');
        Route::get('/user/:id', 'eachUser');
        Route::put('/update/email', 'updateEmail');
    });

    Route::controller(ItemController::class)->group(function () {
        Route::post('/register', 'createItem');
        // first display URL
        Route::get('/items', 'allItems');
        Route::get('/display/{id}', 'displayDetail');
        Route::get('/search', 'searchItems');
        Route::put('/update/{id}', 'updateItem');
    });
});

