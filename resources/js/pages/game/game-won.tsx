import { Button } from '@/components/shanty-ui/button';
import { index } from '@/routes/game';
import { Link } from '@inertiajs/react';
import { ArrowRightCircleIcon, BookIcon } from 'lucide-react';
import { useGame } from './game-context';

function GameWon() {
    const { gameMode, round, gameStatus, gameSolution } = useGame();

    if (gameStatus !== 'won') {
        return null;
    }

    return (
        <>
            <div className="mt-4 text-green-600">Félicitations ! Vous avez gagné !</div>
            {gameSolution && (
                <a href={`https://fr.wiktionary.org/wiki/${gameSolution}`} target="_blank" rel="noopener noreferrer">
                    <BookIcon className="inline" />
                    &nbsp;Voir la définition
                </a>
            )}

            {gameMode === 'daily_series' && round < 4 && (
                <Button
                    className="mt-4"
                    render={
                        <Link
                            href={index({
                                gameMode,
                                round: round + 1,
                            })}
                        />
                    }
                >
                    <ArrowRightCircleIcon /> Tour suivant
                </Button>
            )}
        </>
    );
}

export { GameWon };
