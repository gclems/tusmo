<?php

namespace App\Services;

use App\Enums\GameModes;
use Illuminate\Support\Facades\Cache;

class GameService
{
    const GAME_MODES_CACHE_KEYS = [
        GameModes::Daily->value => 'game-daily-word',
        GameModes::DailySeries->value => 'game-daily-series-word',
    ];

    public function __construct(private DictionaryService $dictionaryService) {}

    public function getWordToGuess(GameModes $gameMode): string|array
    {
        $word = Cache::remember(
            self::GAME_MODES_CACHE_KEYS[$gameMode->value],
            strtotime('tomorrow midnight') - time(), // cache until midnight
            function () use ($gameMode) {
                switch ($gameMode) {
                    case GameModes::Daily:
                        return $this->selectNewDailyWord();
                    case GameModes::DailySeries:
                        return $this->selectNewDailySeriesWords();
                }
            });

        return strtolower($word);
    }

    private function selectNewDailyWord(): string
    {
        $dictionary = $this->dictionaryService->getDictionary();

        $wordIndex = array_rand($dictionary);

        return $dictionary[$wordIndex];
    }

    private function selectNewDailySeriesWords(): array
    {
        return [];
    }
}
