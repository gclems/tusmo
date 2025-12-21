import { createContext, ReactNode, useContext } from 'react';

type LetterStatus = 'correct' | 'misplaced' | 'absent';

type LetterResult = {
    letter: string;
    status: LetterStatus;
};

type AttemptResult = {
    guess: string;
    letters: Array<LetterResult>;
};

type GameContextProps = {
    wordLength: number;
    activeLineIndex: number;
    firstLetter: string;
    attemptsResults: AttemptResult[];
    correctLetters: string[];
    misplacedLetters: string[];
    eliminatedLetters: string[];
};

const GameContext = createContext<GameContextProps | null>(null);

function useGame() {
    const context = useContext(GameContext);

    if (!context) {
        throw new Error('useGame must be used within a <GameProvider />');
    }

    return context;
}

function GameProvider({ children, value }: { children: ReactNode; value: GameContextProps }) {
    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export { GameContext, GameProvider, useGame };

export type { AttemptResult, LetterResult, LetterStatus };
