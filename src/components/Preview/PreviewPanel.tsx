import React, { useMemo } from 'react';
import { useSignature } from '../../context/SignatureContext';
import { getTemplate } from '../Templates';
import { generateAutoLogo } from '../../utils/generateLogo';

export const PreviewPanel: React.FC = () => {
    const { data, selectedTemplate } = useSignature();
    const [viewMode, setViewMode] = React.useState<'desktop' | 'mobile'>('desktop');

    // Get the logo source (Base64 or auto-generated)
    const logoSrc = useMemo(() => {
        if (data.useAutoLogo) {
            return generateAutoLogo(data.fullName, data.primaryColor);
        }
        return data.logo || generateAutoLogo(data.fullName, data.primaryColor);
    }, [data.logo, data.useAutoLogo, data.fullName, data.primaryColor]);

    // Get the selected template component
    const TemplateComponent = getTemplate(selectedTemplate as any);

    // Check if user has entered minimum data
    const hasMinimumData = data.fullName.trim().length > 0;

    if (!hasMinimumData) {
        return (
            <div className="text-center p-12 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
                <div className="w-20 h-20 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </div>
                <h3 className="text-xl font-extrabold text-[#163300]">Bilgilerinizi Bekliyoruz</h3>
                <p className="text-slate-400 text-sm mt-2 max-w-[240px] mx-auto font-medium">İmzanızı canlandırmak için sol taraftaki alanları doldurmaya başlayın.</p>
            </div>
        );
    }

    return (
        <div className={`flex flex-col items-center gap-8 animate-in fade-in duration-700`}>
            {/* View Toggle */}
            <div className="flex bg-white/50 backdrop-blur-sm p-1 rounded-2xl border border-white/20 shadow-sm">
                <button
                    onClick={() => setViewMode('desktop')}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'desktop' ? 'bg-[#163300] text-[#9FE870] shadow-lg' : 'text-slate-400 hover:text-[#163300]'}`}
                >
                    Masaüstü
                </button>
                <button
                    onClick={() => setViewMode('mobile')}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'mobile' ? 'bg-[#163300] text-[#9FE870] shadow-lg' : 'text-slate-400 hover:text-[#163300]'}`}
                >
                    Mobil
                </button>
            </div>

            {/* Window Mockup */}
            <div className={`
                ${viewMode === 'desktop' ? 'w-[700px]' : 'w-[360px]'} 
                bg-white rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-border/50 overflow-hidden transition-all duration-500 ease-in-out
            `}>
                {/* Window Header */}
                <div className="h-12 bg-slate-50 border-b border-border/40 flex items-center px-6 justify-between">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                        <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                        Yeni Mesaj
                    </div>
                    <div className="w-12" />
                </div>

                {/* Email Header */}
                <div className="px-8 py-6 border-b border-border/40 space-y-4 bg-white/50">
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-slate-300 uppercase w-12">Kime:</span>
                        <div className="h-4 bg-slate-100 rounded-full flex-1" />
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-slate-300 uppercase w-12">Konu:</span>
                        <div className="h-4 bg-slate-100 rounded-full w-1/3" />
                    </div>
                </div>

                {/* Email Content */}
                <div className="p-8 space-y-6">
                    <div className="space-y-3">
                        <div className="h-3 bg-slate-50 rounded-full w-full" />
                        <div className="h-3 bg-slate-50 rounded-full w-[90%]" />
                        <div className="h-3 bg-slate-50 rounded-full w-[95%]" />
                    </div>

                    <div className="pt-8 border-t border-slate-50 overflow-hidden">
                        <div
                            className="animate-fade-in origin-top-left transition-transform duration-500"
                            id="signature-preview"
                            style={{
                                transform: viewMode === 'mobile' ? 'scale(0.55)' : 'scale(1)',
                                width: viewMode === 'mobile' ? '180%' : '100%' // Compensate width for scale down
                            }}
                        >
                            <TemplateComponent data={data} logoSrc={logoSrc} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
