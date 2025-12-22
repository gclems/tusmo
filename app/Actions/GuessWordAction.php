<?php

declare(strict_types=1);

namespace App\Actions;

use App\Domain\Game\Concepts\NormalizedWord;
use App\Domain\Game\Concepts\WordGuessResult;
use App\Domain\Game\Services\WordGuessEvaluator;
use App\Models\Game;
use Exception;

final readonly class GuessWordAction
{
    public function __construct(
        private WordGuessEvaluator $wordGuessEvaluator,
    ) {}

    /**
     * Execute the action.
     */
    public function handle(Game $game, string $guess): WordGuessResult
    {
        if (mb_strlen($guess) !== $game->word_length) {
            throw new Exception('Invalid guess length');
        }

        $normalizedGuess = NormalizedWord::fromWord($guess);
        $wordToGuess = NormalizedWord::fromWord(
            $game->word,
            $game->normalized_word
        );

        return $this->wordGuessEvaluator->evaluate(
            $normalizedGuess,
            $wordToGuess
        );
    }
}
