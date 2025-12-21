import { cn } from '@/lib/utils';

import { useGame } from './game-context';

function WordFutureRow() {
    const { wordLength } = useGame();
    return (
        <div className="flex">
            {Array.from({ length: wordLength }).map((_, columnIndex) => (
                <div key={columnIndex} className={cn('flex size-10 items-center justify-center border text-2xl font-bold capitalize')} />
            ))}
        </div>
    );
}

export { WordFutureRow };
