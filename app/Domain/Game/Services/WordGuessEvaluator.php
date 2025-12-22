<?php

declare(strict_types=1);

namespace App\Domain\Game\Services;

use App\Domain\Game\Concepts\LetterGuessResult;
use App\Domain\Game\Concepts\LetterStatus;
use App\Domain\Game\Concepts\NormalizedWord;
use App\Domain\Game\Concepts\WordGuessResult;
use Exception;

final class WordGuessEvaluator
{
    public function evaluate(
        NormalizedWord $guessWord,
        NormalizedWord $referenceWord
    ): WordGuessResult {
        if ($guessWord->length !== $referenceWord->length) {
            throw new Exception('Words must be of the same length to compare');
        }

        $guessLetters = mb_str_split($guessWord->value);
        $letterResults = [];
        $results = array_map(fn ($letter): array => ['letter' => $letter, 'status' => null], $guessLetters);

        // check correct letters
        foreach ($guessLetters as $index => $letter) {
            if ($letter === $referenceWord->value[$index]) {
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
            $totalInWord = mb_substr_count($referenceWord->value, $letter);
            // count occurrences already marked as Correct or Misplaced
            $checkedCount = 0;
            foreach ($results as $i => $result) {
                $status = $result['status'];
                if (($status === LetterStatus::Correct || $status === LetterStatus::Misplaced)
                    && $guessWord->value[$i] === $letter) {
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

        return new WordGuessResult(
            $guessWord->value,
            ...array_map(
                function ($result, $index) {
                    return new LetterGuessResult(
                        letter: $result['letter'],
                        index: $index,
                        status: $result['status'],
                    );
                },
                $results,
                array_keys($results),
            )
        );
    }
}
