import React from 'react';
import { useSignature } from '../../context/SignatureContext';
import { templateNames } from '../Templates';
import type { TemplateId } from '../../types/signature';

export const TemplateSelector: React.FC = () => {
    const { selectedTemplate, setSelectedTemplate } = useSignature();

    const templates: TemplateId[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-sm font-bold text-forest uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-5 bg-lime rounded-full"></span>
                    Şablon Seçin
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                    {templates.length} farklı tasarım arasından seçim yapın
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {templates.map((id) => {
                    const isSelected = selectedTemplate === id;
                    const name = templateNames[id];

                    return (
                        <button
                            key={id}
                            onClick={() => setSelectedTemplate(id)}
                            className={`
                                group relative p-3 rounded-2xl text-left transition-all duration-300
                                ${isSelected
                                    ? 'bg-lime/20 border-2 border-lime shadow-lg scale-105'
                                    : 'bg-white border-2 border-gray-200 hover:border-lime/50 hover:shadow-md hover:scale-[1.02]'
                                }
                            `}
                        >
                            {/* Template Number Badge */}
                            <div className={`
                                absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-md transition-all duration-300
                                ${isSelected
                                    ? 'bg-lime text-forest'
                                    : 'bg-forest text-white group-hover:bg-lime group-hover:text-forest'
                                }
                            `}>
                                {id}
                            </div>

                            {/* Template Preview - Simplified visual representation */}
                            <div className="aspect-[4/3] mb-2 rounded-lg overflow-hidden bg-pale border border-gray-200">
                                <div className="w-full h-full p-2 flex flex-col justify-center gap-1">
                                    {/* Mini preview bars representing template structure */}
                                    {id === 1 && (
                                        <>
                                            <div className="h-1 bg-forest rounded w-3/4"></div>
                                            <div className="h-0.5 bg-slate-300 rounded w-1/2"></div>
                                            <div className="h-0.5 bg-slate-300 rounded w-2/3"></div>
                                        </>
                                    )}
                                    {id === 2 && (
                                        <>
                                            <div className="h-1 bg-forest rounded w-2/3 mx-auto"></div>
                                            <div className="h-0.5 bg-slate-300 rounded w-1/2 mx-auto"></div>
                                            <div className="h-0.5 bg-slate-300 rounded w-3/4 mx-auto"></div>
                                        </>
                                    )}
                                    {id === 3 && (
                                        <>
                                            <div className="h-0.5 bg-forest rounded w-full"></div>
                                            <div className="h-0.5 bg-slate-300 rounded w-4/5"></div>
                                            <div className="h-0.5 bg-slate-300 rounded w-3/5"></div>
                                        </>
                                    )}
                                    {id >= 4 && (
                                        <>
                                            <div className={`h-1 bg-forest rounded ${id % 2 === 0 ? 'w-3/4' : 'w-2/3'}`}></div>
                                            <div className="h-0.5 bg-slate-300 rounded w-1/2"></div>
                                            <div className="h-0.5 bg-slate-300 rounded w-3/4"></div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Template Name */}
                            <div className="text-center">
                                <p className={`text-xs font-bold transition-colors ${isSelected ? 'text-forest' : 'text-slate-700 group-hover:text-forest'
                                    }`}>
                                    {name}
                                </p>
                            </div>

                            {/* Selected Indicator */}
                            {isSelected && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-10 h-10 rounded-full bg-lime/90 flex items-center justify-center shadow-neon">
                                        <svg className="w-6 h-6 text-forest" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
