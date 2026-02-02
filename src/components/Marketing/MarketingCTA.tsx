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
        return <div className={`h-12 w-48 bg-gray-100 animate-pulse rounded-full ${className}`}></div>;
    }

    if (user) {
        return (
            <Link href="/dashboard">
                <Button
                    size={size}
                    className={`gap-2 ${variant === 'primary' ? 'bg-forest hover:bg-forest/90' : ''} ${className}`}
                >
                    <LayoutDashboard className="w-5 h-5" /> Dashboard'a Git <ArrowRight className="w-4 h-4" />
                </Button>
            </Link>
        );
    }

    return (
        <Link href="/editor/new">
            <Button
                size={size}
                className={`gap-2 ${variant === 'primary' ? 'bg-gray-900 hover:bg-black text-white' : ''} ${className}`}
            >
                Hemen Tasarlamaya Başla <ArrowRight className="w-5 h-5" />
            </Button>
        </Link>
    );
};
