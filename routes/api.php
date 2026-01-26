<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProjectApiController;
use App\Http\Controllers\Api\ProjectTestimonialApiController;
use App\Http\Controllers\Api\Admin\AuthTokenController;
use App\Http\Controllers\Api\Admin\AdminProjectController;

/*
|--------------------------------------------------------------------------
| Public Read-Only API
|--------------------------------------------------------------------------
*/

Route::get('/projects', [ProjectApiController::class, 'index']);
Route::get('/projects/{project}', [ProjectApiController::class, 'show']);
Route::get('/projects/{project}/testimonials', [ProjectTestimonialApiController::class, 'index']);

/*
|--------------------------------------------------------------------------
| Admin API (Sanctum Protected)
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->group(function () {

    // Login (no auth yet)
    Route::post('/token', [AuthTokenController::class, 'store']);

    // Protected admin routes
    Route::middleware('auth:sanctum')->group(function () {

        // Logout
        Route::delete('/token', [AuthTokenController::class, 'destroy']);

        // Projects (write)
        Route::post('/projects', [AdminProjectController::class, 'store']);

        Route::put('/projects/{project}', [AdminProjectController::class, 'update']);

    });

});
