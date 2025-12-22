<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Domain\Game\Concepts\GameModes;
use App\Domain\Game\Services\GameGenerator;
use App\Models\Game;
use DateTimeInterface;

final class GameRepository
{
    public function __construct(
        private GameGenerator $generator
    ) {}

    public function findOrCreate(
        DateTimeInterface $date,
        GameModes $mode,
        int $round
    ): ?Game {
        return Game::query()
            ->where('mode', $mode->value)
            ->whereDate('playable_at', $date)
            ->where('round', $round)
            ->first() ?? $this->generator->generate($date, $mode, $round);
    }
}
