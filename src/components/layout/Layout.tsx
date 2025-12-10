import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { InteractiveBackground } from '@/components/ui/InteractiveBackground';
import { useMedia } from 'react-use'; // To disable cursor on mobile

export function Layout() {
    // Only show custom cursor on non-touch devices if possible, or just desktop
    // simpler check:
    const isDesktop = useMedia('(min-width: 1024px)', true);

    return (
        <div className="flex flex-col min-h-screen relative overflow-x-hidden selection:bg-primary/30 selection:text-white">
            {/* Background Layers */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <InteractiveBackground />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay z-10" />
            </div>

            {/* Custom Cursor */}
            {isDesktop && <CustomCursor />}

            {/* Main Content */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow pt-16">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}
