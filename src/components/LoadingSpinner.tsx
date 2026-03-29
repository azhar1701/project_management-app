import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    label?: string;
    className?: string;
}

export function LoadingSpinner({ size = 'md', label = 'Loading...', className }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-8 h-8 border-2',
        lg: 'w-12 h-12 border-3',
    };

    return (
        <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
            <div
                className={cn(
                    'border-ink/20 border-t-accent rounded-full animate-spin',
                    sizeClasses[size]
                )}
                role="status"
                aria-label={label}
            />
            {label && (
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted">
                    {label}
                </span>
            )}
        </div>
    );
}
