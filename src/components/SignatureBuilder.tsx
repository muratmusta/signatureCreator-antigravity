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
import { UserNav } from '@/components/Dashboard/UserNav';
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
            <div className="min-h-screen bg-white">
                {/* Minimal Header */}
                <nav className="h-20 flex items-center justify-between px-8 border-b border-gray-100 bg-white sticky top-0 z-40">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">S</div>
                        <span className="font-bold text-lg tracking-tight">Studio</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard">
                            <Button variant="ghost" className="text-sm font-medium text-gray-500 hover:text-black">İmzalarım</Button>
                        </Link>
                        <MySignaturesButton />
                    </div>
                </nav>

                <main className="max-w-6xl mx-auto px-6 py-20">
                    <div className="mb-12">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Tasarım Seçin</h1>
                        <p className="text-lg text-gray-500 font-medium">İş kimliğinizi en iyi yansıtan şablonu seçerek başlayın.</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 mb-12">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                placeholder="Şablon ara..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 h-12 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:bg-white focus:border-black transition-all"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            {Object.entries(TEMPLATE_CATEGORIES).map(([key, category]) => (
                                <button
                                    key={key}
                                    onClick={() => setSelectedCategory(key as keyof typeof TEMPLATE_CATEGORIES)}
                                    className={`
                                        h-12 px-5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border
                                        ${selectedCategory === key
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
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
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setPreviewTemplateId(null)}></div>
                        <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
                            <div className="flex-1 bg-gray-50 p-12 flex items-center justify-center">
                                <div className="bg-white p-10 shadow-lg rounded-2xl border border-gray-100">
                                    {(() => {
                                        const T = getTemplate(previewTemplateId);
                                        const logo = generateAutoLogo(previewPersona.fullName, previewPersona.primaryColor);
                                        return <T data={previewPersona} logoSrc={logo} />;
                                    })()}
                                </div>
                            </div>
                            <div className="w-full md:w-80 bg-white p-8 border-l border-gray-100 flex flex-col justify-between">
                                <div className="space-y-6">
                                    <div className="flex justify-between items-start">
                                        <h2 className="text-xl font-bold">Şablon {previewTemplateId}</h2>
                                        <Button variant="ghost" size="icon" onClick={() => setPreviewTemplateId(null)} className="h-8 w-8 rounded-lg">
                                            <X className="w-5 h-5 text-gray-400" />
                                        </Button>
                                    </div>
                                    <p className="text-sm text-gray-500 font-medium leading-relaxed">Modern ve profesyonel bir görünüm için optimize edilmiştir.</p>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                            <Check className="w-4 h-4 text-lime" /> Mobile Ready
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                            <Check className="w-4 h-4 text-lime" /> Dark Mode Support
                                        </div>
                                    </div>
                                </div>
                                <Button onClick={handleUseTemplate} className="w-full h-14 bg-black text-white hover:bg-gray-800 rounded-xl font-bold mt-8">
                                    Kullanmaya Başla
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
                    <div className="flex items-center justify-between w-full h-full px-6">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                            <Link href="/dashboard">
                                <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-all">
                                    <ArrowLeft className="w-5 h-5" />
                                </Button>
                            </Link>
                            <div className="h-5 w-px bg-gray-200 mx-1 hidden lg:block" />
                            <div className="flex flex-col min-w-0">
                                <input
                                    type="text"
                                    value={projectTitle}
                                    onChange={(e) => setProjectTitle(e.target.value)}
                                    className="bg-transparent border-none focus:ring-0 font-bold text-base px-0 py-0 text-black placeholder:text-gray-300 w-full outline-none tracking-tight truncate"
                                    placeholder="Proje Başlığı..."
                                />
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">İmza Stüdyosu</span>
                                    <div className="w-1 h-1 rounded-full bg-gray-200" />
                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isAutosaving ? 'text-lime animate-pulse' : 'text-gray-300'}`}>
                                        {isAutosaving ? 'Kaydediliyor' : 'Kaydedildi'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 p-1 bg-gray-50 rounded-lg hidden xl:flex">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-black hover:bg-white rounded-md" onClick={undo} disabled={!canUndo}><Undo2 className="w-4 h-4" /></Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-black hover:bg-white rounded-md" onClick={redo} disabled={!canRedo}><Redo2 className="w-4 h-4" /></Button>
                            </div>
                            <SaveButton onSave={() => { }} />
                            <MySignaturesButton />
                            <div className="h-5 w-px bg-gray-200 mx-1 hidden md:block" />
                            <UserNav />
                        </div>
                    </div>
                }
                mainContent={
                    <div className="relative w-full h-full flex flex-col bg-gray-50/50">
                        <div className="flex-1 flex items-center justify-center p-20 overflow-auto scrollbar-hide relative group">
                            <div className="absolute inset-0 bg-dot-pattern opacity-[0.4]" />

                            <div
                                className="transition-all duration-300 ease-out origin-center"
                                style={{ transform: `scale(${zoom})` }}
                            >
                                <div className="bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-3xl border border-gray-100 p-16">
                                    <PreviewPanel />
                                </div>
                            </div>

                            {/* Floating Toolbar */}
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/90 text-white backdrop-blur-xl p-2 rounded-2xl shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="flex items-center gap-1 border-r border-white/10 pr-2">
                                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white/10 text-white" onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}><ZoomOut className="w-4 h-4" /></Button>
                                    <span className="text-[10px] font-bold w-12 text-center">{Math.round(zoom * 100)}%</span>
                                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white/10 text-white" onClick={() => setZoom(z => Math.min(2, z + 0.1))}><ZoomIn className="w-4 h-4" /></Button>
                                </div>
                                <div className="flex items-center gap-3">
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
