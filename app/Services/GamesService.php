<?php

declare(strict_types=1);

namespace App\Services;

use App\Enums\GameModes;
use App\Models\Game;
use App\Models\Word;
use DateTimeInterface;

final class GamesService
{
    public const GAME_MODES_CACHE_KEYS = [
        GameModes::Daily->value => 'game-daily-word',
        GameModes::DailySeries->value => 'game-daily-series-word',
    ];

    public function getGame(DateTimeInterface $date, GameModes $gameMode, int $round = 0): ?Game
    {
        $game = Game::query()
            ->where('mode', $gameMode)
            ->where('round', $round)
            ->where('playable_at', $date->format('Y-m-d'))
            ->first();

        if ($game === null) {
            switch ($gameMode) {
                case GameModes::Daily:
                    $game = $this->createDaylyGame($date);
                    break;
                case GameModes::DailySeries:
                    $game = $this->createDaylySeriesGame($date, $round);
                    break;
                default:
                    break;
            }
        }

        return $game;
    }

    private function selectRandomWord(?int $length = null): Word
    {
        $query = Word::query();
        if ($length !== null) {
            $query->where('length', $length);
        }

        $count = $query->count();
        $rand = random_int(0, $count - 1);

        return $query->skip($rand)->first();
    }

    private function createDaylyGame(DateTimeInterface $date): Game
    {
        $randomWord = $this->selectRandomWord();

        return $this->createFromWord($randomWord, $date, GameModes::Daily, 0);
    }

    private function createDaylySeriesGame(DateTimeInterface $date, int $round): Game
    {
        $randomWord = $this->selectRandomWord(5 + $round);

        return $this->createFromWord($randomWord, $date, GameModes::DailySeries, $round);
    }

    private function createFromWord(Word $word, DateTimeInterface $date, GameModes $gameMode, int $round): Game
    {
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
}
