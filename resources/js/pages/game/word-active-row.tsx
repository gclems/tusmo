import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/input-otp';
import { cn } from '@/lib/utils';
import { REGEXP_ONLY_CHARS } from 'input-otp';
import { useGame } from './game-context';

function WordActiveRow({ value, onChange }: { value: string; onChange: (value: string) => void }) {
    const { wordLength, attemptsResults } = useGame();

    return (
        <div className="relative">
            <div className={cn('absolute top-0 right-0 left-0 flex items-center opacity-50')}>
                {Array.from({ length: wordLength }).map((_, columnIndex) => {
                    // check in attemptsResults if the letter as already been found correct
                    let letter = '';

                    attemptsResults.every((res) => {
                        const letterAttempt = res.letters[columnIndex];
                        if (letterAttempt.status === 'correct') {
                            letter = letterAttempt.letter;
                            return false;
                        }
                        return true;
                    });

                    return (
                        <div key={columnIndex} className={cn(cellClassName)}>
                            {letter}
                        </div>
                    );
                })}
            </div>
            <InputOTP
                autoComplete="off"
                value={value}
                onChange={onChange}
                maxLength={wordLength}
                containerClassName="flex"
                name="guess"
                inputMode="text"
                pattern={REGEXP_ONLY_CHARS}
                autoFocus
            >
                <InputOTPGroup>
                    {Array.from({ length: wordLength }).map((_, columnIndex) => (
                        <Cell key={columnIndex} index={columnIndex} />
                    ))}
                </InputOTPGroup>
            </InputOTP>
        </div>
    );
}

const cellClassName = cn(
    'border-gray-500',
    'flex size-10 items-center justify-center border text-2xl font-bold capitalize',
    'data-[active=true]:bg-blue-300/50',
);

function Cell({ index }: { index: number }) {
    return <InputOTPSlot index={index} className={cn(cellClassName, 'bg-transparent data-char:bg-input')} />;
}

export { WordActiveRow };
