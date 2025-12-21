<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Word;
use App\Services\WordsService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

final class GenerateDictionary extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generate-dictionary';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(WordsService $wordsService): void
    {
        $this->info('Clearing existing dictionary...');
        Word::truncate();

        $this->loadLemmas($wordsService);
        $this->loadInflections($wordsService);

        $created = Word::count();
        $this->info("\r\nCREATED {$created} WORDS");
    }

    private function loadLemmas(WordsService $wordsService): void
    {
        $this->info("\r\nLemmas...");

        $lemmasQuery = DB::connection(config('lexical.db_connection'))
            ->table('lemma')
            ->select('lemma.lemmaID', 'lemma.content')
            ->whereRaw('LENGTH(lemma.content) BETWEEN 5 AND 10');

        $bar = $this->output->createProgressBar($lemmasQuery->count());
        $bar->start();

        $lemmasQuery->chunkById(1000, function ($rows) use ($bar, $wordsService): void {
            $wordsService->insertWords($rows->map->content->toArray());
            $bar->advance($rows->count());
        }, 'lemmaID');

        $bar->finish();
    }

    private function loadInflections(WordsService $wordsService): void
    {
        $this->info("\r\nInflections...");

        $inflectionsQuery = DB::connection(config('lexical.db_connection'))
            ->table('inflection')
            ->select('inflection.inflectionID', 'inflection.content')
            ->where(function ($query): void {
                $query->whereNull('inflection.mood')
                    ->orWhere('inflection.mood', 'infinitive');
            })
            ->whereRaw('LENGTH(inflection.content) BETWEEN 5 AND 10');

        $bar = $this->output->createProgressBar($inflectionsQuery->count());
        $bar->start();

        $inflectionsQuery->chunkById(1000, function ($rows) use ($bar, $wordsService): void {
            $wordsService->insertWords($rows->map->content->toArray());
            $bar->advance($rows->count());
        }, 'inflectionID');

        $bar->finish();
    }
}
