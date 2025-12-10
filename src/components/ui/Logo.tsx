import React from 'react';
import { cn } from '@/utils/cn';

interface LogoProps {
    className?: string;
    showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, showText = true }) => {
    return (
        <div className={cn("flex items-center gap-3 select-none", className)}>
            <div className="relative w-10 h-10 flex items-center justify-center group">
                {/* Abstract Dopamine Molecule / Zen Circle */}
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                    <defs>
                        <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#10B981" />
                            <stop offset="50%" stopColor="#3B82F6" />
                            <stop offset="100%" stopColor="#8B5CF6" />
                        </linearGradient>
                    </defs>

                    <circle cx="50" cy="50" r="45" fill="none" stroke="url(#neonGradient)" strokeWidth="8" strokeLinecap="round" className="opacity-20" />

                    {/* Dynamic spinning rings */}
                    <g className="animate-[spin_10s_linear_infinite] origin-center">
                        <path d="M50 5 A45 45 0 0 1 95 50" fill="none" stroke="url(#neonGradient)" strokeWidth="8" strokeLinecap="round" />
                    </g>

                    <g className="animate-[spin_15s_linear_infinite_reverse] origin-center opacity-80">
                        <path d="M50 25 A25 25 0 0 0 25 50" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
                    </g>

                    {/* Center Core */}
                    <circle cx="50" cy="50" r="12" fill="white" className="animate-pulse shadow-[0_0_20px_white]" />
                </svg>
            </div>

            {showText && (
                <div className="flex flex-col">
                    <span className="font-display font-bold text-xl tracking-wide leading-none bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-sky-400 to-violet-400 filter drop-shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                        DOPA
                    </span>
                    <span className="font-display font-medium text-xs tracking-[0.3em] text-zinc-400 leading-none mt-1 group-hover:text-zinc-200 transition-colors">
                        DETOX
                    </span>
                </div>
            )}
        </div>
    );
};
