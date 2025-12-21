import { Separator } from '@base-ui/react';
import { Link, router, usePage } from '@inertiajs/react';
import { LogOutIcon } from 'lucide-react';

import { Button } from '@/components/shanty-ui/button';
import { Popover } from '@/components/shanty-ui/popover';

import { statistics } from '@/routes';

function UserPopover() {
    const {
        props: {
            auth: { user },
        },
    } = usePage();

    const handleLogoutClick = (e: React.MouseEvent) => {
        e.preventDefault();
        router.visit('/logout', { method: 'post', preserveState: true });
    };

    return (
        <Popover>
            <Popover.Trigger render={<div className="cursor-pointer" />}>
                <div className="flex size-8 items-center justify-center rounded-full bg-cyan-800 uppercase">{user.username.charAt(0)}</div>
            </Popover.Trigger>
            <Popover.Popup>
                <div className="space-y-4">
                    <div>
                        <Link href={statistics()}>Mes statistiques</Link>
                    </div>
                    <div>
                        <a href="#">Historique des parties (à venir)</a>
                    </div>
                    <Separator orientation="horizontal" className="h-px w-full bg-accent-background" />
                    <Button variant="light" color="destructive" onClick={handleLogoutClick}>
                        <LogOutIcon /> Se déconnecter
                    </Button>
                </div>
            </Popover.Popup>
        </Popover>
    );
}

export { UserPopover };
