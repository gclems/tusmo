import { useId } from 'react';

import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import { cn } from 'tailwind-variants';

function RadioGroup({ className, ...props }: BaseRadioGroup.Props) {
    const id = useId();

    return <BaseRadioGroup aria-labelledby={id} className={cn('flex flex-col items-start gap-1 text-current', className)} {...props} />;
}

export { RadioGroup };
