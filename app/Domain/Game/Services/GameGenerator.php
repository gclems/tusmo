<?php

declare(strict_types=1);

namespace App\Domain\Game\Services;

use App\Domain\Game\Concepts\GameModes;
use App\Models\Game;
use App\Models\Word;
use DateTimeInterface;
use InvalidArgumentException;

final class GameGenerator
{
    public function generate(
        DateTimeInterface $date,
        GameModes $mode,
        int $round): Game
    {
        if ($mode->isValidRound($round) === false) {
            throw new InvalidArgumentException('Invalid round for the selected game mode.');
        }

        return match ($mode) {
            GameModes::Daily => $this->generateDailyGameRound($date),
            GameModes::DailySeries => $this->generateDailySeriesGameRound($date, $round),
        };
    }

    /**
     * $minFrequency and $maxFrequency are decimals with 2 places (e.g., 2.50).
     */
    private function selectRandomWord(
        ?string $minFrequency = null,
        ?string $maxFrequency = null,
        ?int $minLength = null,
        ?int $maxLength = null
    ): Word {
        $query = Word::query();
        if ($minFrequency !== null) {
            $query->where('frequency', '>=', $minFrequency);
        }

        if ($maxFrequency !== null) {
            $query->where('frequency', '<=', $maxFrequency);
        }

        if ($minLength !== null) {
            $query->where('length', '>=', $minLength);
        }

        if ($maxLength !== null) {
            $query->where('length', '<=', $maxLength);
        }

        $count = $query->count();
        $rand = random_int(0, $count - 1);

        return $query->skip($rand)->first();
    }

    private function createFromWord(
        Word $word,
        DateTimeInterface $date,
        GameModes $gameMode,
        int $round
    ): Game {
        return Game::create([
            'playable_at' => $date->format('Y-m-d'),
            'mode' => $gameMode,
            'round' => $round,
            'word' => $word->content,
            'normalized_word' => $word->normalized,
            'word_length' => $word->length,
            'frequency' => $word->frequency,
        ]);
    }

    private function generateDailyGameRound(DateTimeInterface $date): Game
    {
        $randomWord = $this->selectRandomWord(null, null, 7);

        return $this->createFromWord(
            $randomWord,
            $date,
            GameModes::Daily,
            1
        );
    }

    private function generateDailySeriesGameRound(
        DateTimeInterface $date,
        int $round
    ): Game {
        $minFrequency = null;
        $maxFrequency = null;
        $minLength = 5 + $round;
        $maxLength = 6 + $round;

        if ($round === 0) {
            $minFrequency = 2.5;
        }

        if ($round > 0) {
            $previousGame = Game::query()
                ->where('mode', GameModes::DailySeries)
                ->where('round', $round - 1)
                ->where('playable_at', $date->format('Y-m-d'))
                ->first();

            $maxFrequency = $previousGame?->frequency;
        }

        $randomWord = $this->selectRandomWord(
            $minFrequency,
            $maxFrequency,
            $minLength,
            $maxLength
        );

        return $this->createFromWord($randomWord, $date, GameModes::DailySeries, $round);
    }
}
