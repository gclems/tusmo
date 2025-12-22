<?php

declare(strict_types=1);

namespace App\Domain\Game\Concepts;

use InvalidArgumentException;

final class LetterGuessResult
{
    public function __construct(
        public readonly string $letter,
        public readonly int $index,
        public readonly LetterStatus $status,
    ) {
        if (mb_strlen($letter) !== 1) {
            throw new InvalidArgumentException('Letter must be a single character.');
        }
    }

    public function isCorrect(): bool
    {
        return $this->status === LetterStatus::Correct;
    }

    public function isMisplaced(): bool
    {
        return $this->status === LetterStatus::Misplaced;
    }

    public function isAbsent(): bool
    {
        return $this->status === LetterStatus::Absent;
    }
}
