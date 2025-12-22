import { Button } from '@/components/shanty-ui/button';
import { statistics } from '@/routes';
import { index } from '@/routes/game';
import { Auth } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BarChartIcon, CalendarSearchIcon, TextSearchIcon } from 'lucide-react';

export default function Welcome() {
    const user = (usePage().props.auth as Auth).user;

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-y-6">
            <Button
                variant="contained"
                render={
                    <Link
                        href={index({
                            gameMode: 'daily',
                        })}
                    />
                }
            >
                <CalendarSearchIcon />
                Mot du jour
            </Button>
            <Button
                variant="contained"
                render={
                    <Link
                        href={index({
                            gameMode: 'daily_series',
                        })}
                    />
                }
            >
                <TextSearchIcon />
                Série quotidienne
            </Button>
            {user && (
                <Button variant="ghost" render={<Link href={statistics()} />}>
                    <BarChartIcon />
                    Mes statistiques
                </Button>
            )}
        </div>
    );
}
