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

    Route::controller(UserController::class)->group(function () {
        Route::get('/admin/users', 'allUser');
    });

    // Only user can see the page .

    Route::controller(AdminController::class)->group(function () {
        Route::post('/admin/create', 'createAdmin');
        Route::put('/admin/update', 'updateAdmin');
        Route::get('/admin/profile', 'getAdmin');
        Route::put('/admin/update/email', 'updateAdminEmail');
    });

    Route::controller(UserController::class)->group(function () {
        Route::post('/user/create', 'createUser');
        Route::put('/update/update', 'updateUser');
        Route::get('/user/:id', 'eachUser');
        Route::put('/update/user/email', 'updateEmail');
    });

    Route::controller(ItemController::class)->group(function () {
        Route::post('/create/item', 'createItem');
        // first display URL
        Route::get('/items', 'allItems');
        Route::get('/display/{slug}', 'displayDetail');
        Route::get('/search', 'searchItems');
        Route::put('/update/{slug}', 'updateItem');
    });
});
