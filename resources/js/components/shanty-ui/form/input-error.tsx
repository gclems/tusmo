import { mergeProps, useRender } from '@base-ui/react';
import { cn } from 'tailwind-variants';

interface InputErrorProps extends useRender.ComponentProps<'p'> {
    required?: boolean;
}

function InputError({ render, className, ...props }: InputErrorProps) {
    const element = useRender({
        defaultTagName: 'p',
        render,
        props: mergeProps<'p'>(
            {
                className: cn('text-sm text-destructive', className),
            },
            props,
        ),
    });

    return element;
}

export { InputError };
