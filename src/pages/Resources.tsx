import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BookOpen, Video, Download, Mail, ChevronRight, BrainCircuit, Heart } from 'lucide-react';

export default function Resources() {
    const articles = [
        { title: "The Dopamine Detox Guide", category: "Guide", readTime: "5 min", icon: <BookOpen size={24} />, color: "text-primary", bg: "bg-primary/10" },
        { title: "Why You Feel Empty", category: "Neuroscience", readTime: "8 min", icon: <BrainCircuit size={24} />, color: "text-secondary", bg: "bg-secondary/10" },
        { title: "Gen Z's Secret Weapon", category: "Stories", readTime: "4 min video", icon: <Video size={24} />, color: "text-accent", bg: "bg-accent/10" },
        { title: "Self-Care vs Self-Indulgence", category: "Wellness", readTime: "6 min", icon: <Heart size={24} />, color: "text-pink-500", bg: "bg-pink-500/10" },
    ];

    return (
        <div className="min-h-screen pt-8 pb-24 px-4 md:px-6 lg:px-8 relative">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-96 bg-primary/5 rounded-full blur-[128px] pointer-events-none" />

            <div className="max-w-7xl mx-auto space-y-16 relative z-10">
                {/* Hero Resource */}
                <div className="relative rounded-[2.5rem] p-8 md:p-16 text-white text-center overflow-hidden border border-white/10 glass-panel">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 opacity-50" />

                    <div className="relative z-10">
                        <h1 className="font-display font-black text-4xl md:text-6xl mb-6 tracking-tight">Level Up Your Brain 🧠</h1>
                        <p className="text-xl text-zinc-300 max-w-2xl mx-auto mb-8 font-light">
                            Understanding how your brain works is the first step to reclaiming it. Science-backed tools for the modern age.
                        </p>
                        <Button size="lg" className="rounded-full px-8 neon-border bg-white text-zinc-950 hover:bg-zinc-200">
                            Download Starter Kit <Download size={20} className="ml-2" />
                        </Button>
                    </div>
                </div>

                {/* Articles Grid */}
                <div>
                    <h2 className="text-3xl font-display font-bold text-white mb-8">Latest Knowledge</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {articles.map((art, i) => (
                            <Card key={i} hover className="p-6 md:p-8 cursor-pointer group glass-panel border-zinc-800/50">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${art.bg} ${art.color} group-hover:scale-110 transition-transform`}>
                                    {art.icon}
                                </div>
                                <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">{art.category} • {art.readTime}</div>
                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{art.title}</h3>
                                <div className="flex items-center text-primary font-medium text-sm mt-auto opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                    Read Article <ChevronRight size={16} />
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Newsletter */}
                <div className="rounded-[2.5rem] p-8 md:p-16 text-center relative overflow-hidden glass-panel border border-zinc-800">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center mix-blend-overlay" />
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-md border border-zinc-700">
                            <Mail size={32} className="text-zinc-200" />
                        </div>
                        <h2 className="font-display font-bold text-3xl mb-4 text-white">Weekly Wisdom Drops</h2>
                        <p className="text-zinc-400 mb-8">Join 50,000+ readers getting one high-impact tip every Tuesday. No spam, only growth.</p>
                        <div className="flex flex-col sm:flex-row gap-4 p-1 bg-zinc-900/50 rounded-2xl border border-zinc-800 backdrop-blur-sm">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="flex-1 px-6 py-4 rounded-xl bg-transparent text-white placeholder-zinc-500 focus:outline-none"
                            />
                            <Button size="lg" className="rounded-xl bg-primary hover:bg-primary/90 text-zinc-950">
                                Subscribe Free
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
