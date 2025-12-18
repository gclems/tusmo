<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;

class DictionaryService
{
    const DICTIONARY_CACHE_KEY = 'game-dictionary';

    const DICTIONARY_BY_LENGTH_CACHE_KEY = 'game-dictionary-by-length';

    public function getDictionary(): array
    {
        return Cache::get(self::DICTIONARY_CACHE_KEY);
    }

    public function storeDictionary(array $words): void
    {
        foreach ($words as $word) {
            $cleanWord = $this->cleanWord($word); // need to do before filtering

            if (strlen($cleanWord) < 5 // too short
                || strlen($cleanWord) > 10 // too long
                || preg_match('/[^A-Za-z]/', $cleanWord) === 1 // any char that's not a letter (accent sensitive, hense the cleaning before)
            ) {
                continue;
            }

            $filteredWords[] = $cleanWord;
        }

        $byLength = [];
        foreach ($filteredWords as $word) {
            $byLength[strlen($word)][] = $word;
        }

        // write in cache
        Cache::forever(self::DICTIONARY_CACHE_KEY, $filteredWords);
        Cache::forever(self::DICTIONARY_BY_LENGTH_CACHE_KEY, $byLength);
    }

    public function cleanWord(string $word): string
    {
        $cleanWord = strtolower($word);
        $cleanWord = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $word);

        return $cleanWord;
    }
}
