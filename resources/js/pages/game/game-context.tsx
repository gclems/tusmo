import { createContext, ReactNode, useContext } from 'react';

type GameContextProps = {
    wordLength: number;
    activeLineIndex: number;
    firstLetter: string;
    attemptsResults: Array<unknown>;
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
