import { useEffect } from 'react';
import { useGame } from './game-context';

function GameSaver({ storageKey }: { storageKey: string }) {
    const { activeLineIndex, attemptsResults, correctLetters, misplacedLetters, eliminatedLetters, gameStatus, gameSolution } = useGame();

    // save changes to local storage
    useEffect(() => {
        const stateToSave = {
            activeLineIndex,
            attemptsResults,
            correctLetters,
            misplacedLetters,
            eliminatedLetters,
            gameStatus,
            gameSolution,
        };
        localStorage.setItem(storageKey, JSON.stringify(stateToSave));
    }, [activeLineIndex, attemptsResults, correctLetters, eliminatedLetters, gameSolution, gameStatus, misplacedLetters, storageKey]);

    return null;
}

export { GameSaver };
