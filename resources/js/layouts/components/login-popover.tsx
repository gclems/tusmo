import { Button } from '@/components/shanty-ui/button';
import { Field } from '@/components/shanty-ui/form/field';
import { useForm } from '@inertiajs/react';
import { Popover } from '../../components/shanty-ui/popover';

function LoginPopover({ ...props }) {
    const form = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();

        form.post(`/login`, {
            preserveState: true,
            async: true,
        });
    };

    return (
        <Popover>
            <Popover.Trigger render={<Button variant="ghost" />}>Se connecter</Popover.Trigger>
            <Popover.Popup>
                <form onSubmit={handleSubmit} className="space-y-4">
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

                    <Button type="submit">Se connecter</Button>
                </form>
            </Popover.Popup>
        </Popover>
    );
}

export { LoginPopover };
