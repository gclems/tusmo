<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\GameModes;
use App\Http\Requests\WordGuessRequest;
use App\Services\WordGuessesService;
use Exception;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

final class GameController extends Controller
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
        } catch (Exception $exception) {
            return Redirect::back()->withErrors(['guess' => $exception->getMessage()]);
        }

        Redirect::back()->with([
            'attemptResult' => $guessResult,
        ]);
    }
}
