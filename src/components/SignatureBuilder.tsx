'use client';

import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { SignatureProvider, useSignature } from '@/context/SignatureContext';
import { FormPanel } from '@/components/Form/FormPanel';
import { PreviewPanel } from '@/components/Preview/PreviewPanel';
import { EmailPreview } from '@/components/Preview/EmailPreview';
import { DownloadButton } from '@/components/Actions/DownloadButton';
import { CopyButton } from '@/components/Actions/CopyButton';
import { SaveButton } from '@/components/Actions/SaveButton';
import { ExportButton } from '@/components/Actions/ExportButton';
import { MySignaturesButton } from '@/components/Actions/MySignaturesButton';
import { TemplateCard } from '@/components/Preview/TemplateCard';
import { UserMenu } from '@/components/Dashboard/UserMenu';
import { getTemplate } from '@/components/Templates';
import { generateAutoLogo } from '@/utils/generateLogo';
import { TEMPLATE_PERSONA_MAP } from '@/data/dummyPersonas';
import type { TemplateId } from '@/types/signature';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Search, X, ZoomIn, ZoomOut, ArrowLeft, Sparkles, Briefcase, Palette, Minimize2, Clock, Undo2, Redo2, Mail, LayoutGrid, Zap, Monitor, Smartphone, Check, Layout } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { toast } from 'sonner';

// Lazy load EditorLayout for better initial page load
const EditorLayout = lazy(() => import('@/components/Layout/EditorLayout').then(mod => ({ default: mod.EditorLayout })));

const TEMPLATE_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] as TemplateId[];

// Template categories
const TEMPLATE_CATEGORIES = {
    all: { name: 'Tümü', icon: LayoutGrid, templates: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] as TemplateId[] },
    professional: { name: 'Profesyonel', icon: Briefcase, templates: [1, 6, 13, 17, 18, 19] as TemplateId[] },
    creative: { name: 'Yaratıcı', icon: Palette, templates: [5, 8, 12, 15] as TemplateId[] },
    minimal: { name: 'Minimal', icon: Minimize2, templates: [3, 10, 14, 20] as TemplateId[] },
    modern: { name: 'Modern', icon: Zap, templates: [2, 4, 7, 9, 11, 16] as TemplateId[] },
};

interface SignatureBuilderProps {
    initialSignatureId?: string;
}

