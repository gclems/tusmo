<?php

namespace App\Http\Controllers;

use App\Enums\GameModes;
use App\Http\Requests\WordGuessRequest;
use App\Services\WordGuessService;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class GameController extends Controller
{
    public function dailyWord(GameModes $gameMode, WordGuessService $wordGuessService)
    {
        return Inertia::render('game/page', ['gameMode' => $gameMode, ...$wordGuessService->getWordToGuessIndications(GameModes::Daily)]);
    }

    public function analyzeGuess(GameModes $gameMode, WordGuessRequest $request, WordGuessService $wordGuessService)
    {
        $guess = $request->string('guess');

        try {
            $guessResult = $wordGuessService->guess($gameMode, $guess);
        } catch (\Exception $e) {
            return Redirect::back()->withErrors(['guess' => $e->getMessage()]);
        }

        Redirect::back()->with([
            'attemptResult' => $guessResult,
        ]);
    }
}
