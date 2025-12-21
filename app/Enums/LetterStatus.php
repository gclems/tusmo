<?php

declare(strict_types=1);

namespace App\Enums;

enum LetterStatus: string
{
    case Correct = 'correct';
    case Misplaced = 'misplaced';
    case Absent = 'absent';
}
