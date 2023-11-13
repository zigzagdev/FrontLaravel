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

Route::controller(AuthenticationController::class)->group(function () {
    Route::post('/admin/login', 'adminLogin');
    Route::post('/login', 'userLogin');
});

Route::controller(AdminController::class)->group(function () {
    Route::post('/admin/create', 'createAdmin');
});

Route::controller(UserController::class)->group(function () {
    Route::post('/user/create', 'createUser');
});

Route::controller(ItemController::class)->group(function () {
    Route::get('/items', 'allItems');
    Route::get('/search', 'searchItems');
});

Route::group(['middleware' => ['admin']], function () {
    Route::controller(AdminController::class)->group(function () {
        Route::get('/admin/{id}/profile', 'getAdmin');
        Route::put('/admin/{id}/update/name', 'updateAdminName');
        Route::put('/admin/{id}/update/email', 'updateAdminEmail');
        Route::get('/admin/{id}/user/all', 'allUser');
    });
    Route::controller(ItemController::class)->group(function () {
        Route::post('/create/item', 'createItem');
        Route::get('/item/{slug}', 'displayItem');
        Route::post('/item/{slug}', 'deleteItem');
        Route::put('/item/{slug}/update', 'updateItem');
    });
    Route::controller(AuthenticationController::class)->group(function () {
        Route::post('/logout', 'logoutAction');
    });
});

Route::middleware('user')->group(function () {
    Route::controller(UserController::class)->group(function () {
        Route::get('/user', 'eachUser');
        Route::put('/user/{id}/update/name', 'updateUserName');
        Route::put('/user/{id}/update/email', 'updateUserEmail');
    });
    Route::controller(AuthenticationController::class)->group(function () {
        Route::post('/logout', 'logoutAction');
    });
});
