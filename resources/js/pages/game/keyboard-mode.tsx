import { cn } from 'tailwind-variants';
import { useGame } from './game-context';

function KeyboardMode() {
    const { keyboardLayout, setKeyboardLayout } = useGame();
    return (
        <div className="flex items-center gap-x-2">
            {(['azerty', 'qwerty', 'alphabetic'] as const).map((layout) => (
                <button
                    key={layout}
                    type="button"
                    onClick={() => setKeyboardLayout(layout)}
                    className={cn('border-2 uppercase', 'px-2 py-0 sm:px-3 sm:py-1 md:px-4 md:py-2', {
                        'border-blue-400 bg-cyan-100': keyboardLayout === layout,
                        'border-gray-400 bg-gray-300': keyboardLayout !== layout,
                    })}
                >
                    {layout}
                </button>
            ))}
        </div>
    );
}

export { KeyboardMode };
