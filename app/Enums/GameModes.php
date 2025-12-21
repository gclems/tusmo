<?php

declare(strict_types=1);

namespace App\Enums;

enum GameModes: string
{
    case Daily = 'daily';
    case DailySeries = 'daily_series';
}
