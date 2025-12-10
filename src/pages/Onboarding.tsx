import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGeolocation } from '@/hooks/useGeolocation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, CloudRain, Sun, MapPin, Sparkles } from 'lucide-react';
import Confetti from 'react-confetti';
import { cn } from '@/utils/cn';
import { useWindowSize } from 'react-use';

export default function Onboarding() {
    const navigate = useNavigate();
    const { width, height } = useWindowSize();
    const [step, setStep] = useState(1);
    const { coords, error: geoError, loading: geoLoading, getPosition } = useGeolocation();
    const [showConfetti, setShowConfetti] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        mood: '', // 'lazy', 'stressed', 'chill', 'hyped', 'overwhelmed'
        weatherAllowed: false,
        goalDays: 3,
    });

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
        else handleFinish();
    };

    const handleFinish = () => {
        // Save to localStorage
        localStorage.setItem('dopa_user', JSON.stringify({
            ...formData,
            onboarded: true,
            xp: 0,
            level: 1,
            streak: 0,
            dopamineScore: 80,
            joinedAt: new Date().toISOString(),
        }));

        navigate('/dashboard');
    };

    const moods = [
        { id: 'lazy', label: 'Lazy', icon: '😴', color: 'border-blue-500/50 hover:bg-blue-500/10' },
        { id: 'stressed', label: 'Stressed', icon: '😠', color: 'border-red-500/50 hover:bg-red-500/10' },
        { id: 'chill', label: 'Chill', icon: '😊', color: 'border-emerald-500/50 hover:bg-emerald-500/10' },
        { id: 'hyped', label: 'Hyped', icon: '🎉', color: 'border-amber-500/50 hover:bg-amber-500/10' },
        { id: 'overwhelmed', label: 'Overwhelmed', icon: '🤯', color: 'border-purple-500/50 hover:bg-purple-500/10' },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

            {/* Ambient Background Glows */}
            <div className={`absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full transition-all duration-1000 ${step === 2 ? 'bg-secondary/20' : ''}`} />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full" />

            {/* Progress Dots */}
            <div className="absolute top-10 flex gap-4 z-10">
                {[1, 2, 3, 4].map((s) => (
                    <motion.div
                        key={s}
                        layout
                        className={cn(
                            "h-1 rounded-full transition-all duration-500",
                            step >= s ? "w-8 bg-primary shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "w-2 bg-zinc-800"
                        )}
                    />
                ))}
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full max-w-md space-y-12 text-center relative z-10"
                    >
                        <h1 className="text-4xl xs:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500">
                            Identify<br />Yourself.
                        </h1>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter Codex Name..."
                            className="w-full text-center text-3xl py-4 bg-transparent border-b border-zinc-700 focus:border-primary focus:outline-none transition-colors font-mono tracking-widest text-primary placeholder:text-zinc-700"
                            autoFocus
                        />
                        <Button
                            size="lg"
                            onClick={handleNext}
                            disabled={!formData.name.trim()}
                            className="w-full neon-border h-14 text-lg"
                        >
                            Initialize Sequence <ArrowRight size={20} className="ml-2" />
                        </Button>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="w-full max-w-md space-y-8 text-center relative z-10"
                    >
                        <h1 className="text-3xl font-display font-bold">Current Status: <span className="text-primary">{formData.name}</span></h1>
                        <p className="text-zinc-500">Calibrating activity suggestions based on your mental state.</p>

                        <div className="grid grid-cols-2 gap-4">
                            {moods.map((m) => (
                                <button
                                    key={m.id}
                                    onClick={() => {
                                        setFormData({ ...formData, mood: m.id });
                                        setShowConfetti(true);
                                        setTimeout(() => { setShowConfetti(false); handleNext(); }, 1500);
                                    }}
                                    className={cn(
                                        "p-6 rounded-3xl border transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-3 backdrop-blur-sm",
                                        formData.mood === m.id
                                            ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                                            : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-white hover:border-zinc-600"
                                    )}
                                >
                                    <span className="text-4xl filter drop-shadow-lg">{m.icon}</span>
                                    <span className="font-medium font-display tracking-wide">{m.label}</span>
                                </button>
                            ))}
                        </div>
                        {showConfetti && <Confetti width={width} height={height} numberOfPieces={200} recycle={false} />}
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full max-w-md space-y-12 text-center relative z-10"
                    >
                        <h1 className="text-3xl font-display font-bold">Environmental Sync</h1>
                        <p className="text-zinc-500">Allow location access to sync activities with local weather conditions.</p>

                        <div className="flex justify-center py-8">
                            <div className="relative w-40 h-40">
                                <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full animate-pulse-slow" />
                                <div className="absolute inset-0 bg-secondary/10 blur-[30px] rounded-full animate-pulse-slow delay-700" />
                                <div className="relative z-10 w-full h-full border border-white/5 rounded-full flex items-center justify-center bg-zinc-900/50 backdrop-blur-md neon-border">
                                    <Sun size={64} className="text-amber-400" />
                                </div>
                                <div className="absolute -top-4 -right-4 bg-zinc-900 p-2 rounded-full border border-zinc-800">
                                    <CloudRain size={24} className="text-sky-400" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Button
                                size="lg"
                                className="w-full h-14 neon-border"
                                onClick={() => {
                                    getPosition();
                                    setFormData({ ...formData, weatherAllowed: true });
                                    setTimeout(handleNext, 1000);
                                }}
                                disabled={geoLoading}
                            >
                                <MapPin size={20} className="mr-2" /> Allow Access
                            </Button>

                            <button
                                onClick={handleNext}
                                className="text-zinc-600 hover:text-white text-sm transition-colors"
                            >
                                Skip Synchronization
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 4 && (
                    <motion.div
                        key="step4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="w-full max-w-md space-y-12 text-center relative z-10"
                    >
                        <h1 className="text-4xl font-display font-bold">Commitment.</h1>
                        <p className="text-zinc-500">How long is your initial detox protocol?</p>

                        <div className="relative">
                            <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-primary to-emerald-900 font-display">
                                {formData.goalDays}
                            </div>
                            <div className="text-sm uppercase tracking-[0.5em] text-zinc-500 font-bold mt-2">Days</div>
                        </div>

                        <div className="space-y-2">
                            <input
                                type="range"
                                min="1"
                                max="30"
                                value={formData.goalDays}
                                onChange={(e) => setFormData({ ...formData, goalDays: parseInt(e.target.value) })}
                                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="flex justify-between text-xs text-zinc-600 font-mono">
                                <span>1 DAY</span>
                                <span>30 DAYS</span>
                            </div>
                        </div>

                        <Button
                            size="lg"
                            onClick={handleFinish}
                            className="w-full h-16 text-xl neon-border bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30"
                        >
                            <Sparkles className="mr-2 animate-pulse" /> Initiate Detox
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
