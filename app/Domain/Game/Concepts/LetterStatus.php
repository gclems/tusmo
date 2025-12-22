<?php

declare(strict_types=1);

namespace App\Domain\Game\Concepts;

enum LetterStatus: string
{
    case Correct = 'correct';
    case Misplaced = 'misplaced';
    case Absent = 'absent';
}
