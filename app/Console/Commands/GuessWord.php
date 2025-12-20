<?php

namespace App\Console\Commands;

use App\Services\WordGuessesService;
use Illuminate\Console\Command;

class GuessWord extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:guess-word';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(WordGuessesService $wordGuessService): void
    {
        $this->output->getFormatter()->setStyle(
            'correct',
            new \Symfony\Component\Console\Formatter\OutputFormatterStyle('black', 'green')
        );
        $this->output->getFormatter()->setStyle(
            'misplaced',
            new \Symfony\Component\Console\Formatter\OutputFormatterStyle('black', 'yellow')
        );
        $this->output->getFormatter()->setStyle(
            'absent',
            new \Symfony\Component\Console\Formatter\OutputFormatterStyle('black', 'red')
        );

        $found = false;

        $indications = $wordGuessService->getGameIndications();
        while (! $found) {
            $this->info("The word to guess has {$indications['wordLength']} letters and starts with '".strtoupper($indications['firstLetter'])."'.");
            $guess = $this->ask('Try word ?');

            try {
                $result = $wordGuessService->guess($guess);

                $lineText = '';
                foreach (str_split($guess) as $index => $letter) {
                    $status = $result[$index];
                    $letter = strtoupper($letter);
                    switch ($status) {
                        case \App\Enums\LetterStatus::Correct:
                            $lineText .= "<correct> {$letter} </correct> ";
                            break;
                        case \App\Enums\LetterStatus::Misplaced:
                            $lineText .= "<misplaced> {$letter} </misplaced> ";
                            break;
                        case \App\Enums\LetterStatus::Absent:
                            $lineText .= "<absent> {$letter} </absent> ";
                            break;
                    }
                }

                $this->line($lineText);
                // $this->info('Result: '.implode(', ', array_map(fn ($status) => $status->value, $result)));

            } catch (\Exception $e) {
                $this->error($e->getMessage());

                continue;
            }

            if ($guess === $wordGuessService->getGame()) {
                $this->info('Congratulations! You found the word!');
                $found = true;
            }
        }
    }
}
