import * as React from 'react';

import { OTPInput, OTPInputContext } from 'input-otp';
import { cn } from 'tailwind-variants';

function InputOTP({
    className,
    containerClassName,
    ...props
}: React.ComponentProps<typeof OTPInput> & {
    containerClassName?: string;
}) {
    return (
        <OTPInput
            data-slot="input-otp"
            containerClassName={cn('flex items-center gap-2 has-disabled:opacity-50', containerClassName)}
            className={cn('disabled:cursor-not-allowed', className)}
            {...props}
        />
    );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
    return <div data-slot="input-otp-group" className={cn('flex items-center', className)} {...props} />;
}

function InputOTPSlot({
    index,
    className,
    ...props
}: React.ComponentProps<'div'> & {
    index: number;
}) {
    const inputOTPContext = React.useContext(OTPInputContext);
    const { char, isActive } = inputOTPContext?.slots[index] ?? {};
    return (
        <div data-slot="input-otp-slot" data-char={char} data-active={isActive} className={cn('', className)} {...props}>
            {char}
        </div>
    );
}

export { InputOTP, InputOTPGroup, InputOTPSlot };
