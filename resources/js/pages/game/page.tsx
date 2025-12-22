import { ComponentProps, Fragment } from 'react';

import { cn } from 'tailwind-variants';

import { GameProvider, useGame } from './game-context';
import { GameModeIndicator } from './game-mode-indicator';
import { GameWon } from './game-won';
import { Keyboard } from './keyboard';
import { WordActiveRow } from './word-active-row';
import { WordFutureRow } from './word-future-row';
import { WordPastRow } from './word-past-row';

function Game() {
    const { maxAttempts, activeLineIndex, keyboardLayout, gameStatus, setKeyboardLayout } = useGame();

    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            {/* <h1 className="text-3xl">Bienvenue dans Tu Tu Tusmo !</h1> */}
            <GameModeIndicator />

            <div className="mt-6 border border-gray-500">
                {Array.from({ length: maxAttempts }).map((_, lineIndex) => {
                    const isPast = lineIndex < activeLineIndex;
                    const isPlayable = lineIndex === activeLineIndex && gameStatus === 'playing';
                    const isNotPlayable = lineIndex > activeLineIndex || (lineIndex === activeLineIndex && gameStatus !== 'playing');
                    return (
                        <Fragment key={lineIndex}>
                            {isPast && <WordPastRow index={lineIndex} />}
                            {isPlayable && <WordActiveRow />}
                            {isNotPlayable && <WordFutureRow />}
                        </Fragment>
                    );
                })}
            </div>

            {gameStatus === 'playing' && (
                <>
                    <div className="mt-4">
                        <Keyboard />
                    </div>

                    <div className="mt-6 flex items-center gap-x-2">
                        {(['azerty', 'qwerty', 'alphabetic'] as const).map((layout) => (
                            <button
                                key={layout}
                                type="button"
                                onClick={() => setKeyboardLayout(layout)}
                                className={cn('border-2 px-4 py-2 uppercase', {
                                    'border-blue-400 bg-cyan-100': keyboardLayout === layout,
                                    'border-gray-400 bg-gray-300': keyboardLayout !== layout,
                                })}
                            >
                                {layout}
                            </button>
                        ))}
                    </div>
                </>
            )}

            <GameWon />
            {gameStatus === 'lost' && <div className="mt-4 text-red-600">Dommage ! Vous avez perdu !</div>}
        </div>
    );
}

export default function Page(props: Omit<ComponentProps<typeof GameProvider>, 'children'>) {
    return (
        <GameProvider {...props}>
            <Game />
        </GameProvider>
    );
}
