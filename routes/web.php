<?php

declare(strict_types=1);

use App\Http\Controllers\GameController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\StatisticsController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('game/{gameMode}/{round?}', [GameController::class, 'dailyWord'])->name('game.index')
    ->where('round', '[0-9]+');
Route::post('game/{gameMode}/{round?}', [GameController::class, 'analyzeGuess'])->name('game.guess')
    ->where('round', '[0-9]+');

Route::middleware('guest')->group(function () {
    Route::post('register', [UsersController::class, 'store'])->name('register');
    Route::post('login', [SessionController::class, 'store'])->name('login');
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [SessionController::class, 'destroy'])->name('logout');

    Route::get('statistics', [StatisticsController::class, 'index'])->name('statistics');
});
