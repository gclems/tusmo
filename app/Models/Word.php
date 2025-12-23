<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

final class Word extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'content',
        'normalized',
        'length',
        'frequency',
    ];

    protected function casts(): array
    {
        return [
            'frequency' => 'decimal:2',
        ];
    }
}
