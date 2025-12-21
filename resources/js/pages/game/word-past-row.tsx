import { cn } from '@/lib/utils';

import { useGame } from './game-context';
import { AttemptResult } from './page';

function WordPastRow({ index }: { index: number }) {
    const { attemptsResults, wordLength } = useGame();

    const attempt = attemptsResults[index] as AttemptResult;

    return (
        <div className="flex">
            {Array.from({ length: wordLength }).map((_, columnIndex) => {
                const letterResult = attempt.letters[columnIndex];
                return (
                    <div
                        key={columnIndex}
                        className={cn('flex size-10 items-center justify-center border text-2xl font-bold capitalize', {
                            'bg-green-300': letterResult.status === 'correct',
                            'bg-amber-500': letterResult.status === 'misplaced',
                            'bg-gray-500': letterResult.status === 'absent',
                        })}
                    >
                        {letterResult.letter}
                    </div>
                );
            })}
        </div>
    );
}

export { WordPastRow };
