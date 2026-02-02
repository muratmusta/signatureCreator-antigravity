'use client';

import { useState, useEffect } from 'react';
import { SignatureProvider, useSignature } from '@/context/SignatureContext';
import { FormPanel } from '@/components/Form/FormPanel';
import { PreviewPanel } from '@/components/Preview/PreviewPanel';
import { DownloadButton } from '@/components/Actions/DownloadButton';
import { CopyButton } from '@/components/Actions/CopyButton';
import { SaveButton } from '@/components/Actions/SaveButton';
import { MySignaturesButton } from '@/components/Actions/MySignaturesButton';
import { TemplateCard } from '@/components/Preview/TemplateCard';
import { getTemplate } from '@/components/Templates';
import { generateAutoLogo } from '@/utils/generateLogo';
import { TEMPLATE_PERSONA_MAP } from '@/data/dummyPersonas';
import type { TemplateId } from '@/types/signature';
import { Button } from '@/components/ui/button';
import { Search, X, ZoomIn, ZoomOut, ArrowLeft } from 'lucide-react';
import { EditorLayout } from '@/components/Layout/EditorLayout';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

const TEMPLATE_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as TemplateId[];

interface SignatureBuilderProps {
    initialSignatureId?: string;
}

function BuilderContent({ initialSignatureId }: SignatureBuilderProps) {
    const { selectedTemplate, setSelectedTemplate, updateData } = useSignature();
    const [view, setView] = useState<'gallery' | 'editor'>('gallery');
    const [previewTemplateId, setPreviewTemplateId] = useState<TemplateId | null>(null);
    const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
    const [zoom, setZoom] = useState(1);

    const previewPersona = previewTemplateId ? TEMPLATE_PERSONA_MAP[previewTemplateId] : null;

    const handleUseTemplate = () => {
        if (previewTemplateId) {
            setSelectedTemplate(previewTemplateId);
            setPreviewTemplateId(null);
            setView('editor');
            window.scrollTo(0, 0);
        }
    };

    // Load specific signature if ID is provided
    useEffect(() => {
        if (initialSignatureId) {
            const loadProject = async () => {
                const supabase = createClient();
                const { data, error } = await supabase
                    .from('signatures')
                    .select('*')
                    .eq('id', initialSignatureId)
                    .single();

                if (data && data.data) {
                    updateData(data.data);
                    setSelectedTemplate(data.data.selectedTemplate || 1);
                    setView('editor');
                    toast.success("Proje başarıyla yüklendi.");
                } else {
                    toast.error("Proje bulunamadı.");
                }
            };
            loadProject();
        }
    }, [initialSignatureId, updateData, setSelectedTemplate]);

    // --- GALLERY VIEW ---
    if (view === 'gallery') {
        return (
            <div className="min-h-screen bg-background font-sans text-foreground pb-20">
                <nav className="flex items-center justify-between px-6 py-4 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40 h-16">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-forest rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">W</div>
                        <span className="font-bold text-xl tracking-tight text-forest">WiseSignature</span>
                    </div>
                </nav>

                <section className="relative px-6 py-20 text-center max-w-4xl mx-auto space-y-6">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
                        Email imzanız, <span className="text-forest">kimliğinizdir.</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Bir şablon seçerek başlayın. İstediğiniz gibi özelleştirin.
                    </p>
                    {initialSignatureId && (
                        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg inline-block">
                            <p className="text-yellow-800 text-sm">Dikkat: 'Yeni Oluştur' dediniz ama ID ile geldiniz. Mevcut projeyi yüklemek için bekleyin...</p>
                        </div>
                    )}
                </section>

                <main className="max-w-7xl mx-auto px-6 pb-20">
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {TEMPLATE_IDS.map((id) => (
                            <div key={id} className="break-inside-avoid">
                                <TemplateCard
                                    templateId={id}
                                    data={TEMPLATE_PERSONA_MAP[id]}
                                    onClick={() => setPreviewTemplateId(id)}
                                />
                            </div>
                        ))}
                    </div>
                </main>

                {previewTemplateId && previewPersona && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setPreviewTemplateId(null)}></div>
                        <div className="relative bg-card w-full max-w-5xl h-[85vh] rounded-[24px] shadow-2xl border border-border flex overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
                            <Button variant="ghost" size="icon" onClick={() => setPreviewTemplateId(null)} className="absolute top-4 right-4 z-10 rounded-full bg-background/50 hover:bg-background">
                                <X className="w-5 h-5" />
                            </Button>

                            <div className="flex-1 bg-muted/30 flex items-center justify-center p-12 relative overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
                                <div className="bg-white p-8 shadow-xl rounded-xl scale-110 border border-border/5 relative z-10 transition-transform hover:scale-[1.12]">
                                    {(() => {
                                        const T = getTemplate(previewTemplateId);
                                        const logo = generateAutoLogo(previewPersona.fullName, previewPersona.primaryColor);
                                        return <T data={previewPersona} logoSrc={logo} />;
                                    })()}
                                </div>
                            </div>

                            <div className="w-96 bg-card border-l border-border flex flex-col p-8 justify-center">
                                <div>
                                    <h2 className="text-2xl font-bold tracking-tight mb-2">Şablon {previewTemplateId}</h2>
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                                        Profesyonel ve düzenlenebilir email imzası.
                                    </p>
                                </div>
                                <div className="mt-auto space-y-3">
                                    <Button size="lg" className="w-full font-semibold h-12 text-base" onClick={handleUseTemplate}>
                                        Bu Şablonu Düzenle
                                    </Button>
                                    <Button variant="ghost" className="w-full" onClick={() => setPreviewTemplateId(null)}>Vazgeç</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // --- EDITOR VIEW (EDITOR LAYOUT) ---
    return (
        <EditorLayout
            activeTab={activeTab}
            onTabChange={setActiveTab}
            sidebarContent={<FormPanel />}
            headerContent={
                <>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground -ml-2" onClick={() => setView('gallery')}>
                            <ArrowLeft className="w-4 h-4" /> Tüm Şablonlar
                        </Button>
                        <div className="h-4 w-px bg-border hidden md:block"></div>
                        <span className="font-medium text-sm hidden md:block text-muted-foreground">Düzenleniyor: <span className="text-foreground">Şablon {selectedTemplate}</span></span>
                    </div>

                    <div className="flex items-center gap-2">
                        <MySignaturesButton />
                        <div className="w-px h-4 bg-border mx-1 hidden md:block"></div>
                        <SaveButton />
                        <CopyButton />
                        <DownloadButton />
                    </div>
                </>
            }
            mainContent={
                <>
                    {/* Floating Zoom Controls */}
                    <div className="absolute bottom-6 right-6 z-20 flex gap-1 bg-background/90 backdrop-blur shadow-lg p-1.5 rounded-full border border-border ring-1 ring-black/5">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}><ZoomOut className="w-4 h-4 text-muted-foreground" /></Button>
                        <span className="flex items-center justify-center w-12 text-xs font-semibold tabular-nums text-foreground">{Math.round(zoom * 100)}%</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setZoom(z => Math.min(2, z + 0.1))}><ZoomIn className="w-4 h-4 text-muted-foreground" /></Button>
                    </div>

                    {/* Canvas Content */}
                    <div
                        className="bg-white shadow-2xl transition-all duration-300 ease-out origin-center ring-1 ring-black/5"
                        style={{
                            transform: `scale(${zoom})`,
                            padding: '40px',
                            borderRadius: '12px'
                        }}
                    >
                        <PreviewPanel />
                    </div>

                    <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-background/50 backdrop-blur-sm rounded-full border border-border text-[10px] uppercase font-bold tracking-wider text-muted-foreground pointer-events-none">
                        Canlı Önizleme
                    </div>
                </>
            }
        />
    );
}

export function SignatureBuilder({ initialSignatureId }: SignatureBuilderProps) {
    return (
        <SignatureProvider>
            <BuilderContent initialSignatureId={initialSignatureId} />
        </SignatureProvider>
    );
}
