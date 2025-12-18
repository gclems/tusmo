import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/input-otp';
import { cn } from '@/lib/utils';
import { useGame } from './game-context';

function WordActiveRow({ value, onChange }: { value: string; onChange: (value: string) => void }) {
    const { wordLength } = useGame();

    return (
        <InputOTP autoComplete="off" value={value} onChange={onChange} maxLength={wordLength} containerClassName="flex" name="guess" autoFocus>
            <InputOTPGroup>
                {Array.from({ length: wordLength }).map((_, columnIndex) => (
                    <Cell key={columnIndex} index={columnIndex} />
                ))}
            </InputOTPGroup>
        </InputOTP>
    );
}

function Cell({ index }: { index: number }) {
    return (
        <InputOTPSlot
            index={index}
            className={cn(
                'border-gray-500 bg-gray-300',
                'flex size-10 items-center justify-center border text-2xl font-bold capitalize',
                'data-[active=true]:bg-blue-200',
            )}
        />
    );
}

export { WordActiveRow };
