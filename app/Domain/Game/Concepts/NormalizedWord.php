<?php

declare(strict_types=1);

namespace App\Domain\Game\Concepts;

use Normalizer;

use function App\isNullOrEmpty;

final readonly class NormalizedWord
{
    public readonly string $raw;

    public readonly string $value;

    public readonly int $length;

    private function __construct(string $raw, ?string $normalized = null)
    {
        $this->raw = mb_trim($raw);

        $this->value = isNullOrEmpty($normalized) ? $this->normalize($raw) : mb_trim($normalized);

        $this->length = mb_strlen($this->value);
    }

    public static function fromWord(string $rawWord): self
    {
        return new self(
            $rawWord,
        );
    }

    private function normalize(string $word): string
    {
        // Remove accents, ç, ñ, and other diacritics
        $cleanWord = mb_strtolower($word, 'UTF-8');
        $cleanWord = Normalizer::normalize($cleanWord, Normalizer::FORM_D);

        return preg_replace('/\p{Mn}/u', '', $cleanWord);
    }
}
