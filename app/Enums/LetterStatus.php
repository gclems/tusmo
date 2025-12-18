<?php

namespace App\Enums;

enum LetterStatus: string
{
    case Correct = 'correct';
    case Misplaced = 'misplaced';
    case Absent = 'absent';
}
