import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { Fragment, useState } from 'react';
import { GameProvider } from './game-context';
import { Keyboard } from './keyboard';
import { WordActiveRow } from './word-active-row';
import { WordFutureRow } from './word-future-row';
import { WordPastRow } from './word-past-row';

type LetterStatus = 'correct' | 'misplaced' | 'absent';

type LetterResult = {
    letter: string;
    status: LetterStatus;
};

type AttemptResult = {
    guess: string;
    letters: Array<LetterResult>;
};

export default function Game({ wordLength, firstLetter }: { wordLength: number; firstLetter: string }) {
    const [activeLineIndex, setActiveLineIndex] = useState(0);
    const [attemptsResults, setAttemptsResults] = useState<AttemptResult[]>([]);

    const [correctLetters, setCorrectLetters] = useState<string[]>([]);
    const [misplacedLetters, setMisplacedLetters] = useState<string[]>([]);
    const [eliminatedLetters, setEliminatedLetters] = useState<string[]>([]);

    const [keyboardLayout, setKeyboardLayout] = useState<'azerty' | 'qwerty' | 'alphabetic'>('azerty');

    const { data, setData, post, reset } = useForm({
        guess: firstLetter,
    });

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();

        if (data.guess.length !== wordLength) {
            return;
        }

        post('/daily', {
            preserveState: true,
            async: true,
            onError: (errors) => {
                if (errors.guess) {
                    alert(errors.guess);
                }
            },
            onSuccess: (response) => {
                setActiveLineIndex((prev) => prev + 1);

                const result: AttemptResult = {
                    guess: data.guess,
                    letters: response.props.flash.attemptResult,
                };

                setAttemptsResults((prev) => [
                    ...prev,
                    {
                        guess: data.guess,
                        letters: result.letters.map((letterResult: LetterResult, index: number) => ({
                            letter: data.guess[index],
                            status: letterResult.status,
                        })),
                    },
                ]);

                const newCorrectLetters: string[] = [];
                const newMisplacedLetters: string[] = [];
                const newEliminatedLetters: string[] = [];

                result.letters.forEach((letterResult: LetterResult, index: number) => {
                    const letter = data.guess[index];
                    switch (letterResult.status) {
                        case 'correct':
                            newCorrectLetters.push(letter);
                            break;
                        case 'misplaced':
                            newMisplacedLetters.push(letter);
                            break;
                        default:
                        case 'absent':
                            newEliminatedLetters.push(letter);
                            break;
                    }
                });

                setCorrectLetters((prev) => Array.from(new Set([...prev, ...newCorrectLetters])));
                setMisplacedLetters((prev) => Array.from(new Set([...prev, ...newMisplacedLetters])));
                setEliminatedLetters((prev) => Array.from(new Set([...prev, ...newEliminatedLetters])));

                reset();

                // Detect victory
                if (result.letters.every((letter) => letter.status === 'correct')) {
                    alert('VICTOIRE !');
                }
            },
        });
    };

    const handleKeyboardPressLetter = (letter: string) => {
        if (data.guess.length < wordLength) {
            setData('guess', data.guess + letter);
        }
    };

    const handleKeyboardPressEnter = () => {
        handleSubmit();
    };

    const handleKeyboardPressBackspace = () => {
        setData('guess', data.guess.slice(0, -1));
    };

    return (
        <GameProvider value={{ wordLength, firstLetter, activeLineIndex, attemptsResults, correctLetters, misplacedLetters, eliminatedLetters }}>
            <div className="flex h-screen w-full flex-col items-center justify-center">
                <h1 className="text-3xl">Bienvenue dans Tu Tu Tusmo !</h1>

                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="border border-gray-500">
                        {Array.from({ length: 6 }).map((_, lineIndex) => {
                            return (
                                <Fragment key={lineIndex}>
                                    {lineIndex < activeLineIndex && <WordPastRow index={lineIndex} />}
                                    {lineIndex === activeLineIndex && <WordActiveRow value={data.guess} onChange={(val) => setData('guess', val)} />}
                                    {lineIndex > activeLineIndex && <WordFutureRow />}
                                </Fragment>
                            );
                        })}
                    </div>
                </form>

                <div className="mt-4">
                    <Keyboard
                        currentGuess={data.guess}
                        layout={keyboardLayout}
                        onPressLetter={handleKeyboardPressLetter}
                        onPressEnter={handleKeyboardPressEnter}
                        onPressBackspace={handleKeyboardPressBackspace}
                    />
                </div>

                <div className="mt-6 flex items-center gap-x-2">
                    {(['azerty', 'qwerty', 'alphabetic'] as const).map((layout) => (
                        <button
                            key={layout}
                            type="button"
                            onClick={() => setKeyboardLayout(layout)}
                            className={cn('border-2 px-4 py-2 uppercase', {
                                'border-blue-400 bg-cyan-100': keyboardLayout === layout,
                                'border-gray-400 bg-gray-300': keyboardLayout !== layout,
                            })}
                        >
                            {layout}
                        </button>
                    ))}
                </div>
            </div>
        </GameProvider>
    );
}

export type { AttemptResult, LetterResult };
