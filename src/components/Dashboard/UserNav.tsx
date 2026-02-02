'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

/**
 * Clean & Systemic UserNav.
 */
export const UserNav: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, [supabase]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        toast.success("Oturum kapatıldı");
        router.push('/login');
    };

    if (!user) return null;

    const name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Kullanıcı';
    const email = user.email;
    const initial = name.charAt(0).toUpperCase();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 px-2 py-1.5 rounded-xl hover:bg-gray-100 transition-all text-left group">
                    <div className="w-9 h-9 rounded-lg bg-black flex items-center justify-center text-white font-bold shadow-sm transition-transform">
                        {initial}
                    </div>
                    <div className="flex flex-col min-w-0 pr-2">
                        <span className="text-sm font-bold text-gray-900 leading-tight truncate">{name}</span>
                        <span className="text-xs font-medium text-gray-400 truncate max-w-[120px]">{email}</span>
                    </div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-xl p-1.5 shadow-xl border-gray-100" align="end">
                <DropdownMenuLabel className="p-3">
                    <div className="flex flex-col space-y-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hesap Yönetimi</p>
                        <p className="text-xs font-bold text-gray-900 truncate">{email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-100 mx-1.5" />
                <DropdownMenuItem onClick={() => router.push('/settings')} className="rounded-lg p-2.5 cursor-pointer">
                    <Settings className="mr-3 h-4 w-4 text-gray-400" />
                    <span className="font-semibold text-sm">Ayarlar</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/dashboard')} className="rounded-lg p-2.5 cursor-pointer">
                    <User className="mr-3 h-4 w-4 text-gray-400" />
                    <span className="font-semibold text-sm">Profil</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-100 mx-1.5" />
                <DropdownMenuItem onClick={handleSignOut} className="rounded-lg p-2.5 cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="mr-3 h-4 w-4" />
                    <span className="font-semibold text-sm">Çıkış Yap</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
