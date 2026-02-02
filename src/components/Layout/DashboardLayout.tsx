'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, Settings as SettingsIcon, Package, Plus, ChevronRight, LayoutGrid, Zap, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserNav } from '../Dashboard/UserNav';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    const navigation = [
        { name: 'Projelerim', href: '/dashboard', icon: LayoutGrid },
        { name: 'İmza Stüdyosu', href: '/editor/new', icon: Zap },
        { name: 'Ayarlar', href: '/settings', icon: SettingsIcon },
    ];

    return (
        <div className="flex h-screen w-full bg-white text-gray-900 font-sans">

            {/* Sidebar */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-[60]
                w-64 flex flex-col bg-white border-r border-gray-100
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 md:flex
                shadow-xl md:shadow-none
            `}>
                {/* Brand */}
                <div className="h-20 flex items-center px-6">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-black flex items-center justify-center text-white font-bold">
                            S
                        </div>
                        <span className="font-bold text-xl tracking-tight">SignatureOS</span>
                    </Link>
                </div>

                <div className="flex-1 px-4 py-6 space-y-8 overflow-y-auto custom-scrollbar">
                    {/* Primary Button */}
                    <Link href="/editor/new">
                        <Button className="w-full h-11 bg-black text-white hover:bg-gray-800 font-bold rounded-lg shadow-sm gap-2">
                            <Plus className="w-4 h-4" />
                            Yeni Tasarım
                        </Button>
                    </Link>

                    {/* Navigation Groups */}
                    <div className="space-y-1">
                        <p className="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Yönetim</p>
                        <nav className="space-y-1">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`
                                            flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                                            ${isActive
                                                ? 'bg-gray-50 text-black shadow-sm'
                                                : 'text-gray-500 hover:text-black hover:bg-gray-50'
                                            }
                                        `}
                                    >
                                        <item.icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-gray-400'}`} />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Pro Widget */}
                    <div className="mx-2 mt-auto p-5 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="bg-white w-8 h-8 rounded-lg flex items-center justify-center shadow-sm mb-4">
                            <Zap className="w-4 h-4 text-lime fill-lime" />
                        </div>
                        <h4 className="text-sm font-bold text-gray-900 mb-1">PRO'ya Yükselt</h4>
                        <p className="text-xs text-gray-500 mb-4 leading-relaxed">Sınırsız proje ve özel alan adı özelliklerini açın.</p>
                        <Button variant="outline" className="w-full h-9 text-xs font-bold border-gray-200 hover:bg-black hover:text-white transition-all">
                            Detaylı Bilgi
                        </Button>
                    </div>
                </div>

                {/* Footer User Profile */}
                <div className="p-4 border-t border-gray-100">
                    <UserNav />
                </div>
            </aside>

            {/* Main Area */}
            <main className="flex-1 flex flex-col min-w-0 bg-gray-50/30">
                {/* Mobile Top Header */}
                <header className="md:hidden flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-50">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white font-bold text-sm">S</div>
                        <span className="font-bold text-lg tracking-tight">SignatureOS</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="rounded-lg">
                        <Menu className="w-6 h-6" />
                    </Button>
                </header>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {children}
                </div>

                {/* Overlays */}
                {sidebarOpen && (
                    <div
                        className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-[55]"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </main>
        </div>
    );
};
