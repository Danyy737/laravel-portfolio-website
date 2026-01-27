<?php

use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PortfolioController;
use Illuminate\Support\Facades\Route;

// Public portfolio pages
Route::get('/', [PortfolioController::class, 'home'])->name('home');
Route::get('/about', [PortfolioController::class, 'about'])->name('about');
Route::get('/projects', [PortfolioController::class, 'projects'])->name('projects');

Route::get('/contact', [PortfolioController::class, 'contact'])->name('contact');
Route::post('/contact', [PortfolioController::class, 'contact'])
    ->middleware('friendly.throttle:1,1')
    ->name('contact.submit');

// ✅ REACT (PUBLIC) 
Route::view('/react', 'react');

Route::view('/react/{any}', 'react')
    ->where('any', '.*');

Route::get('/dashboard', function () {
    $user = auth()->user();

    if ($user && ($user->email === 'mouradany2004@gmail.com' || (bool) $user->is_admin)) {
        return redirect()->route('admin.dashboard');
    }

    return redirect()->route('home');
})->middleware(['auth'])->name('dashboard');

// Profile routes (Breeze)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin CMS routes (admin-only)
Route::middleware(['admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        Route::get('/', function () {
            return view('admin.dashboard');
        })->name('dashboard');

        Route::resource('projects', ProjectController::class)->except(['show']);
        Route::resource('testimonials', TestimonialController::class)->except(['show']);

    });

require __DIR__.'/auth.php';
