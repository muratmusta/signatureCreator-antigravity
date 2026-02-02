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
        <header className="px-6 h-20 flex items-center justify-between border-b border-gray-100 fixed w-full bg-white/80 backdrop-blur-md z-50 top-0 transition-all duration-300">
            <div className="flex items-center gap-2">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 bg-forest rounded-lg flex items-center justify-center text-white font-bold shadow-sm">S</div>
                    <span className="font-bold text-xl tracking-tight text-gray-900">SignatureOS</span>
                </Link>
            </div>

            <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
                <a href="/#features" className="hover:text-forest transition-colors">Özellikler</a>
                <a href="/#pricing" className="hover:text-forest transition-colors">Fiyatlandırma</a>
                <a href="/#templates" className="hover:text-forest transition-colors">Şablonlar</a>
            </nav>

            <div className="flex gap-4 items-center">
                {loading ? (
                    // Loading skeleton
                    <div className="h-9 w-24 bg-gray-100 rounded-md animate-pulse"></div>
                ) : user ? (
                    <Link href="/dashboard">
                        <Button className="bg-forest hover:bg-forest/90 text-white font-semibold shadow-lg shadow-forest/20 gap-2">
                            <LayoutDashboard className="w-4 h-4" /> Dashboard'a Git
                        </Button>
                    </Link>
                ) : (
                    <>
                        <Link href="/login">
                            <Button variant="ghost" className="text-gray-600">Giriş Yap</Button>
                        </Link>
                        <Link href="/editor/new">
                            <Button className="bg-forest hover:bg-forest/90 text-white font-semibold shadow-lg shadow-forest/20">
                                Ücretsiz Başla
                            </Button>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};
