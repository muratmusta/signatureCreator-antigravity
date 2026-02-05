'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check, Info } from 'lucide-react'; // 'Loader2' -> 'Info' (or Check)
import { useSignature } from '@/context/SignatureContext';
import { renderSignatureToHtml } from '@/utils/renderSignature';
import { toast } from 'sonner';

export const CopyButton: React.FC = () => {
    const { data, selectedTemplate } = useSignature();
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            const htmlContent = await renderSignatureToHtml(selectedTemplate, data);

            // Create blobs for both HTML and Plain Text
            const htmlBlob = new Blob([htmlContent], { type: "text/html" });
            const textBlob = new Blob([htmlContent], { type: "text/plain" });

            // Create ClipboardItem with both formats
            const dataItems = [
                new ClipboardItem({
                    "text/html": htmlBlob,
                    "text/plain": textBlob,
                }),
            ];

            await navigator.clipboard.write(dataItems);

            setCopied(true);
            toast.success("İmza Kopyalandı!", {
                description: "Gmail veya Outlook'a yapıştırabilirsiniz (Formatlar korunur).",
            });

            setTimeout(() => setCopied(false), 3000);
        } catch (err) {
            console.error('Kopyalama hatası:', err);
            // Fallback for browsers that might fail with the above
            try {
                const htmlContent = await renderSignatureToHtml(selectedTemplate, data);
                await navigator.clipboard.writeText(htmlContent);
                toast.success("HTML Kodu Kopyalandı", {
                    description: "Sadece metin/kod olarak kopyalandı (Zengin içerik desteği yok).",
                });
            } catch (fallbackErr) {
                toast.error("Kopyalama başarısız");
            }
        }
    };

    return (
        <Button
            variant="outline"
            size="lg"
            className={`
                gap-2.5 h-11 px-5 rounded-2xl font-black text-xs tracking-widest transition-all duration-300
                ${copied
                    ? 'bg-lime text-forest border-lime shadow-[0_0_15px_rgba(159,232,112,0.4)]'
                    : 'bg-white text-gray-700 border-gray-100 hover:border-lime/30 hover:bg-lime/5 shadow-sm'
                }
            `}
            onClick={handleCopy}
        >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'KOPYALANDI' : 'KOPYALA'}
        </Button>
    );
};
