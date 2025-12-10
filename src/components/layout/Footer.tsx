import React from 'react';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
    const currentYear = new Date().getFullYear();

    const links = {
        "Product": ["Features", "Roadmap", "Manifesto", "Changelog"],
        "Resources": ["Dopamine 101", "Digital Mindfulness", "Community", "Blog"],
        "Legal": ["Privacy", "Terms", "Cookies", "Licenses"]
    };

    return (
        <footer className="border-t border-white/5 bg-background/10 backdrop-blur-md pt-16 pb-8 relative z-10 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-4">
                        <Logo />
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
                            Reclaiming human attention in the age of algorithmic addiction.
                        </p>
                    </div>

                    {/* Links */}
                    {Object.entries(links).map(([title, items]) => (
                        <div key={title}>
                            <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">{title}</h4>
                            <ul className="space-y-4">
                                {items.map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-zinc-400 hover:text-primary transition-colors text-sm hover:translate-x-1 inline-block duration-200">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
                    <p>&copy; {currentYear} DopaDetox Protocol. All systems nominal.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-zinc-400 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
