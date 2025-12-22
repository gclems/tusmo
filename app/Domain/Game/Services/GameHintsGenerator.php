<?php

declare(strict_types=1);

namespace App\Domain\Game\Services;

use App\Domain\Game\Concepts\GameHints;
use App\Domain\Game\Concepts\NormalizedWord;

final class GameHintsGenerator
{
    public const MAX_ATTEMPTS = 6;

    public function generateHints(NormalizedWord $word): GameHints
    {
        return new GameHints(
            $word->value[0],
            $word->length,
            self::MAX_ATTEMPTS
        );
    }
}
