<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\GuessWordAction;
use App\Domain\Game\Concepts\GameModes;
use App\Domain\Game\Concepts\NormalizedWord;
use App\Domain\Game\Services\GameHintsGenerator;
use App\Http\Requests\WordGuessRequest;
use App\Repositories\GameRepository;
use Exception;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

final class GameController extends Controller
{
    public function __construct(
        private GameRepository $gameRepository,
        private GameHintsGenerator $gameHintsGenerator,
    ) {}

    public function dailyWord(GameModes $gameMode, ?int $round = 1)
    {
        $game = $this->gameRepository->findOrCreate(
            today(),
            $gameMode,
            $round
        );

        $hints = $this->gameHintsGenerator->generateHints(
            NormalizedWord::fromWord($game->word, $game->normalized_word)
        );

        return Inertia::render(
            'game/page',
            [
                'gameMode' => $gameMode,
                'round' => $round,
                'firstLetter' => $hints->firstLetter,
                'wordLength' => $hints->wordLength,
                'maxAttempts' => $hints->maxAttempts,
                'maxRounds' => $gameMode->maxRounds(),
            ]
        );
    }

    public function analyzeGuess(
        GameModes $gameMode,
        WordGuessRequest $request,
        GuessWordAction $guessWordAction,
        ?int $round = 1
    ) {
        $guess = (string) $request->string('guess');

        $game = $this->gameRepository->findOrCreate(
            today(),
            $gameMode,
            $round
        );

        try {
            $guessResult = $guessWordAction->handle($game, $guess);
        } catch (Exception $exception) {
            return Redirect::back()->withErrors(['guess' => $exception->getMessage()]);
        }

        $roundWon = $guessResult->isCorrect();
        $gameWon = $roundWon && $gameMode->maxRounds() === $round;

        Redirect::back()->with([
            'attemptResult' => $guessResult->toArray(),
            'roundWon' => $roundWon,
            'gameWon' => $gameWon,
            'solution' => $roundWon ? $game->word : null,
        ]);
    }
}
