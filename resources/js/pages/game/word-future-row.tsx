import { cn } from 'tailwind-variants';
import { useGame } from './game-context';

function WordFutureRow() {
    const { wordLength } = useGame();
    return (
        <div className="flex">
            {Array.from({ length: wordLength }).map((_, columnIndex) => (
                <div
                    key={columnIndex}
                    className={cn('flex size-6 items-center justify-center border text-2xl font-bold capitalize sm:size-8 md:size-10')}
                />
            ))}
        </div>
    );
}

export { WordFutureRow };
