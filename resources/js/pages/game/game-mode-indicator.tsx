import { useGame } from './game-context';

function GameModeIndicator() {
    const { gameMode, round } = useGame();
    let text = '';

    switch (gameMode) {
        case 'daily':
            text = 'Mot du jour';
            break;
        case 'daily_series':
            text = `Série quotidienne - Mot ${round + 1}`;
            break;
        default:
            text = '';
    }

    return <div className="text-xl underline">{text}</div>;
}

export { GameModeIndicator };
