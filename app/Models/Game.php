<?php

namespace App\Models;

use App\Enums\GameModes;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $fillable = [
        'playable_at',
        'mode',
        'round',
        'word',
        'normalized_word',
        'word_length',
    ];

    protected function casts(): array
    {
        return [
            'playable_at' => 'date:Y-m-d',
            'mode' => GameModes::class,
        ];
    }
}
