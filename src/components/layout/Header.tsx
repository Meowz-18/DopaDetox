import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Logo } from '@/components/ui/Logo';

import { useDopa } from '@/context/DopaContext';
import { supabase } from '@/lib/supabase';

export function Header() {
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { session, user } = useDopa();
    const navigate = useNavigate(); // Assume imported

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Activities', path: '/activities' },
        { name: 'Profile', path: '/profile' },
        { name: 'Resources', path: '/resources' },
    ];

    return (
        <header className="fixed top-0 w-full z-50 bg-background/10 backdrop-blur-md border-b border-white/5 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <NavLink to="/" className="group">
                    <Logo />
                </NavLink>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                cn(
                                    "font-medium transition-colors duration-200 hover:text-emerald-500 relative",
                                    isActive ? "text-primary after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary" : "text-zinc-400 hover:text-white"
                                )
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="hidden lg:flex items-center gap-4">
                    {/* User Actions */}
                    {session ? (
                        <div className="flex items-center gap-4">
                            <button onClick={handleLogout} className="text-zinc-400 hover:text-white text-sm">Logout</button>
                            <NavLink to="/profile" className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 flex items-center justify-center text-white font-bold shadow-md hover:shadow-lg transition-all transform hover:scale-105 overflow-hidden">
                                {user?.avatarUrl ? (
                                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    user?.name?.substring(0, 2).toUpperCase() || 'US'
                                )}
                            </NavLink>
                        </div>
                    ) : (
                        <NavLink to="/login" className="px-4 py-2 rounded-full border border-primary/20 text-primary hover:bg-primary/10 transition-all">
                            Login
                        </NavLink>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            {isMenuOpen && (
                <div className="lg:hidden fixed inset-x-0 top-[73px] bottom-0 bg-background/95 backdrop-blur-xl border-t border-white/5 p-6 flex flex-col gap-4 animate-in slide-in-from-top-5 z-40">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) =>
                                cn(
                                    "block px-6 py-4 rounded-2xl text-lg font-medium transition-all border border-transparent",
                                    isActive
                                        ? "bg-primary/10 text-primary border-primary/20"
                                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                )
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}

                    {/* Mobile User Profile Link */}
                    <div className="mt-auto border-t border-white/5 pt-6">
                        <NavLink
                            to="/profile"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 text-zinc-400 transition-colors"
                        >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 flex items-center justify-center text-white font-bold shadow-md overflow-hidden">
                                {user?.avatarUrl ? (
                                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    user?.name?.substring(0, 2).toUpperCase() || 'US'
                                )}
                            </div>
                            <span className="font-medium text-white">User Profile</span>
                        </NavLink>
                    </div>
                </div>
            )}
        </header>
    );
}
