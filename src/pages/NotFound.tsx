import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="bg-surface tech-border tech-shadow p-12 max-w-md w-full">
                <AlertTriangle className="w-16 h-16 text-[#FF4400] mx-auto mb-6" strokeWidth={1.5} />
                <h1 className="text-6xl font-mono font-bold text-ink mb-4">404</h1>
                <p className="text-sm font-mono text-muted uppercase tracking-widest mb-8">
                    Page Not Found
                </p>
                <p className="text-sm text-ink mb-8 leading-relaxed">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-surface text-xs font-mono font-bold uppercase tracking-widest tech-border tech-shadow hover:bg-accent hover:border-accent transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
}