function BuilderContent({ initialSignatureId }: SignatureBuilderProps) {
    const {
        selectedTemplate,
        setSelectedTemplate,
        updateData,
        setProjectId,
        projectId,
        undo,
        redo,
        canUndo,
        canRedo,
        isAutosaving,
        lastAutoSave,
        projectTitle,
        setProjectTitle
    } = useSignature();
    const [view, setView] = useState<'gallery' | 'editor'>('gallery');
    const [previewTemplateId, setPreviewTemplateId] = useState<TemplateId | null>(null);
    const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
    const [zoom, setZoom] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof TEMPLATE_CATEGORIES>('all');
    const [showEmailPreview, setShowEmailPreview] = useState(false);

    const previewPersona = previewTemplateId ? TEMPLATE_PERSONA_MAP[previewTemplateId] : null;

    // Filter templates
    const filteredTemplates = TEMPLATE_CATEGORIES[selectedCategory].templates.filter(id => {
        if (!searchQuery) return true;
        const templateName = `Template ${id}`;
        return templateName.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const handleUseTemplate = () => {
        if (previewTemplateId) {
            setSelectedTemplate(previewTemplateId);
            setPreviewTemplateId(null);
            setView('editor');
            window.scrollTo(0, 0);
        }
    };

    // Load project effect
    useEffect(() => {
        if (initialSignatureId) {
            const loadProject = async () => {
                const supabase = createClient();
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;

                const { data, error } = await supabase
                    .from('signatures')
                    .select('*')
                    .eq('id', initialSignatureId)
                    .eq('user_id', user.id)
                    .single();

                if (data && data.data) {
                    updateData(data.data);
                    setSelectedTemplate(data.data.selectedTemplate || 1);
                    setProjectTitle(data.title || 'İsimsiz İmza');
                    setProjectId(initialSignatureId);
                    setView('editor');
                }
            };
            loadProject();
        }
    }, [initialSignatureId]);

    // --- GALLERY VIEW ---
    if (view === 'gallery') {
        return (
            <div className="min-h-screen bg-background">
                {/* Premium Global Header (Wise Forest) */}
                <nav className="h-16 flex items-center justify-between px-8 bg-[#163300] border-b border-white/10 sticky top-0 z-40 shadow-lg">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#9FE870] rounded-xl flex items-center justify-center text-[#163300] shadow-glow">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <span className="font-extrabold text-xl tracking-tighter text-white">
                            Signature<span className="text-[#9FE870]">OS</span>
                        </span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard">
                            <Button variant="ghost" className="text-sm font-bold text-white/60 hover:text-[#9FE870] hover:bg-white/5">İmzalarım</Button>
                        </Link>
                        <MySignaturesButton />
                        <div className="h-5 w-px bg-white/10 mx-1" />
                        <UserMenu />
                    </div>
                </nav>

                <main className="max-w-[1400px] mx-auto px-6 py-16">
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">Efsanevi Bir İmza Seçin</h1>
                        <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">Sıfırdan tasarlamak yerine, profesyoneller tarafından onaylı şablonlarımızdan biriyle saniyeler içinde başlayın.</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mb-12">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                            <input
                                placeholder="Şablon ara..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 h-12 bg-card border border-border rounded-2xl text-sm font-semibold outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                            />
                        </div>
                        <div className="flex gap-2 p-1 bg-card border border-border rounded-2xl overflow-x-auto scrollbar-hide">
                            {Object.entries(TEMPLATE_CATEGORIES).map(([key, category]) => (
                                <button
                                    key={key}
                                    onClick={() => setSelectedCategory(key as keyof typeof TEMPLATE_CATEGORIES)}
                                    className={`
                                        h-10 px-6 rounded-xl text-xs font-bold whitespace-nowrap transition-all uppercase tracking-wider
                                        ${selectedCategory === key
                                            ? 'bg-primary text-primary-foreground shadow-glow-sm'
                                            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                        }
                                    `}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTemplates.map((id) => (
                            <TemplateCard
                                key={id}
                                templateId={id}
                                data={TEMPLATE_PERSONA_MAP[id]}
                                onClick={() => setPreviewTemplateId(id)}
                            />
                        ))}
                    </div>
                </main>

                {/* Simplified Preview Modal */}
                {previewTemplateId && previewPersona && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-forest/40 backdrop-blur-md" onClick={() => setPreviewTemplateId(null)}></div>
                        <div className="relative bg-background w-full max-w-4xl max-h-[90vh] rounded-[2rem] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-border scale-in">
                            <div className="flex-1 bg-muted/20 p-8 md:p-12 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-dot-pattern opacity-[0.1]" />
                                <div className="bg-card p-10 shadow-xl rounded-3xl border border-border relative z-10">
                                    {(() => {
                                        const T = getTemplate(previewTemplateId);
                                        const logo = generateAutoLogo(previewPersona.fullName, previewPersona.primaryColor);
                                        return <T data={previewPersona} logoSrc={logo} />;
                                    })()}
                                </div>
                            </div>
                            <div className="w-full md:w-80 bg-card p-8 border-l border-border flex flex-col justify-between">
                                <div className="space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="text-2xl font-black text-foreground">{TEMPLATE_CATEGORIES.all.templates[previewTemplateId - 1] === previewTemplateId ? `Şablon ${previewTemplateId}` : ''}</h2>
                                            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-1">Wise Certified Design</p>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={() => setPreviewTemplateId(null)} className="h-8 w-8 rounded-full">
                                            <X className="w-5 h-5 text-muted-foreground" />
                                        </Button>
                                    </div>
                                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">Maksimum otorite ve profesyonel bir görünüm için optimize edilmiştir.</p>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-[10px] font-black text-foreground uppercase tracking-widest">
                                            <div className="w-6 h-6 rounded-full bg-lime/20 flex items-center justify-center"><Check className="w-3.5 h-3.5 text-primary" /></div>
                                            Mobile Ready
                                        </div>
                                        <div className="flex items-center gap-3 text-[10px] font-black text-foreground uppercase tracking-widest">
                                            <div className="w-6 h-6 rounded-full bg-lime/20 flex items-center justify-center"><Check className="w-3.5 h-3.5 text-primary" /></div>
                                            Dark Mode Support
                                        </div>
                                    </div>
                                </div>
                                <Button onClick={handleUseTemplate} className="w-full h-14 bg-primary text-primary-foreground hover:scale-[1.02] active:scale-[0.98] rounded-2xl font-black text-sm uppercase tracking-widest mt-8 transition-all shadow-glow">
                                    TASARIMI KULLAN
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // --- EDITOR VIEW ---
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><LoadingSpinner size="lg" /></div>}>
            <EditorLayout
                activeTab={activeTab}
                onTabChange={setActiveTab}
                sidebarContent={<FormPanel />}
                headerContent={
                    <div className="flex items-center justify-between w-full h-full px-4">
                        <div className="flex items-center gap-4 flex-1 min-w-0 text-white">
                            <Link href="/dashboard">
                                <Button variant="ghost" size="icon" className="h-9 w-9 text-white/60 hover:text-[#9FE870] hover:bg-white/5 rounded-xl transition-all">
                                    <ArrowLeft className="w-5 h-5" />
                                </Button>
                            </Link>
                            <div className="h-6 w-px bg-white/10 mx-1 hidden lg:block" />
                            <div className="flex flex-col min-w-0">
                                <input
                                    type="text"
                                    value={projectTitle}
                                    onChange={(e) => setProjectTitle(e.target.value)}
                                    className="bg-transparent border-none focus:ring-0 font-extrabold text-base px-0 py-0 text-white placeholder:text-white/20 w-full outline-none tracking-tight truncate"
                                    placeholder="Proje Başlığı..."
                                />
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Signature Studio</span>
                                    <div className="w-1 h-1 rounded-full bg-white/10" />
                                    <span className={`text-[9px] font-black uppercase tracking-[0.1em] ${isAutosaving ? 'text-[#9FE870] animate-pulse' : 'text-[#9FE870]/60'}`}>
                                        {isAutosaving ? 'Kaydediliyor' : 'Oto-Kayıt Aktif'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl hidden xl:flex">
                                <Button variant="ghost" size="icon-sm" className="h-8 w-8 text-white/40 hover:text-white hover:bg-white/10 rounded-lg" onClick={undo} disabled={!canUndo}><Undo2 className="w-4 h-4" /></Button>
                                <Button variant="ghost" size="icon-sm" className="h-8 w-8 text-white/40 hover:text-white hover:bg-white/10 rounded-lg" onClick={redo} disabled={!canRedo}><Redo2 className="w-4 h-4" /></Button>
                            </div>
                            <SaveButton onSave={() => { }} />
                            <MySignaturesButton />
                            <div className="h-6 w-px bg-white/10 mx-1 hidden md:block" />
                            <UserMenu />
                        </div>
                    </div>
                }
                mainContent={
                    <div className="relative w-full h-full flex flex-col bg-background">
                        <div className="flex-1 flex items-center justify-center p-20 overflow-auto scrollbar-hide relative group">
                            <div className="absolute inset-0 bg-dot-pattern opacity-[0.2]" />

                            <div
                                className="transition-all duration-300 ease-out origin-center animate-in fade-in zoom-in duration-500"
                                style={{ transform: `scale(${zoom})` }}
                            >
                                <div className="bg-card shadow-soft rounded-[2.5rem] border border-border p-12 md:p-20 relative">
                                    {/* Corner decoration */}
                                    <div className="absolute top-8 left-8 w-2 h-2 rounded-full bg-primary/20" />
                                    <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-primary/20" />
                                    <div className="absolute bottom-8 left-8 w-2 h-2 rounded-full bg-primary/20" />
                                    <div className="absolute bottom-8 right-8 w-2 h-2 rounded-full bg-primary/20" />

                                    <PreviewPanel />
                                </div>
                            </div>

                            {/* Floating Toolbar - Wise Premium Dark */}
                            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-forest/90 text-white backdrop-blur-xl p-2 rounded-[1.25rem] shadow-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                <div className="flex items-center gap-1 border-r border-white/10 pr-2">
                                    <Button variant="ghost" size="icon-sm" className="h-9 w-9 rounded-xl hover:bg-white/10 text-white" onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}><ZoomOut className="w-4 h-4" /></Button>
                                    <span className="text-[10px] font-black w-12 text-center text-primary">{Math.round(zoom * 100)}%</span>
                                    <Button variant="ghost" size="icon-sm" className="h-9 w-9 rounded-xl hover:bg-white/10 text-white" onClick={() => setZoom(z => Math.min(2, z + 0.1))}><ZoomIn className="w-4 h-4" /></Button>
                                </div>
                                <div className="flex items-center gap-2 px-2">
                                    <CopyButton />
                                    <ExportButton />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />
            {showEmailPreview && <EmailPreview onClose={() => setShowEmailPreview(false)} />}
        </Suspense>
    );
}

export function SignatureBuilder({ initialSignatureId }: SignatureBuilderProps) {
    return (
        <SignatureProvider>
            <BuilderContent initialSignatureId={initialSignatureId} />
        </SignatureProvider>
    );
}
