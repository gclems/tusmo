<?php

namespace App\Console\Commands;

use App\Models\Word;
use App\Services\WordsService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class GenerateDictionary extends Command
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
        DB::transaction(function () use ($wordsService) {
            $this->info('Clearing existing dictionary...');
            Word::truncate();

            $this->info("\r\nLemmas...");

            $lemmasQuery = DB::connection(config('lexical.db_connection'))
                ->table('lemma')
                ->select('lemma.lemmaID', 'lemma.content')
                ->whereRaw('LENGTH(lemma.content) BETWEEN 5 AND 10');
            $lemmasQuery->chunkById(1000, function ($rows) use ($wordsService) {
                $wordsService->insertWords($rows->map->content->toArray());
            }, 'lemmaID');

            $this->info("\r\nInflections...");

            $inflectionsQuery = DB::connection(config('lexical.db_connection'))
                ->table('inflection')
                ->select('inflection.inflectionID', 'inflection.content')
                ->where(function ($query) {
                    $query->whereNull('inflection.mood')
                        ->orWhere('inflection.mood', 'infinitive');
                })
                ->whereRaw('LENGTH(inflection.content) BETWEEN 5 AND 10');
            $inflectionsQuery->chunkById(1000, function ($rows) use ($wordsService) {
                $wordsService->insertWords($rows->map->content->toArray());
            }, 'inflectionID');
        });

        $created = Word::count();
        $this->info("\r\nCREATED $created WORDS");
    }
}
