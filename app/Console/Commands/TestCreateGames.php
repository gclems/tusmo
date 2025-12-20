<?php

namespace App\Console\Commands;

use App\Enums\GameModes;
use App\Models\Game;
use App\Services\GamesService;
use Illuminate\Console\Command;

class TestCreateGames extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-create-games';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(GamesService $gamesService)
    {
        Game::truncate();

        $start = new \DateTime('2026-01-01');
        $end = new \DateTime('2026-12-31');

        $current = $start;
        while ($current <= $end) {
            $gamesService->getGame($current, GameModes::Daily);
            $gamesService->getGame($current, GameModes::DailySeries, 0);
            $gamesService->getGame($current, GameModes::DailySeries, 1);
            $gamesService->getGame($current, GameModes::DailySeries, 2);
            $gamesService->getGame($current, GameModes::DailySeries, 3);
            $gamesService->getGame($current, GameModes::DailySeries, 4);
            $current->modify('+1 day');
        }
    }
}
