import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                setShowSuccess(true);
                // Hide after 5 seconds or let user close it
                setTimeout(() => setShowSuccess(false), 5000);
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                navigate('/dashboard');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative">

            {/* Custom Neon Popup / Toast */}
            {showSuccess && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm animate-in fade-in slide-in-from-top-4">
                    <div className="glass-panel border-primary/50 p-6 rounded-xl shadow-[0_0_50px_rgba(16,185,129,0.3)] text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary/10 animate-pulse-slow"></div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                                📩
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 font-display">Protocol Initiated</h3>
                            <p className="text-zinc-300 text-sm">Transfer link sent to <span className="text-primary">{email}</span>. Verify to access the terminal.</p>
                            <button
                                onClick={() => setShowSuccess(false)}
                                className="mt-4 text-xs text-zinc-500 hover:text-white uppercase tracking-widest"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Card className="w-full max-w-md p-8 glass-panel neon-border relative z-10">
                <h2 className="text-3xl font-display font-bold mb-6 text-center">
                    {isSignUp ? 'Join Protocol' : 'Access Terminal'}
                </h2>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleAuth} className="space-y-4">
                    <div>
                        <label className="block text-sm text-zinc-400 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-zinc-900 border border-zinc-700 rounded p-3 text-white focus:border-primary focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-zinc-400 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            minLength={6}
                            className="w-full bg-zinc-900 border border-zinc-700 rounded p-3 text-white focus:border-primary focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button type="submit" className="w-full bg-primary text-zinc-950 font-bold hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all" disabled={loading}>
                        {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Login')}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        type="button"
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                    </button>
                </div>
            </Card>
        </div>
    );
}
