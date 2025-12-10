import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Sparkles, CloudSun, Sword, ArrowRight, Play, BatteryCharging, BrainCircuit } from 'lucide-react';
import CountUp from 'react-countup';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

export default function Home() {
    const navigate = useNavigate();
    const { scrollY } = useScroll();
    const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
    const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);

    const features = [
        { icon: <BrainCircuit size={32} className="text-secondary" />, title: "Neuro-Adaptive", desc: "Activities generated based on your real-time dopamine levels." },
        { icon: <CloudSun size={32} className="text-primary" />, title: "Bio-Sync", desc: "Syncs with weather & time to suggest the perfect context-aware task." },
        { icon: <Sword size={32} className="text-accent" />, title: "RPG Progressive", desc: "Level up from 'Doom Scroller' to 'Reality Bender' with XP & loot." },
    ];

    return (
        <div className="min-h-screen text-zinc-100 overflow-x-hidden">
            {/* Hero Section */}
            <motion.section
                style={{ opacity: heroOpacity, scale: heroScale }}
                className="relative h-screen flex flex-col items-center justify-center text-center px-4 pt-16"
            >
                {/* Remove opaque background so interactive canvas shows through */}
                <div className="absolute inset-0 -z-10 bg-transparent" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse-slow pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse-slow delay-1000 pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-4xl mx-auto space-y-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 backdrop-blur-md">
                        <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-sm font-medium text-zinc-400">System Status: <span className="text-primary">Online</span></span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-display font-bold leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 pb-2">
                        Reclaim Your <br />
                        <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent text-glow">Reality</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
                        Gamify your dopamine detox. Turn focus into XP, habits into quests, and life into your favorite RPG.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                        <Button size="lg" className="rounded-full text-lg h-14 w-full sm:w-auto neon-border hover:scale-105 transition-transform" onClick={() => navigate('/onboarding')}>
                            Start Protocol <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                        <Button size="lg" variant="ghost" className="rounded-full text-lg h-14 w-full sm:w-auto hover:bg-white/5">
                            <Play className="mr-2 w-5 h-5 fill-current" /> Watch Trailer
                        </Button>
                    </div>

                    <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-80">
                        <div className="text-center">
                            <div className="text-3xl font-display font-bold text-white mb-1"><CountUp end={15000} duration={2} separator="," />+</div>
                            <div className="text-zinc-500 text-sm uppercase tracking-widest">Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-display font-bold text-white mb-1"><CountUp end={85} duration={2} suffix="%" /></div>
                            <div className="text-zinc-500 text-sm uppercase tracking-widest">Focus Boost</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-display font-bold text-white mb-1"><CountUp end={1} duration={2} suffix="M+" /></div>
                            <div className="text-zinc-500 text-sm uppercase tracking-widest">XP Earned</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-display font-bold text-white mb-1">4.9/5</div>
                            <div className="text-zinc-500 text-sm uppercase tracking-widest">Rating</div>
                        </div>
                    </div>
                </motion.div>
            </motion.section>

            {/* Features Grid */}
            <section className="py-32 px-4 relative">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                        >
                            <Card hover className="p-8 h-full bg-zinc-900/20 hover:bg-zinc-900/50 border-zinc-800/50 neon-border backdrop-blur-sm">
                                <div className="h-14 w-14 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-6 neon-border-glow">
                                    {f.icon}
                                </div>
                                <h3 className="text-2xl font-display font-bold mb-4">{f.title}</h3>
                                <p className="text-zinc-400 leading-relaxed">{f.desc}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Interactive Mockup Section */}
            <section className="py-32 relative overflow-hidden">
                {/* Removed bg-zinc-950 and used transparent/glass effect instead */}
                <div className="absolute inset-0 bg-zinc-900/10 backdrop-blur-sm" />
                <div className="absolute inset-0 bg-primary/5 skewed-bg transform -skew-y-3 scale-110 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16 relative z-10">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-5xl md:text-6xl font-display font-bold">
                            <span className="text-primary">Lock Mode</span>: <br />
                            Digital Fasting, <br />
                            Gamified.
                        </h2>
                        <p className="text-xl text-zinc-400">
                            We don't just block apps. We replace them with meaningful real-world quests. Complete the quest to unlock your phone.
                        </p>
                        <div className="flex gap-4">
                            <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex items-center gap-3 backdrop-blur-md">
                                <BatteryCharging className="text-primary" />
                                <div>
                                    <div className="text-xs text-zinc-500 uppercase">Energy Saved</div>
                                    <div className="font-mono font-bold">120 mins</div>
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex items-center gap-3 backdrop-blur-md">
                                <BrainCircuit className="text-secondary" />
                                <div>
                                    <div className="text-xs text-zinc-500 uppercase">Dopamine Baseline</div>
                                    <div className="font-mono font-bold">Stabilized</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3D Floating Cards Swiper */}
                    <div className="flex-1 w-full max-w-sm">
                        <Swiper
                            effect={'cards'}
                            grabCursor={true}
                            modules={[EffectCards, Autoplay]}
                            autoplay={{ delay: 2500, disableOnInteraction: false }}
                            className="w-full aspect-[3/4]"
                        >
                            <SwiperSlide>
                                <div className="w-full h-full bg-zinc-900 rounded-3xl border border-zinc-700 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                                    <div className="relative z-10">
                                        <Sword size={64} className="mx-auto mb-6 text-primary" />
                                        <h3 className="text-2xl font-bold mb-2">Quest In Progress</h3>
                                        <p className="text-zinc-400">"Sketch a stranger in the park"</p>
                                        <div className="mt-8 px-4 py-2 bg-black/50 rounded-full font-mono text-primary animate-pulse">LOCKED 🔒</div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="w-full h-full bg-zinc-900 rounded-3xl border border-zinc-700 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent" />
                                    <div className="relative z-10">
                                        <Sparkles size={64} className="mx-auto mb-6 text-secondary" />
                                        <h3 className="text-2xl font-bold mb-2">XP Gained!</h3>
                                        <p className="text-zinc-400">+500 Creativity</p>
                                        <div className="mt-8 px-4 py-2 bg-secondary/20 rounded-full font-mono text-secondary">Level Up! ⬆️</div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            {/* New Slide 1: Cold Plunge */}
                            <SwiperSlide>
                                <div className="w-full h-full bg-zinc-900 rounded-3xl border border-zinc-700 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent" />
                                    <div className="relative z-10">
                                        <div className="text-6xl mb-6">🧊</div>
                                        <h3 className="text-2xl font-bold mb-2">Cold Exposure</h3>
                                        <p className="text-zinc-400">"Take a 2 min cold shower"</p>
                                        <div className="mt-8 px-4 py-2 bg-cyan-900/50 rounded-full font-mono text-cyan-400">+300 Willpower</div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            {/* New Slide 2: Reading */}
                            <SwiperSlide>
                                <div className="w-full h-full bg-zinc-900 rounded-3xl border border-zinc-700 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent" />
                                    <div className="relative z-10">
                                        <div className="text-6xl mb-6">📚</div>
                                        <h3 className="text-2xl font-bold mb-2">Deep Work</h3>
                                        <p className="text-zinc-400">"Read 10 pages of non-fiction"</p>
                                        <div className="mt-8 px-4 py-2 bg-amber-900/50 rounded-full font-mono text-amber-400">+150 Wisdom</div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            {/* New Slide 3: Meditation */}
                            <SwiperSlide>
                                <div className="w-full h-full bg-zinc-900 rounded-3xl border border-zinc-700 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-transparent" />
                                    <div className="relative z-10">
                                        <div className="text-6xl mb-6">🧘</div>
                                        <h3 className="text-2xl font-bold mb-2">Mindfulness</h3>
                                        <p className="text-zinc-400">"10 mins of box breathing"</p>
                                        <div className="mt-8 px-4 py-2 bg-rose-900/50 rounded-full font-mono text-rose-400">+200 Peace</div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </section>

            {/* CTA Footer */}
            <section className="py-32 text-center relative">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
                <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">Ready to unplug?</h2>
                <Button size="lg" className="h-16 px-12 text-xl rounded-full neon-border bg-white text-zinc-950 hover:bg-zinc-200" onClick={() => navigate('/onboarding')}>
                    Begin Protocol <ArrowRight className="ml-2" />
                </Button>
            </section>
        </div>
    );
}
