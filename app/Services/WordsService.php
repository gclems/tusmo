<?php

namespace App\Services;

use App\Models\Word;
use Normalizer;

class WordsService
{
    /**
     * Filter, normalize and insert words into the database
     */
    public function insertWords(array $words): void
    {
        $rowWords = [];
        $toInsert = [];
        foreach ($words as $word) {
            $word = mb_strtolower($word, 'UTF-8');
            $normalized = $this->normalize($word);

            $ignoreWord = strlen($word) < 5 // too short
                            || strlen($word) > 10 // too long
                            || preg_match('/^\p{L}+$/u', $word) !== 1; // has non-letter characters

            if ($ignoreWord
                || in_array($normalized, $rowWords, true) // duplicate in current batch
                || Word::where('normalized', $normalized)->exists() // already in database
            ) {
                continue;
            }

            $rowWords[] = $normalized;
            $toInsert[] = [
                'content' => $word,
                'normalized' => $normalized,
                'length' => strlen($normalized),
            ];
        }

        Word::insert($toInsert);
    }

    /**
     * Normalize a word by removing special characters and converting to lowercase
     */
    public function normalize(string $word): string
    {
        $cleanWord = mb_strtolower($word, 'UTF-8');

        // Remove accents, ç, ñ, and other diacritics
        $cleanWord = Normalizer::normalize($word, Normalizer::FORM_D);
        $cleanWord = preg_replace('/\p{Mn}/u', '', $cleanWord);

        return $cleanWord;
    }
}
