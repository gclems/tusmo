import { ReactNode } from 'react';

import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-react';
import { cn } from 'tailwind-variants';

interface ComboboxItem {
    label: ReactNode;
    value: string;
}

function Root({
    id,
    placeholder = 'Choisir',
    emptyMessage = 'Aucune option disponible',
    className,
    ...rootProps
}: BaseCombobox.Root.Props<ComboboxItem> & {
    id?: string;
    emptyMessage?: ReactNode;
    placeholder?: string;
    className?: string;
}) {
    return (
        <>
            <BaseCombobox.Root {...rootProps}>
                <div className={cn('relative [&>input]:pr-8 has-[.combobox-clear]:[&>input]:pr-[calc(0.5rem+1.5rem*2)]', className)}>
                    <BaseCombobox.Input
                        id={id}
                        placeholder={placeholder}
                        className={cn(
                            'h-10 w-64 pl-3.5',
                            'border border-input-border bg-input text-base text-input-foreground',
                            'focus:outline-2 focus:-outline-offset-1 focus:outline-primary',
                        )}
                    />
                    <div className={cn('absolute right-2 bottom-0 h-10 text-foreground', 'flex items-center justify-center')}>
                        <BaseCombobox.Clear
                            className="combobox-clear flex h-10 w-6 items-center justify-center rounded bg-transparent p-0"
                            aria-label="Clear selection"
                        >
                            <XIcon className="size-4" />
                        </BaseCombobox.Clear>
                        <BaseCombobox.Trigger
                            className="flex h-10 w-6 items-center justify-center rounded bg-transparent p-0"
                            aria-label="Open popup"
                        >
                            <ChevronDownIcon className="size-4" />
                        </BaseCombobox.Trigger>
                    </div>
                </div>

                <BaseCombobox.Portal>
                    <BaseCombobox.Positioner className="outline-none" sideOffset={4}>
                        <BaseCombobox.Popup className="max-h-92 w-(--anchor-width) max-w-(--available-width) origin-(--transform-origin) rounded-md bg-[canvas] text-gray-900 shadow-lg shadow-gray-200 outline-1 outline-gray-200 transition-[transform,scale,opacity] duration-100 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300">
                            <BaseCombobox.Empty className="p-4 text-[0.925rem] leading-4 text-gray-600 empty:m-0 empty:p-0">
                                {emptyMessage}
                            </BaseCombobox.Empty>
                            <BaseCombobox.List className="max-h-[min(23rem,var(--available-height))] scroll-py-2 overflow-y-auto overscroll-contain py-2 outline-0 data-empty:p-0">
                                {(item: ComboboxItem) => (
                                    <BaseCombobox.Item
                                        key={item.value}
                                        value={item}
                                        className="grid cursor-default grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-8 pl-4 text-base leading-4 outline-none select-none data-highlighted:relative data-highlighted:z-0 data-highlighted:text-gray-50 data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-2 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm data-[highlighted]:before:bg-gray-900"
                                    >
                                        <BaseCombobox.ItemIndicator className="col-start-1">
                                            <CheckIcon className="size-3" />
                                        </BaseCombobox.ItemIndicator>
                                        <div className="col-start-2">{item.label}</div>
                                    </BaseCombobox.Item>
                                )}
                            </BaseCombobox.List>
                        </BaseCombobox.Popup>
                    </BaseCombobox.Positioner>
                </BaseCombobox.Portal>
            </BaseCombobox.Root>
        </>
    );
}

function Item() {}

const Combobox = Object.assign(Root, {
    Item,
});

export { Combobox };
