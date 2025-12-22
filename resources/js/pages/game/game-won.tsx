import { Button } from '@/components/shanty-ui/button';
import { index } from '@/routes/game';
import { Link } from '@inertiajs/react';
import { ArrowRightCircleIcon, BookIcon } from 'lucide-react';
import { useGame } from './game-context';

function GameWon() {
    const { gameMode, round, gameStatus, gameSolution, maxRounds } = useGame();

    if (gameStatus !== 'won') {
        return null;
    }

    return (
        <>
            <div className="mt-4 text-green-600">Félicitations ! Vous avez gagné !</div>
            {gameSolution && (
                <a href={`https://fr.wiktionary.org/wiki/${gameSolution}`} target="_blank" rel="noopener noreferrer">
                    <BookIcon className="inline" />
                    &nbsp;Voir la définition de "<span className="font-bold uppercase">{gameSolution}</span>"
                </a>
            )}

            {gameMode === 'daily_series' && round < maxRounds && (
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
                    <ArrowRightCircleIcon /> Mot suivant
                </Button>
            )}
        </>
    );
}

export { GameWon };
