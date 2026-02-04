import React from 'react';
import { useSignature } from '../../context/SignatureContext';
import { templateNames } from '../Templates';
import type { TemplateId } from '../../types/signature';
import { Check } from 'lucide-react';

export const TemplateSelector: React.FC = () => {
    const { selectedTemplate, setSelectedTemplate } = useSignature();

    const templates: TemplateId[] = Array.from({ length: 20 }, (_, i) => (i + 1) as TemplateId);

    return (
        <div className="space-y-3">
            {templates.map((id) => {
                const isSelected = selectedTemplate === id;
                return (
                    <button
                        key={id}
                        onClick={() => setSelectedTemplate(id)}
                        className={`
                            w-full group p-4 rounded-2xl text-left transition-all duration-300 border
                            ${isSelected
                                ? 'bg-[#9FE870]/10 border-[#9FE870] shadow-sm'
                                : 'bg-slate-50 border-border/50 hover:bg-white hover:border-[#9FE870]/30 hover:shadow-md'
                            }
                        `}
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className={`
                                    w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-all
                                    ${isSelected ? 'bg-[#9FE870] text-[#163300]' : 'bg-white text-slate-400 group-hover:bg-[#9FE870]/20 group-hover:text-[#163300]'}
                                `}>
                                    {id < 10 ? `0${id}` : id}
                                </div>
                                <div>
                                    <p className={`text-xs font-black uppercase tracking-widest ${isSelected ? 'text-[#163300]' : 'text-slate-500'}`}>
                                        Şablon {id}
                                    </p>
                                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">Profesyonel Düzen</p>
                                </div>
                            </div>
                            {isSelected && (
                                <div className="w-6 h-6 rounded-full bg-[#163300] flex items-center justify-center">
                                    <Check className="w-4 h-4 text-[#9FE870]" />
                                </div>
                            )}
                        </div>
                    </button>
                );
            })}
        </div>
    );
};
