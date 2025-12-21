<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Word;
use App\Services\WordsService;
use Illuminate\Database\Seeder;

final class DictionarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(
        WordsService $wordsService
    ): void {
        // open ./words_frequencies.txr
        $file = fopen(database_path('seeders/words_frequencies.txt'), 'r');
        if ($file) {
            $insert = [];

            while (($line = fgets($file)) !== false) {
                // split line by ";"
                $parts = explode(';', $line);

                if (count($parts) === 2) {
                    $word = mb_trim($parts[0]);
                    $frequency = mb_trim($parts[1]);

                    if ($frequency < 1) {
                        continue;
                    }

                    // continue if word contains the 'œ' character
                    if (mb_strpos($word, 'œ') !== false) {
                        continue;
                    }

                    $length = mb_strlen($word);
                    $normalized = $wordsService->normalize($word);

                    $insert[] = [
                        'content' => $word,
                        'normalized' => $normalized,
                        'length' => $length,
                        'frequency' => $frequency,
                    ];

                    if (count($insert) >= 1000) {
                        Word::insert($insert);
                        $insert = [];
                    }
                }
            }

            Word::insert($insert);

            fclose($file);
        }
    }
}
