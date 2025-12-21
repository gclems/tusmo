import { Input as BaseInput, mergeProps, useRender } from '@base-ui/react';
import { cn } from 'tailwind-variants';

function Input({ render = <BaseInput />, className, ...props }: useRender.ComponentProps<typeof BaseInput>) {
    const element = useRender({
        render,
        props: mergeProps<typeof BaseInput>(
            {
                className: cn(
                    'h-10 w-full',
                    'pl-3.5',
                    'border border-input-border text-base text-input-foreground',
                    'focus:outline-2 focus:-outline-offset-1 focus:outline-primary',
                    'data-invalid:border-destructive data-invalid:text-destructive-foreground',
                    className,
                ),
            },
            props,
        ),
    });

    return element;
}

export { Input };
