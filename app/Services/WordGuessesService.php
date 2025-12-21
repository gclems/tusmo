<?php

declare(strict_types=1);

namespace App\Services;

use App\Enums\GameModes;
use App\Enums\LetterStatus;
use App\Models\Word;
use DateTimeInterface;
use Exception;

final readonly class WordGuessesService
{
    public const DAILY_WORD_CACHE_KEY = 'game-daily-word';

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
            'wordLength' => mb_strlen($wordToGuess),
            'firstLetter' => $wordToGuess[0],
            'maxAttempts' => 6,
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
        if (mb_strlen($guess) !== $game->word_length) {
            throw new Exception('Invalid guess length');
        }

        $guess = $this->wordsService->normalize($guess);
        $wordToGuess = $game->normalized_word;

        // check if the guess exists in the (normalized) dictionary
        if (! Word::where('normalized', $guess)->exists()) {
            throw new Exception('Invalid guess: word not in dictionary');
        }

        return $this->compare($guess, $wordToGuess);
    }

    /**
     * Compare a guess word to a reference word and return, for each letter, a statuts
     * indicating whether the letter is correct, misplaced or absent.
     *
     * It does NOT check if the words exist in the dictionary.
     * It assumes the words are normalized (it does NOT normalize them).
     * The words MUST have the same length.
     */
    public function compare(string $guessWord, string $referenceWord): array
    {
        if (mb_strlen($guessWord) !== mb_strlen($referenceWord)) {
            throw new Exception('Words must be of the same length to compare');
        }

        $guessLetters = mb_str_split($guessWord);
        $results = array_map(fn ($letter): array => ['letter' => $letter, 'status' => null], $guessLetters);

        // check correct letters
        foreach ($guessLetters as $index => $letter) {
            if ($letter === $referenceWord[$index]) {
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
            $totalInWord = mb_substr_count($referenceWord, $letter);
            // count occurrences already marked as Correct or Misplaced
            $checkedCount = 0;
            foreach ($results as $i => $result) {
                $status = $result['status'];
                if (($status === LetterStatus::Correct || $status === LetterStatus::Misplaced)
                    && $guessWord[$i] === $letter) {
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
