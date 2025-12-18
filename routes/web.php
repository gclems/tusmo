<?php

use App\Http\Controllers\GameController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('daily', [GameController::class, 'dailyWord'])->name('daily.word');
Route::post('daily', [GameController::class, 'analyzeGuess'])->name('daily.guess');
