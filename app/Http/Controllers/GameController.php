<?php

namespace App\Http\Controllers;

use App\Enums\GameModes;
use App\Http\Requests\WordGuessRequest;
use App\Services\WordGuessesService;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class GameController extends Controller
{
    public function dailyWord(GameModes $gameMode, WordGuessesService $wordGuessesService)
    {
        return Inertia::render(
            'game/page',
            [
                'gameMode' => $gameMode,
                ...$wordGuessesService->getGameIndications(
                    today(),
                    GameModes::Daily
                ),
            ]
        );
    }

    public function analyzeGuess(
        GameModes $gameMode,
        WordGuessRequest $request,
        WordGuessesService $wordGuessesService
    ) {
        $guess = $request->string('guess');

        try {
            $guessResult = $wordGuessesService->guess($guess, today(), $gameMode);
        } catch (\Exception $e) {
            return Redirect::back()->withErrors(['guess' => $e->getMessage()]);
        }

        Redirect::back()->with([
            'attemptResult' => $guessResult,
        ]);
    }
}
