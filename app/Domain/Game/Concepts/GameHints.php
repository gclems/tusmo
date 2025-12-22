<?php

declare(strict_types=1);

namespace App\Domain\Game\Concepts;

final readonly class GameHints
{
    public function __construct(
        public string $firstLetter,
        public int $wordLength,
        public int $maxAttempts
    ) {}
}
