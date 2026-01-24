<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProjectApiController;
use App\Http\Controllers\Api\ProjectTestimonialApiController;

Route::get('/projects', [ProjectApiController::class, 'index']);
Route::get('/projects/{project}', [ProjectApiController::class, 'show']);
Route::get('/projects/{project}/testimonials', [ProjectTestimonialApiController::class, 'index']);
