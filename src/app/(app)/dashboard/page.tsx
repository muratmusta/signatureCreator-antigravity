'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, FolderOpen, MoreVertical, Loader2, ArrowRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

interface SignatureRecord {
    id: string;
    title: string;
    created_at: string;
    updated_at: string;
    data: any; // JSONB
}

export default function DashboardPage() {
    const [signatures, setSignatures] = useState<SignatureRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchSignatures = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            let queryId = user?.id;

            // Fallback for Guest Mode
            if (!queryId) {
                // Try to get guest ID from local storage (set by SignatureContext usually)
                // If not there, create one.
                let guestId = localStorage.getItem('signature_guest_uuid');
                if (!guestId) {
                    guestId = crypto.randomUUID();
                    localStorage.setItem('signature_guest_uuid', guestId);
                }
                queryId = guestId;
            }

            // Fetch signatures for this ID
            // Note: RLS policies must allow public access OR anon access for this to work without auth.
            // We previously set: CREATE POLICY "Public Access" ON signatures FOR ALL USING (true);
            // So this will work fine.
            const { data, error } = await supabase
                .from('signatures')
                .select('*')
                .eq('user_id', queryId) // Filter by our ID
                .order('updated_at', { ascending: false });

            if (data) {
                setSignatures(data);
            }
            setLoading(false);
        };
        fetchSignatures();
    }, []);

    return (
        <div className="p-8 max-w-7xl mx-auto w-full">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Projelerim</h1>
                    <p className="text-muted-foreground mt-1">Son çalışmalarınıza göz atın ve yönetin.</p>
                </div>
                <Link href="/editor/new">
                    <Button size="lg" className="gap-2 font-semibold shadow-lg shadow-primary/20">
                        <Plus className="w-5 h-5" /> Yeni İmza Oluştur
                    </Button>
                </Link>
            </div>

            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                </div>
            ) : signatures.length === 0 ? (
                <div className="text-center border-2 border-dashed border-border rounded-xl p-12 bg-card/50">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <FolderOpen className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">Henüz bir projeniz yok</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto mt-2 mb-6">
                        Profesyonel bir imza oluşturmaya başlamak için ilk adımınızı atın.
                    </p>
                    <Link href="/editor/new">
                        <Button variant="outline">Şimdi Başla</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {signatures.map((sig) => (
                        <div key={sig.id} className="group relative bg-card hover:bg-accent/5 transition-all duration-300 border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer h-64 flex flex-col">
                            {/* Preview Area (Mock) */}
                            <div className="flex-1 bg-muted/20 p-4 flex items-center justify-center relative overflow-hidden">
                                <Link href={`/editor/${sig.id}`} className="absolute inset-0 z-10" />
                                <div className="scale-75 origin-center pointer-events-none select-none opacity-80 group-hover:opacity-100 group-hover:scale-90 transition-all duration-500">
                                    {/* We can't easily render the full signature here without huge perf cost. 
                                       Ideally we'd use a saved screenshot URL. For now, a placeholder. */}
                                    <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center text-4xl font-bold text-forest">
                                        {sig.title?.[0] || 'S'}
                                    </div>
                                </div>
                            </div>

                            {/* Info Area */}
                            <div className="p-4 border-t border-border bg-card relative z-20">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <h4 className="font-semibold truncate text-foreground pr-4 group-hover:text-forest transition-colors">
                                            {sig.title || 'İsimsiz Proje'}
                                        </h4>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {formatDistanceToNow(new Date(sig.updated_at || sig.created_at), { addSuffix: true, locale: tr })}
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
