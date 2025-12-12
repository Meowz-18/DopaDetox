import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Share2, Download, Trophy, Lock, Upload, Loader2, Camera, X, Check } from 'lucide-react';
import { useDopa } from '@/context/DopaContext';
import { supabase } from '@/lib/supabase';
import { UserService } from '@/services/userService';
import { User } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

const PRESET_AVATARS = [
    '/avatars/cyber-samurai.png',
    '/avatars/zen-android.png',
    '/avatars/neon-ninja.png',
    '/avatars/digital-monk.png'
];

export default function Profile() {
    const { user, refreshUser } = useDopa();
    const [uploading, setUploading] = useState(false);
    const [showAvatarSelection, setShowAvatarSelection] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fallback data if user not loaded yet
    const displayUser: User = user || {
        name: "Guest",
        level: 1,
        xp: 0,
        streak: 0,
        dopamineScore: 50,
        badges: [],
        nextLevelXp: 5000
    };

    const nextLevelXp = 5000; // Constant for now

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            if (!event.target.files || event.target.files.length === 0) {
                return;
            }
            if (!user) {
                alert("Please login to upload a photo.");
                return;
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${user.name}-${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
            await updateUserAvatar(data.publicUrl);

        } catch (error: any) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };

    const updateUserAvatar = async (url: string) => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            await UserService.saveUser(session.user.id, { avatarUrl: url });
            await refreshUser();
            setShowAvatarSelection(false);
        }
    };

    const handleShare = async () => {
        const shareData = {
            title: 'DopaDetox Profile',
            text: `I'm a Level ${displayUser.level} Reality Bender on DopaDetox! Check out my progress.`,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(`DopaDetox: Level ${displayUser.level} ${displayUser.name}`);
                alert("Profile stats copied to clipboard!");
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };

    const handleExport = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(displayUser, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "dopadetox_profile.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <div className="min-h-screen pt-8 pb-24 px-4 md:px-6 lg:px-8 relative">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Col: Avatar & Identity */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="p-6 text-center glass-panel neon-border relative z-10">
                        <div className="relative w-48 h-48 mx-auto mb-6 group">
                            <div className="w-full h-full rounded-full p-1 border-2 border-primary/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                                <img
                                    src={displayUser.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${displayUser.name}&backgroundColor=transparent`}
                                    className="w-full h-full rounded-full bg-zinc-800 object-cover"
                                    alt="Avatar"
                                />
                            </div>

                            {/* Avatar Edit Trigger */}
                            <button
                                onClick={() => setShowAvatarSelection(!showAvatarSelection)}
                                className="absolute bottom-2 right-2 p-3 bg-zinc-900 border border-zinc-700 text-white rounded-full hover:scale-110 transition-transform hover:border-primary flex items-center justify-center shadow-lg"
                            >
                                {uploading ? <Loader2 size={16} className="animate-spin" /> : <Camera size={18} />}
                            </button>

                            {/* Avatar Selection Popover */}
                            <AnimatePresence>
                                {showAvatarSelection && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 bg-zinc-900/95 backdrop-blur-xl border border-zinc-700 p-4 rounded-2xl shadow-xl z-50"
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-sm font-bold text-zinc-300">Select Avatar</span>
                                            <button onClick={() => setShowAvatarSelection(false)}><X size={16} className="text-zinc-500 hover:text-white" /></button>
                                        </div>

                                        <div className="grid grid-cols-4 gap-2 mb-4">
                                            {PRESET_AVATARS.map((avatar, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => updateUserAvatar(avatar)}
                                                    className="aspect-square rounded-full overflow-hidden border border-transparent hover:border-primary transition-all relative"
                                                >
                                                    <img src={avatar} className="w-full h-full object-cover" alt="Preset" />
                                                    {displayUser.avatarUrl === avatar && (
                                                        <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
                                                            <Check size={12} className="text-white font-bold" />
                                                        </div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="relative">
                                            <input
                                                type="file"
                                                id="avatar-upload-popover"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleUpload}
                                                disabled={uploading}
                                            />
                                            <label
                                                htmlFor="avatar-upload-popover"
                                                className="block w-full text-center py-2 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 rounded-lg cursor-pointer transition-colors text-zinc-300 border border-zinc-700"
                                            >
                                                Upload Custom
                                            </label>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <h2 className="text-3xl font-display font-bold text-white mb-1">{displayUser.name}</h2>
                        <p className="text-primary font-mono text-sm mb-6">Level {displayUser.level} Reality Bender</p>

                        <div className="w-full bg-zinc-800 rounded-full h-3 mb-2 overflow-hidden border border-zinc-700">
                            <div className="bg-gradient-to-r from-primary to-secondary h-full relative" style={{ width: `${(displayUser.xp / nextLevelXp) * 100}%` }}>
                                <div className="absolute inset-0 bg-white/20 animate-pulse-slow"></div>
                            </div>
                        </div>
                        <p className="text-xs text-zinc-500 font-mono">{displayUser.xp} / {nextLevelXp} XP to Level {displayUser.level + 1}</p>

                        <div className="flex justify-center gap-4 mt-8">
                            <Button size="sm" variant="outline" className="text-xs" onClick={handleShare}>
                                <Share2 size={14} className="mr-2" /> Share
                            </Button>
                            <Button size="sm" variant="ghost" className="text-xs" onClick={handleExport}>
                                <Download size={14} className="mr-2" /> Export
                            </Button>
                        </div>
                    </Card>

                    <Card className="p-6 glass-panel border-zinc-800/50">
                        <h3 className="font-bold text-lg mb-4 text-white flex items-center gap-2 font-display"><Trophy className="text-yellow-500" size={20} /> Badges</h3>
                        <div className="grid grid-cols-4 gap-4">
                            {(displayUser.badges || []).map((badge: string, i: number) => (
                                <div key={i} className="aspect-square bg-zinc-900/50 border border-zinc-800 rounded-xl flex items-center justify-center text-3xl hover:scale-110 transition-transform cursor-help hover:border-yellow-500/50" title="Unlocked!">
                                    {badge}
                                </div>
                            ))}
                            {[...Array(4)].map((_, i) => (
                                <div key={`lock-${i}`} className="aspect-square bg-zinc-900/30 border border-zinc-800/50 border-dashed rounded-xl flex items-center justify-center text-zinc-700">
                                    <Lock size={16} />
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Right Col: Stats & Roadmap */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-6 flex flex-col justify-between glass-panel neon-border relative overflow-hidden group">
                            <div className="absolute right-0 top-0 p-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
                            <h3 className="text-zinc-500 font-bold text-xs uppercase tracking-widest mb-4 z-10">Detox Score</h3>
                            <div className="text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow mb-2 z-10">92<span className="text-2xl text-zinc-600">%</span></div>
                            <p className="text-zinc-400 text-sm z-10">Top 5% of users this week! You're crushing the doom scroll.</p>
                        </Card>

                        <Card className="p-6 glass-panel border-zinc-800 relative overflow-hidden">
                            <div className="absolute right-0 bottom-0 p-24 bg-secondary/5 rounded-full blur-3xl"></div>
                            <h3 className="text-zinc-500 font-bold text-xs uppercase tracking-widest mb-4">Focus Distribution</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-white">Creative</span>
                                        <span className="text-secondary">45%</span>
                                    </div>
                                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-secondary w-[45%]"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-white">Active</span>
                                        <span className="text-primary">30%</span>
                                    </div>
                                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[30%]"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-white">Mindful</span>
                                        <span className="text-accent">25%</span>
                                    </div>
                                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-accent w-[25%]"></div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Roadmap */}
                    <Card className="p-8 glass-panel border-zinc-800">
                        <h3 className="font-display font-bold text-xl mb-8 text-white">Your Journey</h3>
                        <div className="relative border-l-2 border-zinc-800 ml-3 space-y-12">
                            <div className="relative pl-8">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-zinc-900 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                <h4 className="font-bold text-lg text-primary">The Awakening (Level 1-5)</h4>
                                <p className="text-zinc-500 text-sm mt-1">You started looking up. The fog is clearing.</p>
                            </div>

                            <div className="relative pl-8 opacity-40 grayscale group hover:grayscale-0 transition-all">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-zinc-700 ring-4 ring-zinc-900" />
                                <h4 className="font-bold text-lg text-white">The Creator (Level 5-10)</h4>
                                <p className="text-zinc-500 text-sm mt-1">Replacing consumption with creation. Unlocks: Custom Avatar items.</p>
                            </div>

                            <div className="relative pl-8 opacity-40 grayscale">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-zinc-700 ring-4 ring-zinc-900" />
                                <h4 className="font-bold text-lg text-white">Digital Monk (Level 20+)</h4>
                                <p className="text-zinc-500 text-sm mt-1">Master of your own attention. Unlocks: Mentor Mode.</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
