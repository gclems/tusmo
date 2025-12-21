<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Word;
use Illuminate\Console\Command;

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
    public function handle()
    {
        Word::truncate();

        $this->call('db:seed', [
            '--class' => 'DictionarySeeder',
        ]);
    }
}
