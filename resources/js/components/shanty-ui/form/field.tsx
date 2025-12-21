import { ComponentProps, useId } from 'react';

import { Field as BaseField } from '@base-ui/react';
import { cn } from 'tailwind-variants';

import { Input } from './input';
import { InputDescription } from './input-description';
import { InputError } from './input-error';
import { Label } from './label';

function Field({
    rootProps,
    inputProps,
    label,
    required,
    error,
    description,
}: {
    rootProps?: BaseField.Root.Props;
    inputProps?: ComponentProps<typeof Input>;
    label?: React.ReactNode;
    required?: boolean;
    error?: React.ReactNode;
    description?: React.ReactNode;
}) {
    const inputId = useId();

    return (
        <BaseField.Root {...rootProps} className={cn('w-full space-y-1', rootProps?.className)}>
            <Label htmlFor={inputProps?.id ?? inputId} render={<BaseField.Label />} required={required}>
                {label}
            </Label>

            {!!description && <InputDescription render={<BaseField.Description />}>{description}</InputDescription>}

            <Input id={inputProps?.id ?? inputId} className={cn('block w-full', inputProps?.className)} {...inputProps} />

            {!!error && <InputError render={<BaseField.Error match />}>{error}</InputError>}
        </BaseField.Root>
    );
}

export { Field };
