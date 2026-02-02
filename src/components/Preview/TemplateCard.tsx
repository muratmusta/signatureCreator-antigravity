import React, { useMemo, useRef, useState, useEffect } from 'react';
import type { SignatureData, TemplateId } from '../../types/signature';
import { getTemplate } from '../Templates';
import { generateAutoLogo } from '../../utils/generateLogo';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Heart, Maximize2 } from 'lucide-react';

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
        return data.logoBase64 || generateAutoLogo(data.fullName, data.primaryColor);
    }, [data, data.primaryColor]);

    // Calculate Dynamic Scale to fit container
    useEffect(() => {
        if (!containerRef.current) return;

        // Standard signature width is approx 600px
        const updateScale = () => {
            const containerWidth = containerRef.current?.offsetWidth || 300;
            const targetWidth = 600; // Assumed width of templates
            const newScale = (containerWidth - 32) / targetWidth; // -32 for padding
            setScale(Math.min(newScale, 1));
        };

        updateScale();
        const observer = new ResizeObserver(updateScale);
        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <Card
            className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer border-gray-200 hover:border-lime"
            onClick={onClick}
        >
            {/* Aspect Ratio Container */}
            <div
                ref={containerRef}
                className="relative bg-pale w-full aspect-[16/10] overflow-hidden flex items-center justify-center p-4"
            >
                {/* Scaled Signature */}
                {/* We use a wrapper with fixed size to ensure the component renders correctly, then scale it */}
                <div
                    style={{
                        width: '600px',
                        transform: `scale(${scale})`,
                        transformOrigin: 'center center'
                    }}
                    className="pointer-events-none origin-center" // Ensure clicks pass through to card
                >
                    <div className="bg-white rounded-lg shadow-sm p-4 inline-block min-w-full">
                        <TemplateComponent data={data} logoSrc={logoSrc} />
                    </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-forest/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <Button variant="secondary" className="shadow-neon rounded-full" onClick={(e) => { e.stopPropagation(); onClick?.(); }}>
                        <Maximize2 className="mr-2 h-4 w-4" />
                        İncele
                    </Button>
                </div>

                {/* Favorite Button (Always visible on hover) */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="outline" className="rounded-full bg-white/90 hover:text-danger hover:border-danger h-8 w-8" onClick={(e) => e.stopPropagation()}>
                        <Heart className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Footer Info */}
            <div className="px-4 py-3 border-t border-gray-100 bg-white flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-sm text-forest">Şablon {templateId}</h3>
                    <p className="text-xs text-slate-500 capitalize">{data.title.split(' ')[0] || 'Profesyonel'}</p>
                </div>

                {/* Color Indicator */}
                <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.primaryColor }}></div>
                </div>
            </div>
        </Card>
    );
};
