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

            // Clipboard API usage for HTML
            const type = "text/html";
            const blob = new Blob([htmlContent], { type });
            const dataItems = [new ClipboardItem({ [type]: blob })];

            await navigator.clipboard.write(dataItems);

            setCopied(true);
            toast.success("İmza kopyalandı! Gmail/Outlook'a yapıştırabilirsiniz.");

            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('HTML kopyalama hatası:', err);
            // Fallback for text
            try {
                const htmlContent = await renderSignatureToHtml(selectedTemplate, data);
                await navigator.clipboard.writeText(htmlContent);
                toast.success("HTML kodu kopyalandı (Metin olarak).");
            } catch (fallbackErr) {
                toast.error("Kopyalama başarısız oldu.");
            }
        }
    };

    return (
        <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleCopy}
        >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Kopyalandı' : 'Kopyala'}
        </Button>
    );
};
