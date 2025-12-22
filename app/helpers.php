<?php

declare(strict_types=1);

namespace App;

function isNullOrEmpty(mixed $value): bool
{
    return $value === null || (is_string($value) && mb_trim($value) === '');
}
