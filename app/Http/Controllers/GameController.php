<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\GameModes;
use App\Enums\LetterStatus;
use App\Http\Requests\WordGuessRequest;
use App\Services\WordGuessesService;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

final class GameController extends Controller
{
    public function __construct(
        private WordGuessesService $wordGuessesService,
    ) {}

    public function dailyWord(GameModes $gameMode, ?int $round = 0)
    {
        return Inertia::render(
            'game/page',
            [
                'gameMode' => $gameMode,
                'round' => $round,
                ...$this->wordGuessesService->getGameIndications(
                    today(),
                    $gameMode,
                    $round
                ),
            ]
        );
    }

    public function analyzeGuess(
        GameModes $gameMode,
        WordGuessRequest $request,
        ?int $round = 0,
    ) {
        $guess = (string) $request->string('guess');

        Log::debug('GUESS ATTEMPT', ['guess' => $guess, 'mode' => $gameMode, 'round' => $round]);

        try {
            $guessResult = $this->wordGuessesService->guess($guess, today(), $gameMode, $round);
        } catch (Exception $exception) {
            return Redirect::back()->withErrors(['guess' => $exception->getMessage()]);
        }

        $roundWon = true;
        foreach ($guessResult as $letterInfo) {
            if ($letterInfo['status'] !== LetterStatus::Correct) {
                $roundWon = false;
                break;
            }
        }

        $gameWon = false;
        if ($roundWon) {
            switch ($gameMode) {
                case GameModes::Daily:
                    $gameWon = true;
                    break;
                case GameModes::DailySeries:
                    if ($round === 4) {
                        $gameWon = true;
                    }
                    break;
            }
        }

        Redirect::back()->with([
            'attemptResult' => $guessResult,
            'roundWon' => $roundWon,
            'gameWon' => $gameWon,
        ]);
    }
}
