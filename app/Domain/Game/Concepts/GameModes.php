<?php

declare(strict_types=1);

namespace App\Domain\Game\Concepts;

enum GameModes: string
{
    case Daily = 'daily';
    case DailySeries = 'daily_series';

    public function maxRounds(): int
    {
        return match ($this) {
            self::Daily => 1,
            self::DailySeries => 5,
        };
    }

    public function isValidRound(int $round): bool
    {
        return $round >= 1 && $round <= $this->maxRounds();
    }
}
