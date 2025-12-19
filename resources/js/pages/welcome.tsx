import { Link } from '@inertiajs/react';
import { CalendarSearchIcon, TextSearchIcon } from 'lucide-react';

export default function Welcome() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-y-6">
            <Link href="game/daily" className="flex items-center gap-x-2 border-2 px-6 py-2 hover:bg-green-50">
                <CalendarSearchIcon />
                Mot du jour
            </Link>
            <Link href="#" className="flex items-center gap-x-2 border-2 px-6 py-2 hover:bg-green-50">
                <TextSearchIcon />
                Suite du jour
                <span className="opacity-50">(coming soon)</span>
            </Link>
        </div>
    );
}
