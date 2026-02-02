'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, Settings, FileText, Menu, X } from 'lucide-react';
import { useState } from 'react';

export const AppHeader: React.FC = () => {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { href: '/dashboard', label: 'Dashboard', icon: Home },
        { href: '/editor/new', label: 'Yeni İmza', icon: FileText },
        { href: '/settings', label: 'Ayarlar', icon: Settings },
    ];

    const isActive = (href: string) => {
        if (href === '/dashboard') {
            return pathname === '/dashboard';
        }
        return pathname?.startsWith(href);
    };

    return (
        <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 md:px-8">
                {/* Logo */}
                <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
                    <div className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center text-white font-bold">
                        S
                    </div>
                    <span className="hidden sm:inline">SignatureOS</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link key={item.href} href={item.href}>
                                <Button
                                    variant={isActive(item.href) ? 'default' : 'ghost'}
                                    size="sm"
                                    className="gap-2"
                                >
                                    <Icon className="w-4 h-4" />
                                    {item.label}
                                </Button>
                            </Link>
                        );
                    })}
                </nav>

                {/* Mobile Menu Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-border bg-background">
                    <nav className="container px-4 py-4 flex flex-col gap-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                                    <Button
                                        variant={isActive(item.href) ? 'default' : 'ghost'}
                                        size="sm"
                                        className="w-full justify-start gap-2"
                                    >
                                        <Icon className="w-4 h-4" />
                                        {item.label}
                                    </Button>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            )}
        </header>
    );
};
