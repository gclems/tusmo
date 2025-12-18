import { cn } from '@/lib/utils';
import { CornerDownLeftIcon, DeleteIcon } from 'lucide-react';
import { useGame } from './game-context';
import { AttemptResult } from './page';

const layouts = {
    azerty: [
        ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'],
        ['w', 'x', 'c', 'v', 'b', 'n'],
    ],
    qwerty: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    ],
    alphabetic: [
        ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
        ['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's'],
        ['t', 'u', 'v', 'w', 'x', 'y', 'z'],
    ],
};

function Keyboard({
    currentGuess,
    onPressLetter,
    onPressEnter,
    onPressBackspace,
    layout = 'azerty',
}: {
    currentGuess?: string;
    onPressLetter: (letter: string) => void;
    onPressEnter: () => void;
    onPressBackspace: () => void;
    layout?: 'azerty' | 'qwerty' | 'alphabetic';
}) {
    const { eliminatedLetters, wordLength, attemptsResults } = useGame();

    const lastResult = attemptsResults[attemptsResults.length - 1] as AttemptResult;
    const misplacedLetters =
        lastResult?.letters.filter((letterStatus) => letterStatus.status === 'misplaced').map((letterStatus) => letterStatus.letter) || [];

    return (
        <div className="flex flex-col items-center justify-center gap-y-2">
            {layouts[layout].map((row, rowIndex) => (
                <div key={rowIndex} className="flex items-center gap-x-2">
                    {row.map((letter) => (
                        <button
                            type="button"
                            onClick={() => onPressLetter(letter)}
                            key={letter}
                            className={cn('flex size-10 appearance-none items-center justify-center rounded-sm border-2 capitalize', {
                                'opacity-50': eliminatedLetters.includes(letter),
                                'border-amber-700 bg-amber-500 hover:bg-amber-400': misplacedLetters.includes(letter),
                                'border-gray-400 bg-gray-300 hover:bg-gray-400': !misplacedLetters.includes(letter),
                            })}
                        >
                            {letter}
                        </button>
                    ))}
                </div>
            ))}
            <div className="flex items-center gap-x-2">
                <button
                    type="button"
                    onClick={onPressBackspace}
                    className={cn(
                        'flex h-10 w-20 appearance-none items-center justify-center rounded-sm border-2 border-gray-400 bg-gray-300 capitalize hover:bg-gray-400',
                    )}
                    disabled={(currentGuess?.length || 0) === 0}
                >
                    <DeleteIcon />
                </button>
                <button
                    type="button"
                    onClick={onPressEnter}
                    className={cn(
                        'flex size-20 appearance-none items-center justify-center rounded-sm border-2 border-gray-400 bg-gray-300 capitalize hover:bg-gray-400',
                    )}
                    disabled={(currentGuess?.length || 0) < wordLength}
                >
                    <CornerDownLeftIcon />
                </button>
            </div>
        </div>
    );
}

export { Keyboard };
