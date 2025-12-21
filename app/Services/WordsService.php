<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Word;
use Normalizer;

final class WordsService
{
    /**
     * Filter, normalize and insert words into the database
     */
    public function insertWords(array $words): void
    {
        $rowWords = [];
        $toInsert = [];
        foreach ($words as $word) {
            $word = mb_strtolower((string) $word, 'UTF-8');
            $normalized = $this->normalize($word);

            $ignoreWord = mb_strlen($word) < 5 // too short
                            || mb_strlen($word) > 10 // too long
                            || preg_match('/^\p{L}+$/u', $word) !== 1; // has non-letter characters

            if ($ignoreWord) {
                continue;
            }

            if (in_array($normalized, $rowWords, true)) {
                continue;
            }

            if (Word::where('normalized', $normalized)->exists()) {
                continue;
            }

            $rowWords[] = $normalized;
            $toInsert[] = [
                'content' => $word,
                'normalized' => $normalized,
                'length' => mb_strlen($normalized),
            ];
        }

        Word::insert($toInsert);
    }

    /**
     * Normalize a word by removing special characters and converting to lowercase
     */
    public function normalize(string $word): string
    {
        // Remove accents, ç, ñ, and other diacritics
        $cleanWord = mb_strtolower($word, 'UTF-8');
        $cleanWord = Normalizer::normalize($cleanWord, Normalizer::FORM_D);

        return preg_replace('/\p{Mn}/u', '', $cleanWord);
    }
}
