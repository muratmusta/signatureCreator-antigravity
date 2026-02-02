'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import type { SignatureData, TemplateId } from '../../types/signature';
import { getTemplate } from '../Templates';
import { generateAutoLogo } from '../../utils/generateLogo';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Eye } from 'lucide-react';

interface TemplateCardProps {
    templateId: TemplateId;
    data: SignatureData;
    onClick?: () => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
    templateId,
    data,
    onClick
}) => {
    const TemplateComponent = getTemplate(templateId);
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.5);

    const logoSrc = useMemo(() => {
        return data.logo || generateAutoLogo(data.fullName, data.primaryColor);
    }, [data.logo, data.fullName, data.primaryColor]);

    useEffect(() => {
        if (!containerRef.current) return;
        const updateScale = () => {
            const containerWidth = containerRef.current?.offsetWidth || 300;
            const targetWidth = 600;
            const newScale = (containerWidth - 40) / targetWidth;
            setScale(Math.min(newScale, 1));
        };
        updateScale();
        const observer = new ResizeObserver(updateScale);
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <Card
            className="group relative flex flex-col overflow-hidden transition-all duration-300 border-gray-100 hover:border-black hover:shadow-xl cursor-pointer bg-white rounded-2xl"
            onClick={onClick}
        >
            {/* Template Container */}
            <div
                ref={containerRef}
                className="relative bg-gray-50/50 aspect-[16/10] overflow-hidden flex items-center justify-center p-6 border-b border-gray-50"
            >
                <div
                    style={{
                        width: '600px',
                        transform: `scale(${scale})`,
                        transformOrigin: 'center center'
                    }}
                    className="pointer-events-none"
                >
                    <div className="bg-white rounded-xl shadow-lg p-6 inline-block min-w-full">
                        <TemplateComponent data={data} logoSrc={logoSrc} />
                    </div>
                </div>

                {/* Hover States */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-black text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        İncele <Eye className="w-3.5 h-3.5" />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-sm text-gray-900 leading-tight">Şablon {templateId}</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Profesyonel Düzen</p>
                </div>
                <div
                    className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: data.primaryColor }}
                />
            </div>
        </Card>
    );
};
