import { cn } from 'tailwind-variants';

function ShantyRoot({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div {...props} className={cn(className, 'sui-root')} />;
}

export { ShantyRoot };
