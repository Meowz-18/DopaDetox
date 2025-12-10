import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Sparkles, Plus, AlertCircle, Check } from 'lucide-react';
import { GeminiService } from '@/services/geminiService';
import { useDopa } from '@/context/DopaContext';

export function TaskCreator() {
    const { addTask } = useDopa();
    const [title, setTitle] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [showKeyInput, setShowKeyInput] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState<{ dopamine_level: 'Low' | 'Medium' | 'High'; xp_reward: number; reason?: string } | null>(null);

    const handleAnalyze = async () => {
        if (!title) return alert("Enter a task first.");

        // Check for key in local storage if not in state
        const savedKey = localStorage.getItem('gemini_key');
        const keyToUse = apiKey || savedKey;

        if (!keyToUse) {
            setShowKeyInput(true);
            return;
        }

        // Save key if provided
        if (apiKey) localStorage.setItem('gemini_key', apiKey);

        try {
            setAnalyzing(true);
            const result = await GeminiService.analyzeTask(title, keyToUse);
            setAnalysis(result);
        } catch (error: any) {
            alert("AI Analysis Failed: " + error.message);
        } finally {
            setAnalyzing(false);
        }
    };

    const handleCreate = async () => {
        if (!title) return;

        await addTask({
            title,
            description: analysis?.reason || 'Custom User Protocol',
            xp_reward: analysis?.xp_reward || 50,
            dopamine_level: analysis?.dopamine_level || 'Medium'
        });

        setTitle('');
        setAnalysis(null);
        alert("Protocol Initiliazed!");
    };

    return (
        <Card className="p-6 neon-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 blur-[50px] rounded-full pointer-events-none" />

            <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
                <Plus className="text-primary" /> Create Custom Protocol
            </h3>

            <div className="space-y-4">
                <div>
                    <input
                        type="text"
                        placeholder="e.g., Read technical documentation for 1 hour"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-zinc-900/50 border border-zinc-700 rounded-xl p-4 text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none transition-colors"
                    />
                </div>

                {showKeyInput && (
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl space-y-2 animate-in fade-in slide-in-from-top-2">
                        <div className="flex items-center gap-2 text-yellow-500 text-sm font-bold">
                            <AlertCircle size={16} /> Google Gemini API Key Required
                        </div>
                        <input
                            type="password"
                            placeholder="Paste API Key here"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="w-full bg-black/40 border border-yellow-500/30 rounded p-2 text-sm text-white"
                        />
                        <p className="text-xs text-zinc-500">Key is stored locally in your browser.</p>
                    </div>
                )}

                {analysis && (
                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl space-y-2 animate-in fade-in">
                        <div className="flex items-center gap-2 text-primary font-bold">
                            <Sparkles size={16} /> AI Analysis Complete
                        </div>
                        <div className="flex gap-4 text-sm">
                            <span className="text-zinc-300">Reward: <span className="text-white font-bold">{analysis.xp_reward} XP</span></span>
                            <span className="text-zinc-300">Impact: <span className="text-white font-bold">{analysis.dopamine_level}</span></span>
                        </div>
                        {analysis.reason && <p className="text-xs text-zinc-500 italic">"{analysis.reason}"</p>}
                    </div>
                )}

                <div className="flex gap-3">
                    <Button onClick={handleAnalyze} variant="outline" className="flex-1 bg-transparent border-zinc-700 hover:bg-zinc-800" disabled={analyzing}>
                        {analyzing ? <Loader2 className="animate-spin" /> : <><Sparkles size={16} className="mr-2 text-purple-400" /> Analyze Reward</>}
                    </Button>
                    <Button onClick={handleCreate} className="flex-1 bg-primary text-zinc-950 hover:bg-emerald-400 font-bold">
                        Initialize
                    </Button>
                </div>
            </div>
        </Card>
    );
}

function Loader2({ className }: { className?: string }) {
    return <svg className={`${className} h-4 w-4`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>;
}
