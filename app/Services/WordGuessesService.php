<?php

namespace App\Services;

use App\Enums\GameModes;
use App\Enums\LetterStatus;
use App\Models\Word;
use DateTimeInterface;

class WordGuessesService
{
    const DAILY_WORD_CACHE_KEY = 'game-daily-word';

    public function __construct(
        private WordsService $wordsService,
        private GamesService $gamesService
    ) {}

    public function getGameIndications(DateTimeInterface $date, GameModes $gameMode, ?int $round = 0): array
    {
        $wordToGuess =
            $this->gamesService->getGame(
                $date,
                $gameMode,
                $round
            )->normalized_word;

        return [
            'wordLength' => strlen($wordToGuess),
            'firstLetter' => $wordToGuess[0],
        ];
    }

    public function guess(
        string $guess,
        DateTimeInterface $date,
        GameModes $gameMode,
        int $round = 0
    ): array {
        $game = $this->gamesService->getGame(
            $date,
            $gameMode,
            $round
        );

        // Check if length is correct
        if (strlen($guess) !== $game->word_length) {
            throw new \Exception('Invalid guess length');
        }

        $guess = $this->wordsService->normalize($guess);
        $wordToGuess = $game->normalized_word;

        // check if the guess exists in the (normalized) dictionary
        if (! Word::where('normalized', $guess)->exists()) {
            throw new \Exception('Invalid guess: word not in dictionary');
        }

        $guessLetters = str_split($guess);

        $results = array_map(function ($letter) {
            return ['letter' => $letter, 'status' => null];
        }, $guessLetters);

        // check correct letters
        foreach ($guessLetters as $index => $letter) {
            if ($letter === $wordToGuess[$index]) {
                // this is the correct letter at the correct position
                $results[$index]['status'] = LetterStatus::Correct;
            }
        }

        // check misplaced & absent letters
        foreach ($guessLetters as $index => $letter) {
            if (! is_null($results[$index]['status'])) {
                continue; // already marked as Correct or Absent
            }

            // count occurrences in the word to guess
            $totalInWord = substr_count($wordToGuess, $letter);
            // count occurrences already marked as Correct or Misplaced
            $checkedCount = 0;
            foreach ($results as $i => $result) {
                $status = $result['status'];
                if (($status === LetterStatus::Correct || $status === LetterStatus::Misplaced)
                    && $guess[$i] === $letter) {
                    $checkedCount++;
                }
            }

            if ($totalInWord > $checkedCount) {
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
