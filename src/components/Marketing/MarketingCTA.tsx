'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { ArrowRight, LayoutDashboard } from 'lucide-react';
import { User } from '@supabase/supabase-js';

interface MarketingCTAProps {
    className?: string;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'default' | 'lg' | 'sm';
}

export const MarketingCTA: React.FC<MarketingCTAProps> = ({ className, variant = 'primary', size = 'default' }) => {
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
    }, []);

    if (loading) {
        return <div className={`h-12 w-48 bg-white/50 animate-pulse rounded-full ${className}`}></div>;
    }

    if (user) {
        return (
            <Link href="/dashboard">
                <Button
                    size={size}
                    variant="default"
                    className={`gap-3 bg-[#163300] text-[#9FE870] hover:bg-[#163300]/90 transition-all font-black text-xs uppercase tracking-widest ${className}`}
                >
                    <LayoutDashboard className="w-5 h-5" /> DASHBOARD'A GİT <ArrowRight className="w-4 h-4" />
                </Button>
            </Link>
        );
    }

    return (
        <Link href="/editor/new">
            <Button
                size={size}
                variant="default"
                className={`gap-3 bg-[#9FE870] text-[#163300] hover:bg-[#163300] hover:text-[#9FE870] transition-all font-black text-xs uppercase tracking-widest border-none shadow-neon ${className}`}
            >
                HEMEN TASARLAMAYA BAŞLA <ArrowRight className="w-5 h-5" />
            </Button>
        </Link>
    );
};
