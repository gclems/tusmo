import { guess } from '@/routes/game';
import { AttemptResult, Flash, LetterResult } from '@/types';
import { useForm } from '@inertiajs/react';
import { formatDate } from 'date-fns';
import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { GameLoader } from './game-loader';
import { GameSaver } from './game-saver';

type GameContextProps = {
    gameMode: string;
    round: number;
    maxRounds: number;
    wordLength: number;
    activeLineIndex: number;
    firstLetter: string;
    maxAttempts: number;
    attemptsResults: AttemptResult[];
    correctLetters: string[];
    misplacedLetters: string[];
    eliminatedLetters: string[];
    keyboardLayout: 'azerty' | 'qwerty' | 'alphabetic';
    gameStatus: 'playing' | 'won' | 'lost';
    gameSolution: string;
    form: ReturnType<typeof useForm>;
    submit: () => void;
    setActiveLineIndex: (index: number) => void;
    setAttemptsResults: (results: AttemptResult[]) => void;
    setCorrectLetters: (letters: string[]) => void;
    setMisplacedLetters: (letters: string[]) => void;
    setEliminatedLetters: (letters: string[]) => void;
    setKeyboardLayout: (layout: 'azerty' | 'qwerty' | 'alphabetic') => void;
    setGameStatus: (status: 'playing' | 'won' | 'lost') => void;
    setGameSolution: (solution: string) => void;
};

const GameContext = createContext<GameContextProps | null>(null);

function useGame() {
    const context = useContext(GameContext);

    if (!context) {
        throw new Error('useGame must be used within a <GameProvider />');
    }

    return context;
}

function GameProvider({
    children,
    gameMode,
    round = 1,
    wordLength,
    firstLetter,
    maxAttempts,
    maxRounds,
}: {
    children: ReactNode;
    gameMode: string;
    round: number;
    wordLength: number;
    firstLetter: string;
    maxAttempts: number;
    maxRounds: number;
}) {
    const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
    const [gameSolution, setGameSolution] = useState<string | null>(null);

    const [activeLineIndex, setActiveLineIndex] = useState(0);
    const [attemptsResults, setAttemptsResults] = useState<AttemptResult[]>([]);

    const [correctLetters, setCorrectLetters] = useState<string[]>([]);
    const [misplacedLetters, setMisplacedLetters] = useState<string[]>([]);
    const [eliminatedLetters, setEliminatedLetters] = useState<string[]>([]);

    const [keyboardLayout, setKeyboardLayout] = useState<'azerty' | 'qwerty' | 'alphabetic'>('azerty');

    const storageKey = `${formatDate(new Date(), 'yyyy-MM-dd')}-${gameMode}/${round}`;

    const form = useForm({
        guess: firstLetter,
    });

    const handleSubmit = useCallback(
        (e?: React.FormEvent) => {
            e?.preventDefault();

            if (form.data.guess.length !== wordLength) {
                return;
            }

            form.submit(
                guess({
                    gameMode,
                    round,
                }),
                {
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

                        const flash = response.props.flash as Flash;

                        setAttemptsResults((prev) => [
                            ...prev,
                            {
                                word: form.data.guess,
                                letters: flash.attemptResult.letters.map((letterResult: LetterResult) => ({
                                    letter: form.data.guess[letterResult.index],
                                    status: letterResult.status,
                                    index: letterResult.index,
                                })),
                            },
                        ]);

                        const newCorrectLetters: string[] = [];
                        const newMisplacedLetters: string[] = [];
                        const newEliminatedLetters: string[] = [];

                        flash.attemptResult.letters.forEach((letterResult: LetterResult, index: number) => {
                            const letter = form.data.guess[index];
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
                        setGameSolution(flash.solution ?? null);

                        // Detect loss & victory or prepare next guess
                        if (flash.gameWon || flash.roundWon) {
                            setGameStatus('won');
                        } else if (nextTurn >= maxAttempts) {
                            setGameStatus('lost');
                        } else {
                            form.reset();
                        }
                    },
                },
            );
        },
        [activeLineIndex, form, gameMode, maxAttempts, round, wordLength],
    );

    return (
        <GameContext
            value={{
                gameMode,
                round,
                wordLength,
                activeLineIndex,
                firstLetter,
                attemptsResults,
                correctLetters,
                misplacedLetters,
                eliminatedLetters,
                keyboardLayout,
                gameStatus,
                gameSolution,
                maxAttempts,
                maxRounds,
                setActiveLineIndex,
                setAttemptsResults,
                setCorrectLetters,
                setMisplacedLetters,
                setEliminatedLetters,
                setKeyboardLayout,
                setGameStatus,
                setGameSolution,
                form,
                submit: handleSubmit,
            }}
        >
            <GameLoader storageKey={storageKey} />
            <GameSaver storageKey={storageKey} />
            <form onSubmit={handleSubmit}>{children}</form>
        </GameContext>
    );
}

export { GameContext, GameProvider, useGame };
