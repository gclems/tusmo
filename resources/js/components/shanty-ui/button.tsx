import { ComponentProps } from 'react';

import { Button as BaseButton } from '@base-ui/react/button';
import { cn, tv } from 'tailwind-variants';

const buttonVariants = tv({
    base: cn('cursor-pointer font-medium', 'transition-all', 'disabled:pointer-events-none disabled:opacity-50', 'hover:scale-101 active:scale-98'),
    variants: {
        variant: {
            contained: 'hover:brightness-105 active:brightness-90',
            outlined: 'bg-transparent border active:brightness-90',
            light: 'bg-transparent active:brightness-90',
            ghost: 'bg-transparent active:brightness-90',
        },
        color: {
            primary: '',
            secondary: '',
            neutral: '',
            info: '',
            warning: '',
            destructive: '',
            custom: '',
        },
        shape: {
            default: 'items-center gap-x-2',
            square: 'items-center justify-center',
        },
        display: {
            default: 'flex',
            inline: 'inline-flex',
        },
        size: {
            sm: 'text-xs [&_svg]:size-4',
            md: 'text-base [&_svg]:size-5',
        },
    },
    defaultVariants: {
        variant: 'contained',
        color: 'neutral',
        shape: 'default',
        size: 'md',
        display: 'default',
    },
    compoundVariants: [
        /**
         * VARIANT + COLOR
         */
        // CONTAINED
        {
            variant: 'contained',
            color: 'primary',
            class: cn('bg-primary', 'text-primary-foreground'),
        },
        {
            variant: 'contained',
            color: 'secondary',
            class: cn('bg-secondary', 'text-secondary-foreground'),
        },
        {
            variant: 'contained',
            color: 'neutral',
            class: cn('bg-neutral', 'text-neutral-foreground'),
        },
        {
            variant: 'contained',
            color: 'info',
            class: cn('bg-info', 'text-info-foreground'),
        },
        {
            variant: 'contained',
            color: 'warning',
            class: cn('bg-warning', 'text-warning-foreground'),
        },
        {
            variant: 'contained',
            color: 'destructive',
            class: cn('bg-destructive', 'text-destructive-foreground'),
        },
        // OUTLINED
        {
            variant: 'outlined',
            color: 'primary',
            class: cn(
                'border-primary hover:bg-primary active:bg-primary',
                'active:border-primary',
                'text-primary hover:text-primary-foreground active:text-primary-foreground',
            ),
        },
        {
            variant: 'outlined',
            color: 'secondary',
            class: cn(
                'border-secondary hover:bg-secondary active:bg-secondary',
                'active:border-secondary',
                'text-secondary hover:text-secondary-foreground active:text-secondary-foreground',
            ),
        },
        {
            variant: 'outlined',
            color: 'neutral',
            class: cn(
                'border-foreground hover:bg-neutral active:bg-neutral',
                'active:border-neutral',
                'text-foreground hover:text-neutral-foreground active:text-neutral-foreground',
            ),
        },
        {
            variant: 'outlined',
            color: 'info',
            class: cn(
                'border-info hover:bg-info active:bg-info',
                'active:border-info',
                'text-info hover:text-info-foreground active:text-info-foreground',
            ),
        },
        {
            variant: 'outlined',
            color: 'warning',
            class: cn(
                'border-warning hover:bg-warning active:bg-warning',
                'active:border-warning',
                'text-warning hover:text-warning-foreground active:text-warning-foreground',
            ),
        },
        {
            variant: 'outlined',
            color: 'destructive',
            class: cn(
                'border-destructive hover:bg-destructive active:bg-destructive',
                'active:border-destructive',
                'text-destructive hover:text-destructive-foreground active:text-destructive-foreground',
            ),
        },
        // LIGHT
        {
            variant: 'light',
            color: 'primary',
            class: cn('hover:bg-primary active:bg-primary', 'text-primary hover:text-primary-foreground active:text-primary-foreground'),
        },
        {
            variant: 'light',
            color: 'secondary',
            class: cn('hover:bg-secondary active:bg-secondary', 'text-secondary hover:text-secondary-foreground active:text-secondary-foreground'),
        },
        {
            variant: 'light',
            color: 'neutral',
            class: cn('hover:bg-neutral active:bg-neutral', 'text-foreground hover:text-neutral-foreground active:text-neutral-foreground'),
        },
        {
            variant: 'light',
            color: 'info',
            class: cn('hover:bg-info active:bg-info', 'text-info hover:text-info-foreground active:text-info-foreground'),
        },
        {
            variant: 'light',
            color: 'warning',
            class: cn('hover:bg-warning active:bg-warning', 'text-warning hover:text-warning-foreground active:text-warning-foreground'),
        },
        {
            variant: 'light',
            color: 'destructive',
            class: cn(
                'hover:bg-destructive active:bg-destructive',
                'text-destructive hover:text-destructive-foreground active:text-destructive-foreground',
            ),
        },
        // GHOST
        {
            variant: 'ghost',
            color: 'primary',
            class: cn('active:bg-primary', 'text-foreground hover:text-primary active:text-primary-foreground'),
        },
        {
            variant: 'ghost',
            color: 'secondary',
            class: cn('active:bg-secondary', 'text-foreground hover:text-secondary active:text-secondary-foreground'),
        },
        {
            variant: 'ghost',
            color: 'neutral',
            class: cn('active:bg-neutral', 'text-foreground hover:text-neutral active:text-neutral-foreground'),
        },
        {
            variant: 'ghost',
            color: 'info',
            class: cn('active:bg-info', 'text-foreground hover:text-info active:text-info-foreground'),
        },
        {
            variant: 'ghost',
            color: 'warning',
            class: cn('active:bg-warning', 'text-foreground hover:text-warning active:text-warning-foreground'),
        },
        {
            variant: 'ghost',
            color: 'destructive',
            class: cn('active:bg-destructive', 'text-foreground hover:text-destructive active:text-destructive-foreground'),
        },
        /**
         * SIZE + SHAPE
         */
        {
            size: 'sm',
            shape: 'default',
            class: 'h-6 px-1.5',
        },
        {
            size: 'sm',
            shape: 'square',
            class: 'size-6',
        },
        {
            size: 'md',
            shape: 'default',
            class: 'h-8 px-2',
        },
        {
            size: 'md',
            shape: 'square',
            class: 'size-8',
        },
    ],
});

function Button({
    className,
    variant,
    color,
    square = false,
    inline = false,
    size,
    type = 'button',
    ...props
}: BaseButton.Props & {
    variant?: 'contained' | 'outlined' | 'light' | 'ghost';
    color?: 'primary' | 'secondary' | 'neutral' | 'info' | 'warning' | 'destructive' | 'custom';
    square?: boolean;
    inline?: boolean;
    size?: 'sm' | 'md';
    type?: ComponentProps<'button'>['type'];
}) {
    return (
        <BaseButton
            render={<button type={type} />}
            {...props}
            className={cn(
                buttonVariants({
                    variant,
                    color,
                    shape: square ? 'square' : 'default',
                    display: inline ? 'inline' : 'default',
                    size,
                }),
                className,
            )}
        />
    );
}

export { Button };
