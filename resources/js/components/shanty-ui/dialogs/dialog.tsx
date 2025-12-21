import { ComponentProps } from 'react';

import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { cn } from 'tailwind-variants';

import { stringIsNullOrEmpty } from '@/lib';
import { Button } from '../button';

const dialogBackdropClassName = (className?: string) =>
    cn(
        'fixed inset-0 min-h-dvh',
        'bg-black/30',
        'backdrop-blur-[0.5px] supports-[-webkit-backdrop-filter:initial]:backdrop-blur-[0.5px]',
        'transition-all duration-150',
        'data-ending-style:opacity-0 data-starting-style:opacity-0',
        'supports-[-webkit-touch-callout:none]:absolute',
        className,
    );

const dialogPopupSizeClassName = (size: 'sm' | 'md' | 'lg' | 'xl' | 'giant') => {
    return cn({
        'w-80 max-w-[calc(100vw-1rem)]': size === 'sm',
        'w-125 max-w-[calc(100vw-1rem)]': size === 'md',
        'w-200 max-w-[calc(100vw-1rem)]': size === 'lg',
        'w-285 max-w-[calc(100vw-1rem)]': size === 'xl',
    });
};

function Backdrop({ className, ...props }: Omit<BaseDialog.Backdrop.Props, 'className'> & { className?: string }) {
    return <BaseDialog.Backdrop className={dialogBackdropClassName(className)} {...props} />;
}

function Header({
    title = 'Dialog title',
    description,
    className,
    ...props
}: ComponentProps<'div'> & {
    title?: string;
    description?: string;
}) {
    return (
        <div className={cn('space-y-1 px-6', className)} {...props}>
            <BaseDialog.Title className="-mt-1.5 text-lg font-medium">{title}</BaseDialog.Title>
            {!stringIsNullOrEmpty(description) && (
                <BaseDialog.Description className="text-base text-muted-modal-foreground">{description}</BaseDialog.Description>
            )}
        </div>
    );
}

function Body({ children, className, ...props }: ComponentProps<'div'>) {
    return (
        <div className={cn('px-6', className)} {...props}>
            {children}
        </div>
    );
}

function Footer({ className, ...props }: ComponentProps<'div'>) {
    return <div className={cn('flex justify-end gap-4 px-6', className)} {...props} />;
}

function CloseButton(props: BaseDialog.Close.Props) {
    return <BaseDialog.Close render={<Button variant="light" color="neutral" />} {...props} />;
}

const Dialog = Object.assign(
    {},
    {
        Backdrop,
        Header,
        Body,
        Footer,
        CloseButton,
        createHandle: BaseDialog.createHandle,
    },
);

export { Dialog, dialogBackdropClassName, dialogPopupSizeClassName };
