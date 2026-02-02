'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { useSignature } from '@/context/SignatureContext';
import { renderSignatureToHtml } from '@/utils/renderSignature';
import { toast } from 'sonner';

export const DownloadButton: React.FC = () => {
    const { data, selectedTemplate } = useSignature();
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);
        try {
            // 1. Generate HTML from current React state (Layout-aware)
            const htmlContent = await renderSignatureToHtml(selectedTemplate, data);

            // 2. Create Blob and Download Link
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `signature-${data.fullName.replace(/\s+/g, '-').toLowerCase() || 'new'}.html`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            toast.success("İmza HTML dosyası indirildi.");
        } catch (error) {
            console.error(error);
            toast.error("İndirme sırasında bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            className="gap-2 bg-forest hover:bg-forest/90 text-white shadow-lg shadow-forest/20"
            size="sm"
            onClick={handleDownload}
            disabled={loading}
        >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            İndir
        </Button>
    );
};
