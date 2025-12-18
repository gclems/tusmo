<?php

namespace App\Console\Commands;

use App\Services\DictionaryService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class DumpWords extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:dump-words';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(DictionaryService $dictionaryService)
    {
        $this->info('Fetching words from remote API...');
        $apiResponse = Http::get('https://raw.githubusercontent.com/words/an-array-of-french-words/refs/heads/master/index.json');
        $jsonSource = $apiResponse->json();

        $filteredWords = [];

        $this->info('Generating dictionary...');
        $dictionaryService->storeDictionary($jsonSource);
    }
}
