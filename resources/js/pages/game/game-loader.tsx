import { useEffect } from 'react';
import { useGame } from './game-context';

function GameLoader({ storageKey }: { storageKey: string }) {
    const { setActiveLineIndex, setAttemptsResults, setCorrectLetters, setMisplacedLetters, setEliminatedLetters, setGameStatus, setGameSolution } =
        useGame();

    // load from local storage
    useEffect(() => {
        const savedState = localStorage.getItem(storageKey);
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            setActiveLineIndex(parsedState.activeLineIndex);
            setAttemptsResults(parsedState.attemptsResults);
            setCorrectLetters(parsedState.correctLetters);
            setMisplacedLetters(parsedState.misplacedLetters);
            setEliminatedLetters(parsedState.eliminatedLetters);
            setGameStatus(parsedState.gameStatus);
            setGameSolution(parsedState.gameSolution);
        }
    }, [
        setActiveLineIndex,
        setAttemptsResults,
        setCorrectLetters,
        setEliminatedLetters,
        setGameSolution,
        setGameStatus,
        setMisplacedLetters,
        storageKey,
    ]);

    return null;
}

export { GameLoader };
