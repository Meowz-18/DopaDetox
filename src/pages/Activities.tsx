import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Navigation } from 'swiper/modules';
import { BrainCircuit, Wind, Zap, Lock, Unlock, ArrowRight, XCircle } from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

import { useDopa } from '@/context/DopaContext';
import { Activity } from '@/types';
import 'swiper/css';
import 'swiper/css/effect-cards';

import { TaskCreator } from '@/components/TaskCreator';

export default function Activities() {
    const { width, height } = useWindowSize();
    const [isLocked, setIsLocked] = useState(false);
    const [activeActivity, setActiveActivity] = useState<Activity | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const { activities, unlockActivity } = useDopa();

    const handleLock = (activity: Activity) => {
        setActiveActivity(activity);
        setIsLocked(true);
    };

    const handleUnlock = () => {
        setIsLocked(false);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
        if (activeActivity) {
            unlockActivity(activeActivity.id);
            setActiveActivity(null);
        }
    };

    return (
        <div className="min-h-screen text-zinc-100 pt-8 pb-24 relative overflow-hidden">
            {showConfetti && <Confetti width={width} height={height} numberOfPieces={200} recycle={false} />}

            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 flex flex-col h-full space-y-12">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Suffer</span>
                    </h1>
                    <p className="text-zinc-400 text-lg">Select a protocol to stabilize your dopamine baseline.</p>
                </div>

                <div className="max-w-xl mx-auto w-full">
                    <TaskCreator />
                </div>

                {/* 3D Swiper */}
                <div className="flex-1 flex items-center justify-center min-h-[400px]">
                    <Swiper
                        effect={'cards'}
                        grabCursor={true}
                        modules={[EffectCards, Navigation]}
                        className="w-[320px] md:w-[400px] aspect-[3/4]"
                    >
                        {activities.map((act, i) => (
                            <SwiperSlide key={i} className="rounded-3xl">
                                <div className="w-full h-full bg-zinc-900 border border-zinc-700/50 rounded-3xl p-8 flex flex-col relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                                    {/* Card Content */}
                                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                                        <div className="w-24 h-24 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 neon-border-glow">
                                            {act.type === 'Creative' && <BrainCircuit size={48} className="text-secondary" />}
                                            {act.type === 'Active' && <Wind size={48} className="text-primary" />}
                                            {act.type === 'Social' && <Zap size={48} className="text-accent" />}
                                            {act.type === 'Focus' && <BrainCircuit size={48} className="text-sky-400" />}
                                            {/* Fallback for others */}
                                            {['Rest', 'Mindfulness', 'Health'].includes(act.type) && <Zap size={48} className="text-zinc-500" />}
                                        </div>
                                        <div>
                                            <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">{act.type} Protocol</div>
                                            <h2 className="text-3xl font-bold font-display">{act.title}</h2>
                                        </div>
                                        <div className="flex gap-4 text-sm text-zinc-400">
                                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5">{act.time}</span>
                                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5">{act.xp} XP</span>
                                        </div>
                                    </div>

                                    <Button onClick={() => handleLock(act)} className="w-full mt-8 neon-border bg-primary/10 text-primary hover:bg-primary hover:text-zinc-950 h-14 text-lg">
                                        Initialize Protocol <Lock size={18} className="ml-2" />
                                    </Button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* Lock Mode Window */}
            <AnimatePresence>
                {isLocked && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-8"
                    >
                        <div className="max-w-md w-full text-center space-y-12">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="w-48 h-48 mx-auto rounded-full border-4 border-dashed border-zinc-800 flex items-center justify-center relative"
                            >
                                <div className="absolute inset-0 rounded-full border-t-4 border-primary animate-spin" />
                                <Lock size={64} className="text-zinc-500" />
                            </motion.div>

                            <div>
                                <h2 className="text-5xl font-display font-bold text-white mb-4">PROTOCOL ACTIVE</h2>
                                <p className="text-xl text-zinc-500">Do not engage with digital distractions.</p>
                            </div>

                            <div className="space-y-4">
                                <Button size="lg" onClick={handleUnlock} className="w-full h-16 text-xl bg-primary text-zinc-950 hover:bg-emerald-400 hover:scale-105 transition-all shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                                    I Completed It <Unlock className="ml-2" />
                                </Button>
                                <button onClick={() => setIsLocked(false)} className="text-zinc-600 hover:text-red-500 text-sm transition-colors flex items-center justify-center w-full gap-2">
                                    <XCircle size={14} /> Emergency Abort
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
