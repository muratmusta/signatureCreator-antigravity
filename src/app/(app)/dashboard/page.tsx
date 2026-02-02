'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Plus, Search, LayoutGrid, LayoutList, Trash2, Download, CheckSquare, X, Filter } from 'lucide-react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { ProjectCard } from '@/components/Dashboard/ProjectCard';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import type { SignatureProject } from '@/types/signature';
import { toast } from 'sonner';
import Link from 'next/link';

export default function DashboardPage() {
    const [signatures, setSignatures] = useState<SignatureProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    useEffect(() => {
        const fetchSignatures = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
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

    const toggleSelect = (id: string) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === filteredSignatures.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredSignatures.map(s => s.id));
        }
    };

    const handleDeleteSelected = async () => {
        const supabase = createClient();
        const { error } = await supabase.from('signatures').delete().in('id', selectedIds);

        if (!error) {
            setSignatures(prev => prev.filter(s => !selectedIds.includes(s.id)));
            setSelectedIds([]);
            toast.success(`${selectedIds.length} tasarım silindi.`);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <LoadingSpinner size="lg" />
                <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Veriler Yükleniyor</p>
            </div>
        );
    }

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Projelerim</h1>
                        <p className="text-sm font-medium text-gray-400 mt-1">Toplam {signatures.length} adet tasarım oluşturuldu.</p>
                    </div>
                    <Link href="/editor/new">
                        <Button className="h-11 px-6 bg-black text-white hover:bg-gray-800 rounded-lg shadow-sm font-bold gap-2">
                            <Plus className="w-5 h-5" /> Yeni Tasarım
                        </Button>
                    </Link>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4 border-y border-gray-100/50">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center p-1 bg-gray-100 rounded-lg">
                            <Button
                                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                                size="icon"
                                className={`h-8 w-8 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-400'}`}
                                onClick={() => setViewMode('grid')}
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </Button>
                            <Button
                                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                                size="icon"
                                className={`h-8 w-8 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-400'}`}
                                onClick={() => setViewMode('list')}
                            >
                                <LayoutList className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="h-4 w-px bg-gray-200 mx-2" />
                        <Button variant="ghost" size="sm" className="h-9 px-3 gap-2 text-gray-500 font-bold hover:text-black">
                            <Filter className="w-4 h-4" /> Filtrele
                        </Button>
                    </div>

                    <div className="relative w-full md:w-80 group">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
                        <input
                            placeholder="Tasarımlarda ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 pl-10 pr-4 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:border-black focus:ring-4 focus:ring-black/5 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Grid/List Content */}
                {signatures.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 bg-white border border-dashed border-gray-200 rounded-2xl text-center px-6">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
                            <Plus className="w-8 h-8 text-gray-300" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Henüz Tasarım Yok</h2>
                        <p className="text-gray-400 text-sm font-medium max-w-sm mb-8">E-posta kimliğinizi güçlendirmek için ilk imzanızı şimdi oluşturun.</p>
                        <Link href="/editor/new">
                            <Button className="h-11 px-8 rounded-lg font-bold">İlk İmzayı Oluştur</Button>
                        </Link>
                    </div>
                ) : (
                    <div className={viewMode === 'grid'
                        ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                        : "flex flex-col gap-4"
                    }>
                        {filteredSignatures.map(project => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                viewMode={viewMode}
                                isSelected={selectedIds.includes(project.id)}
                                onSelect={toggleSelect}
                                onDelete={handleDeleteSelected}
                                onDuplicate={() => { }} // TODO
                            />
                        ))}
                    </div>
                )}

                {/* Floating Bulk Action Bar */}
                {selectedIds.length > 0 && (
                    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[70] animate-in slide-in-from-bottom-10 duration-500">
                        <div className="flex items-center gap-6 px-6 py-4 bg-black text-white rounded-2xl shadow-2xl border border-white/10 ring-8 ring-black/5">
                            <div className="flex items-center gap-3">
                                <Button
                                    onClick={toggleSelectAll}
                                    variant="ghost"
                                    className="h-9 px-3 gap-2 text-white/70 hover:text-white hover:bg-white/10 font-bold text-xs"
                                >
                                    <CheckSquare className="w-4 h-4" />
                                    {selectedIds.length === signatures.length ? 'Seçimi Kaldır' : 'Tümünü Seç'}
                                </Button>
                                <div className="h-4 w-px bg-white/20" />
                                <span className="text-xs font-bold text-white tracking-wide">
                                    {selectedIds.length} Proje Seçildi
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    onClick={handleDeleteSelected}
                                    variant="destructive"
                                    size="sm"
                                    className="h-9 px-4 rounded-xl font-bold text-xs gap-2 shadow-lg"
                                >
                                    <Trash2 className="w-4 h-4" /> Sil
                                </Button>
                                <Button
                                    onClick={() => setSelectedIds([])}
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 text-white/50 hover:text-white rounded-xl"
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
