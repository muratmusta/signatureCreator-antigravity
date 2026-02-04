"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Search, LayoutGrid, LayoutList, Filter, FileSignature } from 'lucide-react';
import { ProjectCard } from '@/components/Dashboard/ProjectCard';
import { StatsCards } from '@/components/Dashboard/StatsCards';
import { EmptyState } from '@/components/Dashboard/EmptyState';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import type { SignatureProject } from '@/types/signature';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
    const [signatures, setSignatures] = useState<SignatureProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchSignatures = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data } = await supabase
                .from('signatures')
                .select('*')
                .eq('user_id', user.id)
                .order('updated_at', { ascending: false });

            if (data) setSignatures(data);
            setLoading(false);
        };
        fetchSignatures();
    }, []);

    const filteredSignatures = signatures.filter(sig =>
        (sig.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        sig.data.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async (id: string) => {
        const supabase = createClient();
        const { error } = await supabase.from('signatures').delete().eq('id', id);

        if (!error) {
            setSignatures(prev => prev.filter(s => s.id !== id));
            toast.success('Tasarım silindi.');
        } else {
            toast.error('Tasarım silinirken bir hata oluştu.');
        }
    };

    const handleDuplicate = async (project: SignatureProject) => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return;

        const newProject = {
            ...project,
            id: undefined, // Let Supabase generate a new ID
            title: `${project.title} (Kopya)`,
            updated_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
        };
        // Remove the ID explicitly to be safe
        delete (newProject as any).id;

        const { data, error } = await supabase
            .from('signatures')
            .insert(newProject)
            .select()
            .single();

        if (data) {
            setSignatures(prev => [data, ...prev]);
            toast.success('Tasarım kopyalandı.');
        } else if (error) {
            console.error('Duplicate error:', error);
            toast.error('Tasarım kopyalanırken bir hata oluştu.');
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] bg-background">
                <LoadingSpinner size="lg" />
                <p className="mt-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Veriler Yükleniyor</p>
            </div>
        );
    }

    return (
        <div className="flex-1 w-full flex flex-col">
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-10 space-y-10">
                {/* Header & Toolbar - Refined */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-border/50">
                    <div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground uppercase leading-none">
                            TASARIMLARIM
                        </h1>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em] mt-3">
                            Tüm projelerinizi buradan yönetin
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* View Switcher - Premium Style */}
                        <div className="flex items-center p-1.5 bg-white border border-border rounded-2xl shadow-sm">
                            <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    "h-10 px-5 rounded-xl transition-all font-black text-[10px] tracking-widest uppercase",
                                    viewMode === 'grid' ? "bg-secondary text-secondary-foreground shadow-sm" : "text-slate-400 hover:text-slate-600"
                                )}
                                onClick={() => setViewMode('grid')}
                            >
                                <LayoutGrid className="w-4 h-4 mr-2" />
                                IZGARA
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    "h-10 px-5 rounded-xl transition-all font-black text-[10px] tracking-widest uppercase",
                                    viewMode === 'list' ? "bg-secondary text-secondary-foreground shadow-sm" : "text-slate-400 hover:text-slate-600"
                                )}
                                onClick={() => setViewMode('list')}
                            >
                                <LayoutList className="w-4 h-4 mr-2" />
                                LİSTE
                            </Button>
                        </div>

                        <Button variant="outline" className="h-14 px-8 rounded-2xl gap-3 font-black text-[10px] tracking-[0.2em] uppercase border-border bg-white hover:bg-slate-50 shadow-sm transition-all group">
                            <Filter className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                            FİLTRELE
                        </Button>
                    </div>
                </div>

                {/* Content Section */}
                {signatures.length === 0 ? (
                    <EmptyState searchQuery="" />
                ) : filteredSignatures.length === 0 ? (
                    <EmptyState searchQuery={searchQuery} />
                ) : (
                    <div className={cn(
                        viewMode === 'grid'
                            ? "grid grid-cols-1 xl:grid-cols-2 gap-8 pb-20"
                            : "flex flex-col gap-6 pb-20"
                    )}>
                        {filteredSignatures.map(project => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                viewMode={viewMode}
                                onDelete={handleDelete}
                                onDuplicate={handleDuplicate}
                                projectColor={project.data.primaryColor}
                                projectName="Kişisel Proje"
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
