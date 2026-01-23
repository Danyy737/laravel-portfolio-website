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

// If your contact method handles POST too, keep it as match.
// If it's GET-only right now, leave as get.
Route::get('/contact', [PortfolioController::class, 'contact'])->name('contact');
Route::post('/contact', [PortfolioController::class, 'contact'])
    ->middleware('friendly.throttle:1,1')
    ->name('contact.submit');


// Breeze dashboard (logged-in user dashboard)
Route::get('/dashboard', function () {
    $user = auth()->user();

    // Admins go to CMS
    if ($user && ($user->email === 'mouradany2004@gmail.com' || (bool) $user->is_admin)) {
        return redirect()->route('admin.dashboard');
    }

    // Everyone else goes home (or wherever you want)
    return redirect()->route('home');
})->middleware(['auth'])->name('dashboard');

// Profile routes (Breeze)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin CMS routes
// Admin CMS routes (admin-only)
Route::middleware(['admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        // Admin landing page
        Route::get('/', function () {
            return view('admin.dashboard');
        })->name('dashboard');

        // Admin resources
        Route::resource('projects', ProjectController::class)->except(['show']);
        Route::resource('testimonials', TestimonialController::class)->except(['show']);

    });
require __DIR__.'/auth.php';
