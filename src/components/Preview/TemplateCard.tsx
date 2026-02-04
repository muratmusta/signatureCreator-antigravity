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
            className="group relative flex flex-col overflow-hidden transition-all duration-300 border-border hover:border-primary hover:shadow-glow-sm cursor-pointer bg-card rounded-[2rem]"
            onClick={onClick}
        >
            {/* Template Container */}
            <div
                ref={containerRef}
                className="relative bg-muted/20 aspect-[16/10] overflow-hidden flex items-center justify-center p-6 border-b border-border"
            >
                <div
                    style={{
                        width: '600px',
                        transform: `scale(${scale})`,
                        transformOrigin: 'center center'
                    }}
                    className="pointer-events-none"
                >
                    <div className="bg-card rounded-2xl shadow-xl p-8 inline-block min-w-full border border-border/50">
                        <TemplateComponent data={data} logoSrc={logoSrc} />
                    </div>
                </div>

                {/* Hover States */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-glow flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        İncele <Eye className="w-4 h-4" />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-5 flex items-center justify-between">
                <div>
                    <h3 className="font-black text-sm text-foreground leading-tight uppercase tracking-tight">Şablon {templateId}</h3>
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-1 opacity-60">Wise Certified Design</p>
                </div>
                <div className="flex items-center gap-2">
                    <div
                        className="w-4 h-4 rounded-full border border-border shadow-sm ring-4 ring-primary/5"
                        style={{ backgroundColor: data.primaryColor }}
                    />
                </div>
            </div>
        </Card>
    );
};
