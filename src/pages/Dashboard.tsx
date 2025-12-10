import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CloudSun, ArrowRight, Trophy, Zap, Droplets, Flame, CheckCircle2, Lock, Sword } from 'lucide-react';
import CountUp from 'react-countup';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { useDopa } from '@/context/DopaContext';

export default function Dashboard() {
    const navigate = useNavigate();
    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState(false);
    const { user, activities, completeActivity, loading } = useDopa();

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-emerald-500 gap-4">
                <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                <p className="font-mono text-sm animate-pulse">Initializing Protocol...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-red-500">
                <div className="text-center">
                    <h2 className="text-xl font-bold mb-2">System Failure</h2>
                    <p className="text-zinc-500 mb-4">Could not load user profile.</p>
                    <button onClick={() => window.location.reload()} className="px-4 py-2 bg-zinc-800 rounded text-white hover:bg-zinc-700">Retry Connection</button>
                </div>
            </div>
        );
    }

    // Filter for "Daily" tasks - just grabbing the first 3 for demo
    const dailyTasks = activities.slice(0, 3).map(a => ({
        ...a,
        icon: a.type === 'Creative' ? <Flame className="text-amber-400" /> : a.type === 'Active' ? <Droplets className="text-sky-400" /> : <Zap className="text-primary" />, // Simple icon mapping
        completed: false // in a real app, check if completed today
    }));

    const [tasks, setTasks] = useState(dailyTasks);

    const handleComplete = (id: string) => {
        const task = tasks.find(t => t.id === id);
        if (task && !task.completed) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);

            const newTasks = tasks.map(t => t.id === id ? { ...t, completed: true } : t);
            setTasks(newTasks);

            completeActivity(id);
        }
    };

    return (
        <div className="min-h-screen text-zinc-100 px-4 md:px-6 lg:px-8 pt-8 pb-24">
            {showConfetti && <Confetti width={width} height={height} numberOfPieces={200} recycle={false} />}

            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative rounded-[2.5rem] overflow-hidden p-8 md:p-12 glass-panel neon-border"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
                                Level {user.level} <span className="text-primary text-glow">Architect</span>
                            </h1>
                            <p className="text-zinc-400 text-lg">Day {user.streak} Streak 🔥 • Keep the momentum.</p>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 md:w-32 md:h-32">
                                <CircularProgressbar
                                    value={user.dopamineScore}
                                    text={`${user.dopamineScore}%`}
                                    styles={buildStyles({
                                        pathColor: '#10B981',
                                        textColor: '#fff',
                                        trailColor: 'rgba(255,255,255,0.1)',
                                        textSize: '24px',
                                        pathTransitionDuration: 0.5,
                                    })}
                                />
                            </div>
                            <div>
                                <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Dopaminergic<br />Reserve</div>
                                <div className="text-emerald-400 text-sm mt-1 flex items-center gap-1"><Zap size={14} /> Optimal</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Widgets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Weather Widget (Span 4) */}
                    <Card className="md:col-span-4 p-6 glass-panel neon-border flex flex-col justify-between h-48 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-4xl font-display font-bold">64°</div>
                                    <div className="text-zinc-400">San Francisco</div>
                                </div>
                                <CloudSun className="text-sky-400 w-10 h-10" />
                            </div>
                            <div className="mt-4 p-3 bg-white/5 rounded-xl text-sm border border-white/5">
                                "Perfect temperature for an outdoor sketch session."
                            </div>
                        </div>
                    </Card>

                    {/* XP Progress (Span 8) */}
                    <Card className="md:col-span-8 p-6 glass-panel neon-border flex flex-col justify-center h-48 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10 w-full">
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <div className="text-zinc-400 uppercase text-xs tracking-widest font-bold">XP Progress</div>
                                    <div className="text-3xl font-display font-bold"><CountUp end={user.xp} duration={2} separator="," /> <span className="text-base text-zinc-500 font-normal">/ 2500 XP</span></div>
                                </div>
                                <Trophy className="text-amber-400 w-8 h-8" />
                            </div>
                            <div className="h-4 bg-zinc-800 rounded-full overflow-hidden border border-white/5">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(user.xp / 2500) * 100}%` }}
                                    className="h-full bg-gradient-to-r from-emerald-500 to-sky-500 relative"
                                >
                                    <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
                                </motion.div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Quest Log */}
                <div>
                    <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
                        <Sword className="text-accent" /> Active Protocols
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tasks.map((task) => (
                            <motion.div key={task.id} layout>
                                <Card className={`p-0 overflow-hidden neon-border h-full flex flex-col ${task.completed ? 'opacity-50 grayscale' : 'hover:scale-[1.02]'}`}>
                                    <div className="p-6 flex-1">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-3 bg-zinc-800/50 rounded-xl border border-white/5">{task.icon}</div>
                                            <div className="bg-zinc-900 rounded-full px-3 py-1 text-xs font-mono border border-zinc-800">{task.time}</div>
                                        </div>
                                        <h3 className="text-xl font-bold mb-1">{task.title}</h3>
                                        <p className="text-zinc-400 text-sm">{task.description}</p>
                                    </div>
                                    <div className="p-4 bg-black/20 border-t border-white/5 flex gap-2">
                                        {task.completed ? (
                                            <Button disabled className="w-full bg-zinc-800 text-zinc-500 border-none"><CheckCircle2 className="mr-2 h-4 w-4" /> Completed</Button>
                                        ) : (
                                            <Button onClick={() => handleComplete(task.id)} className="w-full neon-border bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-zinc-950">
                                                Start Protocol <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </Card>
                            </motion.div>
                        ))}

                        {/* Generate More Card */}
                        <Card className="p-6 border-dashed border-2 border-zinc-800 bg-transparent hover:border-zinc-600 hover:bg-zinc-900/30 flex flex-col items-center justify-center text-center cursor-pointer min-h-[250px] group" onClick={() => navigate('/activities')}>
                            <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-zinc-700">
                                <Lock className="text-zinc-500" />
                            </div>
                            <h3 className="font-bold mb-2">Generate New Quest</h3>
                            <p className="text-zinc-500 text-sm max-w-[200px]">Unlock more dopamine by completing real-world tasks.</p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
