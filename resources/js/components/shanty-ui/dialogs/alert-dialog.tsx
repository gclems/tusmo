import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog';
import { cn } from 'tailwind-variants';

import { Button } from '../button';

import { Dialog, dialogBackdropClassName, dialogPopupSizeClassName } from './dialog';

function Root(props: BaseAlertDialog.Root.Props) {
    return <BaseAlertDialog.Root {...props} />;
}

function Trigger(props: BaseAlertDialog.Trigger.Props) {
    return <BaseAlertDialog.Trigger render={<Button />} {...props} />;
}

function Popup({
    size = 'md',
    children,
    ...props
}: BaseAlertDialog.Portal.Props & {
    size?: 'sm' | 'md' | 'lg' | 'xl';
}) {
    return (
        <BaseAlertDialog.Portal {...props}>
            <BaseAlertDialog.Backdrop className={dialogBackdropClassName()} />
            <BaseAlertDialog.Popup
                className={cn(
                    'fixed top-1/2 left-1/2',
                    '-mt-8 -translate-x-1/2 -translate-y-1/2',
                    'space-y-6 bg-modal py-6 text-modal-foreground',
                    'transition-all duration-150',
                    'data-ending-style:scale-90 data-ending-style:opacity-0',
                    'data-starting-style:scale-90 data-starting-style:opacity-0',
                    dialogPopupSizeClassName(size),
                )}
            >
                {children}
            </BaseAlertDialog.Popup>
        </BaseAlertDialog.Portal>
    );
}

function CloseButton(props: BaseAlertDialog.Close.Props) {
    return <BaseAlertDialog.Close render={<Button variant="light" color="neutral" />} {...props} />;
}

const AlertDialog = Object.assign(Root, {
    Trigger,
    Popup,
    Header: Dialog.Header,
    Body: Dialog.Body,
    Footer: Dialog.Footer,

    CloseButton,
    createHandle: BaseAlertDialog.createHandle,
});

export { AlertDialog };
