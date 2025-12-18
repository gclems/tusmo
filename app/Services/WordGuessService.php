<?php

namespace App\Services;

use App\Enums\LetterStatus;
use Illuminate\Support\Facades\Cache;

class WordGuessService
{
    const DAILY_WORD_CACHE_KEY = 'game-daily-word';

    public function __construct(private DictionaryService $dictionaryService) {}

    public function getWordToGuess(): string
    {
        $word = Cache::remember(
            self::DAILY_WORD_CACHE_KEY,
            strtotime('tomorrow midnight') - time(), // cache until midnight
            function () {
                $dictionary = $this->dictionaryService->getDictionary();

                $wordIndex = array_rand($dictionary);

                return $dictionary[$wordIndex];
            });

        return strtolower($word);
    }

    public function getWordToGuessIndications(): array
    {
        $wordToGuess = $this->getWordToGuess();

        return [
            'wordLength' => strlen($wordToGuess),
            'firstLetter' => $wordToGuess[0],
        ];
    }

    public function guess(string $guess): array
    {
        $wordToGuess = $this->getWordToGuess();

        // Check if length is correct
        if (strlen($guess) !== strlen($wordToGuess)) {
            throw new \Exception('Invalid guess length');
        }

        $guess = $this->dictionaryService->cleanWord($guess);

        // check if the guess exists in the dictionary
        if (! in_array(strtolower($guess), $this->dictionaryService->getDictionary())) {
            throw new \Exception('Invalid guess: word not in dictionary');
        }

        $guessLetters = str_split($guess);

        $results = array_map(function ($letter) {
            return ['letter' => $letter, 'status' => null];
        }, $guessLetters);

        // check correct and absent letters
        foreach ($guessLetters as $index => $letter) {
            if ($letter === $wordToGuess[$index]) {
                // this is the correct letter at the correct position
                $results[$index]['status'] = LetterStatus::Correct;
            } elseif (strpos($wordToGuess, $letter) === false) {
                // the letter is not in the word at all
                $results[$index]['status'] = LetterStatus::Absent;
            }
        }

        // check present (but maybe absent) letters
        foreach ($guessLetters as $index => $letter) {
            if (! is_null($results[$index]['status'])) {
                continue; // already marked as Correct or Absent
            }

            // count occurrences in the word to guess
            $totalInWord = substr_count($wordToGuess, $letter);

            // count occurrences already marked as Correct
            $correctCount = 0;
            foreach ($results as $i => $status) {
                if ($status === LetterStatus::Correct && $guess[$i] === $letter) {
                    $correctCount++;
                }
            }

            // count occurrences already marked as Present
            $presentCount = 0;
            foreach ($results as $i => $status) {
                if ($status === LetterStatus::Misplaced && $guess[$i] === $letter) {
                    $presentCount++;
                }
            }

            if ($totalInWord > ($correctCount + $presentCount)) {
                // there's at least 1 remaining "unverified" occurrence of this letter in the word
                $results[$index]['status'] = LetterStatus::Misplaced;
            } else {
                // there's no remaining "unverified" occurrence of this letter in the word
                $results[$index]['status'] = LetterStatus::Absent;
            }
        }

        return $results;
    }
}
