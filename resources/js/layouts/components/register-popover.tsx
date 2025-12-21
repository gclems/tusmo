import { useForm } from '@inertiajs/react';

import { Button } from '@/components/shanty-ui/button';
import { Field } from '@/components/shanty-ui/form/field';

import { Popover } from '../../components/shanty-ui/popover';

function RegisterPopover() {
    const form = useForm({
        email: '',
        username: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();

        form.post(`/register`, {
            preserveState: true,
            async: true,
        });
    };

    return (
        <Popover>
            <Popover.Trigger render={<Button variant="ghost" />}>Créer un compte</Popover.Trigger>
            <Popover.Popup size="sm">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Field
                        inputProps={{
                            name: 'username',
                            type: 'text',
                            placeholder: 'Pseudonyme',
                            value: form.data.username,
                            onChange: (e) => form.setData('username', e.target.value),
                        }}
                        label="Pseudonyme"
                        required
                    />

                    <Field
                        inputProps={{
                            name: 'email',
                            type: 'email',
                            placeholder: 'Adresse email',
                            value: form.data.email,
                            onChange: (e) => form.setData('email', e.target.value),
                        }}
                        label="Adresse email"
                        required
                    />

                    <Field
                        inputProps={{
                            name: 'password',
                            type: 'password',
                            placeholder: 'Mot de passe',
                            value: form.data.password,
                            onChange: (e) => form.setData('password', e.target.value),
                        }}
                        label="Mot de passe"
                        required
                    />

                    <Field
                        inputProps={{
                            name: 'password_confirmation',
                            type: 'password',
                            placeholder: 'Confirmer le mot de passe',
                            value: form.data.password_confirmation,
                            onChange: (e) => form.setData('password_confirmation', e.target.value),
                        }}
                        label="Confirmer le mot de passe"
                        required
                    />

                    <Button type="submit">Créer un compte</Button>
                </form>
            </Popover.Popup>
        </Popover>
    );
}

export { RegisterPopover };
