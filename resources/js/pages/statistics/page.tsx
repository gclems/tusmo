import { Auth } from '@/types';
import { usePage } from '@inertiajs/react';
import { TriangleAlertIcon } from 'lucide-react';

export default function Page() {
    const user = (usePage().props.auth as Auth).user;

    return (
        <>
            <h2 className="item-center flex">
                <TriangleAlertIcon /> A venir
            </h2>
            <ul>
                <li>Nombre de parties: {user.games_count}</li>
                <li>
                    Victoires: {user.wins_count} ({(user.wins_count / (user.games_count || 1)) * 100}%)
                </li>
                <li>Série: {user.current_count}</li>
                <li>Série la plus longue: {user.max_streak}</li>
            </ul>
        </>
    );
}
