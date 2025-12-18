<?php

namespace App\Http\Controllers;

use App\Http\Requests\WordGuessRequest;
use App\Services\WordGuessService;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class GameController extends Controller
{
    public function dailyWord(WordGuessService $wordGuessService)
    {
        return Inertia::render('game/page', $wordGuessService->getWordToGuessIndications());
    }

    public function getDailyWordParameters(WordGuessService $wordGuessService)
    {
        return response()->json($wordGuessService->getWordToGuessIndications());
    }

    public function analyzeGuess(WordGuessRequest $request, WordGuessService $wordGuessService)
    {
        $guess = $request->string('guess');

        try {
            $guessResult = $wordGuessService->guess($guess);
        } catch (\Exception $e) {
            return Redirect::back()->withErrors(['guess' => $e->getMessage()]);
        }

        Redirect::back()->with([
            'attemptResult' => $guessResult,
        ]);
    }
}
