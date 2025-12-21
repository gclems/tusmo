import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { BookIcon } from 'lucide-react';
import { Fragment, useState } from 'react';
import { AttemptResult, GameProvider, LetterResult } from './game-context';
import { Keyboard } from './keyboard';
import { WordActiveRow } from './word-active-row';
import { WordFutureRow } from './word-future-row';
import { WordPastRow } from './word-past-row';

const MAX_ATTEMPTS = 6;

export default function Game({ gameMode, wordLength, firstLetter }: { gameMode: 'daily' | 'dailySeries'; wordLength: number; firstLetter: string }) {
    const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
    const [gameSolution, setGameSolution] = useState<string>('');

    const [activeLineIndex, setActiveLineIndex] = useState(0);
    const [attemptsResults, setAttemptsResults] = useState<AttemptResult[]>([]);

    const [correctLetters, setCorrectLetters] = useState<string[]>([]);
    const [misplacedLetters, setMisplacedLetters] = useState<string[]>([]);
    const [eliminatedLetters, setEliminatedLetters] = useState<string[]>([]);

    const [keyboardLayout, setKeyboardLayout] = useState<'azerty' | 'qwerty' | 'alphabetic'>('azerty');

    const { data, setData, post, ...form } = useForm({
        guess: firstLetter,
    });

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();

        if (data.guess.length !== wordLength) {
            return;
        }

        post(`/game/${gameMode}`, {
            preserveState: true,
            async: true,
            onError: (errors) => {
                if (errors.guess) {
                    alert(errors.guess);
                }
            },
            onSuccess: (response) => {
                const nextTurn = activeLineIndex + 1;
                setActiveLineIndex(nextTurn);

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

                // Detect loss & victory or prepare next guess
                if (result.letters.every((letter) => letter.status === 'correct')) {
                    setGameStatus('won');
                    setGameSolution(data.guess);
                } else if (nextTurn >= MAX_ATTEMPTS) {
                    setGameStatus('lost');
                } else {
                    form.reset();
                    // // fill the form value with the correct letters for the next attempt
                    // let nextGuess = '';
                    // for (let i = 0; i < wordLength; i++) {
                    //     const correctLetter = result.letters[i].status === 'correct' ? result.letters[i].letter : ' ';
                    //     nextGuess += correctLetter;
                    // }

                    // form.setDefaults({ guess: nextGuess });
                    // form.resetAndClearErrors();

                    // console.log({ nextGuess });
                    // console.log({ form });
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
            <div className="flex h-full w-full flex-col items-center justify-center">
                <h1 className="text-3xl">Bienvenue dans Tu Tu Tusmo !</h1>

                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="border border-gray-500">
                        {Array.from({ length: MAX_ATTEMPTS }).map((_, lineIndex) => {
                            const isPast = lineIndex < activeLineIndex;
                            const isPlayable = lineIndex === activeLineIndex && gameStatus === 'playing';
                            const isNotPlayable = lineIndex > activeLineIndex || (lineIndex === activeLineIndex && gameStatus !== 'playing');
                            return (
                                <Fragment key={lineIndex}>
                                    {isPast && <WordPastRow index={lineIndex} />}
                                    {isPlayable && <WordActiveRow value={data.guess} onChange={(val) => setData('guess', val)} />}
                                    {isNotPlayable && <WordFutureRow />}
                                </Fragment>
                            );
                        })}
                    </div>
                </form>

                {gameStatus === 'playing' && (
                    <>
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
                    </>
                )}

                {gameStatus === 'won' && (
                    <>
                        <div className="mt-4 text-green-600">Félicitations ! Vous avez gagné !</div>
                        {gameSolution && (
                            <a href={`https://fr.wiktionary.org/wiki/${gameSolution}`} target="_blank" rel="noopener noreferrer">
                                <BookIcon className="inline" />
                                &nbsp;Voir la définition
                            </a>
                        )}
                    </>
                )}
                {gameStatus === 'lost' && <div className="mt-4 text-red-600">Dommage ! Vous avez perdu !</div>}
            </div>
        </GameProvider>
    );
}
