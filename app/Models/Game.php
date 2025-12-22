<?php

declare(strict_types=1);

namespace App\Models;

use App\Domain\Game\Concepts\GameModes;
use Illuminate\Database\Eloquent\Model;

final class Game extends Model
{
    protected $fillable = [
        'playable_at',
        'mode',
        'round',
        'word',
        'normalized_word',
        'word_length',
        'frequency',
    ];

    protected function casts(): array
    {
        return [
            'playable_at' => 'date:Y-m-d',
            'mode' => GameModes::class,
        ];
    }
}
