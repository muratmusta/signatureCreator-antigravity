'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { User, AuthChangeEvent, Session } from '@supabase/supabase-js';

export const Header = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user || null);
            setLoading(false);
        };
        checkUser();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
            setUser(session?.user || null);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <header className="px-8 h-24 flex items-center justify-between border-b border-border/50 fixed w-full bg-[#F2F5F7]/80 backdrop-blur-xl z-50 top-0 transition-all duration-300">
            <div className="flex items-center gap-2">
                <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
                    <div className="w-10 h-10 bg-[#163300] rounded-xl flex items-center justify-center text-[#9FE870] font-black text-xl shadow-lg transition-transform group-hover:scale-110">S</div>
                    <span className="font-extrabold text-2xl tracking-tighter text-[#163300] uppercase">Signature<span className="text-[#163300]/50">OS</span></span>
                </Link>
            </div>

            <nav className="hidden md:flex gap-10 text-[11px] font-black text-[#64748b] uppercase tracking-[0.2em]">
                <a href="/#features" className="hover:text-[#163300] transition-colors">Özellikler</a>
                <a href="/#pricing" className="hover:text-[#163300] transition-colors">Fiyatlandırma</a>
                <a href="/#templates" className="hover:text-[#163300] transition-colors">Şablonlar</a>
            </nav>

            <div className="flex gap-6 items-center">
                {loading ? (
                    <div className="h-12 w-32 bg-white/50 rounded-full animate-pulse"></div>
                ) : user ? (
                    <Link href="/dashboard">
                        <Button className="bg-[#163300] hover:bg-[#163300]/90 text-[#9FE870] font-black text-[11px] uppercase tracking-widest px-8 h-12 rounded-full shadow-lg gap-2">
                            <LayoutDashboard className="w-4 h-4" /> DASHBOARD
                        </Button>
                    </Link>
                ) : (
                    <>
                        <Link href="/login">
                            <Button variant="ghost" className="text-[#163300] font-black text-[11px] uppercase tracking-widest hover:bg-white/50 rounded-full px-6">Giriş Yap</Button>
                        </Link>
                        <Link href="/editor/new">
                            <Button className="bg-[#9FE870] text-[#163300] hover:bg-[#163300] hover:text-[#9FE870] font-black text-[11px] uppercase tracking-widest px-8 h-12 rounded-full shadow-neon transition-all border-none">
                                Ücretsiz Başla
                            </Button>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};
