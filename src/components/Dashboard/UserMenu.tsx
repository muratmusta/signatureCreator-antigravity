"use client";

import Link from "next/link";
import { LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";

export function UserMenu() {
    const { user, profile, signOut } = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.push('/');
    };

    const userInitials = profile?.full_name?.trim()
        ? profile.full_name.trim().split(' ').filter(Boolean).map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
        : user?.email?.charAt(0).toUpperCase() || 'U';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 p-1 rounded-xl hover:bg-white/10 transition-all group outline-none">
                    <div className="hidden sm:block text-right pr-1">
                        <p className="text-[11px] font-bold text-white leading-tight max-w-[120px] truncate uppercase tracking-tight">
                            {profile?.full_name || 'Kullanıcı'}
                        </p>
                        <p className="text-[10px] text-white/50 leading-tight max-w-[120px] truncate uppercase font-bold tracking-widest">
                            {profile?.plan || 'Free'} Plan
                        </p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-[12px] font-extrabold text-secondary-foreground shadow-lg group-hover:scale-105 transition-all">
                        {profile?.avatar_url ? (
                            <img
                                src={profile.avatar_url}
                                alt=""
                                className="w-full h-full rounded-lg object-cover"
                            />
                        ) : (
                            userInitials
                        )}
                    </div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 mt-2 p-1.5 bg-white border border-border rounded-xl shadow-2xl">
                <div className="px-4 py-4 mb-1.5 bg-slate-50 border border-slate-100 rounded-lg">
                    <p className="text-sm font-extrabold text-foreground uppercase tracking-tight truncate">
                        {profile?.full_name || 'Kullanıcı'}
                    </p>
                    <p className="text-[10px] text-slate-500 font-bold tracking-widest truncate mt-0.5 uppercase">
                        {user?.email}
                    </p>
                </div>
                <DropdownMenuSeparator className="bg-slate-100 mx-1" />
                <DropdownMenuItem asChild className="rounded-lg px-3 py-2.5 focus:bg-slate-50 focus:text-primary transition-all cursor-pointer">
                    <Link href="/settings" className="flex items-center gap-2.5">
                        <User className="w-4 h-4 text-slate-400" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">Profil</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg px-3 py-2.5 focus:bg-slate-50 focus:text-primary transition-all cursor-pointer">
                    <Link href="/settings" className="flex items-center gap-2.5">
                        <Settings className="w-4 h-4 text-slate-400" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">Ayarlar</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-100 mx-1" />
                <DropdownMenuItem
                    onClick={handleSignOut}
                    className="rounded-lg px-3 py-2.5 text-destructive focus:text-destructive focus:bg-destructive/5 cursor-pointer transition-all"
                >
                    <LogOut className="w-4 h-4 mr-2.5" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Çıkış Yap</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
