import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
                    <Card className="p-8 max-w-md w-full glass-panel neon-border text-center">
                        <h1 className="text-2xl font-bold mb-4 text-red-500">System Malfunction</h1>
                        <p className="text-zinc-400 mb-6">The dashboard encountered a critical error.</p>
                        <div className="bg-zinc-900 p-4 rounded-lg mb-6 text-left overflow-auto max-h-48 text-xs font-mono text-red-400">
                            {this.state.error?.toString()}
                        </div>
                        <Button onClick={() => window.location.reload()} className="w-full">
                            Reboot System
                        </Button>
                    </Card>
                </div>
            );
        }

        return this.props.children;
    }
}
