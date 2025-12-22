<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Domain\Game\Concepts\NormalizedWord;
use App\Models\Word;
use Illuminate\Database\Seeder;

final class DictionarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(
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

                    if (mb_strpos($word, 'œ') !== false) {
                        continue;
                    }

                    $normalized = NormalizedWord::fromWord($word);

                    if ($normalized->length < 5 || $normalized->length > 10) {
                        continue;
                    }

                    $insert[] = [
                        'content' => $normalized->raw,
                        'normalized' => $normalized->value,
                        'length' => $normalized->length,
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
