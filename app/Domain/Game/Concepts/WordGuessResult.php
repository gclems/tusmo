<?php

declare(strict_types=1);

namespace App\Domain\Game\Concepts;

use ArrayIterator;
use IteratorAggregate;
use Traversable;

final class WordGuessResult implements IteratorAggregate
{
    /** @var LetterGuessResult[] */
    private array $letters;

    public function __construct(
        public readonly string $word,
        LetterGuessResult ...$letters)
    {
        $this->letters = $letters;
    }

    public function getIterator(): Traversable
    {
        return new ArrayIterator($this->letters);
    }

    public function isCorrect(): bool
    {
        foreach ($this->letters as $letter) {
            if ($letter->isCorrect() === false) {
                return false;
            }
        }

        return true;
    }

    public function toArray(): array
    {
        return [
            'word' => $this->word,
            'letters' => array_map(fn ($letter) => [
                'letter' => $letter->letter,
                'index' => $letter->index,
                'status' => $letter->status->value,
            ], $this->letters)];
    }
}
