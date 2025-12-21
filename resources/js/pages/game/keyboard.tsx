import { useState } from 'react';

import { CornerDownLeftIcon, DeleteIcon, EyeClosedIcon, EyeIcon } from 'lucide-react';
import { cn } from 'tailwind-variants';

import { useGame } from './game-context';

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
    const { correctLetters, misplacedLetters, eliminatedLetters, wordLength } = useGame();

    const [showEliminated, setShowEliminated] = useState(true);

    return (
        <div className="flex flex-col items-center justify-center gap-y-2">
            {layouts[layout].map((row, rowIndex) => (
                <div key={rowIndex} className="flex items-center gap-x-2">
                    {row.map((letter) => {
                        const isCorrect = correctLetters.includes(letter);
                        const isEliminated = eliminatedLetters.includes(letter);
                        const isMisplaced = misplacedLetters.includes(letter);

                        return (
                            <button
                                type="button"
                                onClick={() => onPressLetter(letter)}
                                key={letter}
                                className={cn(
                                    'flex size-10 appearance-none items-center justify-center rounded-sm border-2 capitalize',
                                    'border-gray-400 bg-gray-300 hover:bg-gray-400',
                                    {
                                        'opacity-50': isEliminated && !isMisplaced && !isCorrect && showEliminated,
                                        'border-amber-700 bg-amber-500 hover:bg-amber-400': isMisplaced,
                                        'border-green-600 bg-green-300 hover:bg-green-400': isCorrect,
                                        'opacity-0 hover:opacity-50': isEliminated && !isMisplaced && !isCorrect && !showEliminated,
                                    },
                                )}
                            >
                                {letter}
                            </button>
                        );
                    })}
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
                <button
                    type="button"
                    onClick={() => setShowEliminated((prev) => !prev)}
                    className={cn(
                        'flex size-6 appearance-none items-center justify-center rounded-sm border-2 capitalize',
                        'border-gray-400 bg-gray-300 capitalize hover:bg-gray-400',
                    )}
                    title={showEliminated ? 'Masquer les lettres éliminées' : 'Afficher les lettres éliminées'}
                >
                    {showEliminated ? <EyeClosedIcon /> : <EyeIcon />}
                </button>
            </div>
        </div>
    );
}

export { Keyboard };
