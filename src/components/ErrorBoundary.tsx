import { Component, type ReactNode, type ErrorInfo } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false, error: null };

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('[ErrorBoundary]', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex flex-col items-center justify-center min-h-[40vh] text-center p-8">
                    <div className="bg-surface tech-border tech-shadow p-10 max-w-md w-full">
                        <AlertTriangle className="w-12 h-12 text-[#FF4400] mx-auto mb-4" strokeWidth={1.5} />
                        <h2 className="text-lg font-bold text-ink uppercase tracking-wider mb-3">
                            Something went wrong
                        </h2>
                        <p className="text-sm font-mono text-muted mb-6 break-all">
                            {this.state.error?.message || 'An unexpected error occurred.'}
                        </p>
                        <button
                            onClick={() => this.setState({ hasError: false, error: null })}
                            className="px-6 py-2 bg-ink text-surface text-xs font-mono font-bold uppercase tracking-widest tech-border tech-shadow hover:bg-accent hover:border-accent transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
