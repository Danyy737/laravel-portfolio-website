<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProjectApiController;
use App\Http\Controllers\Api\ProjectTestimonialApiController;
use App\Http\Controllers\Api\Admin\AuthTokenController;


Route::get('/projects', [ProjectApiController::class, 'index']);
Route::get('/projects/{project}', [ProjectApiController::class, 'show']);
Route::get('/projects/{project}/testimonials', [ProjectTestimonialApiController::class, 'index']);


Route::prefix('admin')->group(function () {
    // Login: get a token
    Route::post('/token', [AuthTokenController::class, 'store']);

    // Logout: revoke current token (requires being logged in via token)
    Route::middleware('auth:sanctum')->delete('/token', [AuthTokenController::class, 'destroy']);
});