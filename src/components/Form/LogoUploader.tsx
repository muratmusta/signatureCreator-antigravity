'use client';

import React, { useState, useRef } from 'react';
import { useSignature } from '@/context/SignatureContext';
import { Button } from '@/components/ui/button';
import { Upload, X, Image as ImageIcon, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Redesigned LogoUploader for Clean SaaS experience.
 */
export const LogoUploader: React.FC = () => {
    const { data, updateData } = useSignature();
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            toast.error('Lütfen geçerli bir görsel yükleyin.');
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            toast.error('Görsel boyutu 2MB\'dan küçük olmalıdır.');
            return;
        }

        setIsUploading(true);
        try {
            const base64 = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(file);
            });
            updateData({ logo: base64 });
            toast.success('Logo başarıyla güncellendi.');
        } catch (error) {
            toast.error('Görsel yüklenirken bir hata oluştu.');
        } finally {
            setIsUploading(false);
        }
    };

    const removeLogo = () => {
        updateData({ logo: undefined });
        toast.success('Logo kaldırıldı.');
    };

    return (
        <div className="space-y-4">
            {data.logo ? (
                <div className="relative group aspect-square w-32 mx-auto rounded-[2rem] overflow-hidden border-2 border-dashed border-border p-2 bg-card shadow-inner">
                    <img
                        src={data.logo}
                        alt="Logo"
                        className="w-full h-full object-contain rounded-3xl"
                    />
                    <div className="absolute inset-0 bg-forest/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                        <Button
                            variant="destructive"
                            size="icon"
                            className="h-9 w-9 rounded-xl shadow-xl hover:scale-110 active:scale-90 transition-all"
                            onClick={removeLogo}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            ) : (
                <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); }}
                    onClick={() => fileInputRef.current?.click()}
                    className={`
                        border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 group
                        ${isDragging
                            ? 'border-primary bg-primary/5'
                            : 'border-border bg-muted/20 hover:bg-muted/40 hover:border-primary/50'
                        }
                    `}
                >
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />

                    <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-card rounded-2xl flex items-center justify-center shadow-sm text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all">
                            {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                        </div>
                        <div>
                            <p className="text-xs font-black text-foreground uppercase tracking-widest">Logo Yükle</p>
                            <p className="text-[10px] text-muted-foreground font-bold mt-1 uppercase tracking-tight opacity-60">PNG, JPG (Max 2MB)</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center gap-4 bg-muted/20 p-4 rounded-2xl border border-border">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <p className="text-[10px] text-muted-foreground font-bold leading-relaxed uppercase tracking-tight">İpucu: Saydam arka planlı PNG dosyaları profesyonel görünüm sağlar.</p>
            </div>
        </div>
    );
};
