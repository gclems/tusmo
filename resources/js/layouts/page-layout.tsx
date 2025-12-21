import { Link, usePage } from '@inertiajs/react';
import { HomeIcon } from 'lucide-react';

import { LoginPopover } from './components/login-popover';
import { RegisterPopover } from './components/register-popover';
import { UserPopover } from './components/user-popover';

function PageLayout({ children }: { children: React.ReactNode }) {
    const {
        props: {
            auth: { user },
        },
    } = usePage();

    console.log({ user });
    return (
        <div className="isolate">
            <div className="flex-1 overflow-auto pt-16">{children}</div>

            <div className="border-border fixed top-0 right-0 left-0 flex h-10 items-center justify-between border-b bg-background px-8">
                <div className="flex-1">
                    <Link href="/">
                        <HomeIcon />
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <h1>TUSMO</h1>
                </div>
                <div className="flex flex-1 items-center justify-end gap-x-2">
                    {!user && (
                        <>
                            <LoginPopover />
                            <div>/</div>
                            <RegisterPopover />
                        </>
                    )}
                    {user && <UserPopover />}
                </div>
            </div>
        </div>
    );
}

export { PageLayout };
