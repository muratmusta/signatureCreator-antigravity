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
                <div className="relative group aspect-square w-32 mx-auto rounded-3xl overflow-hidden border-2 border-dashed border-gray-100 p-2 bg-white shadow-inner">
                    <img
                        src={data.logo}
                        alt="Logo"
                        className="w-full h-full object-contain rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                        <Button
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8 rounded-lg shadow-xl"
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
                        border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-300
                        ${isDragging
                            ? 'border-black bg-gray-50'
                            : 'border-gray-100 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-200'
                        }
                    `}
                >
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />

                    <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-gray-400 group-hover:text-black">
                            {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-900">Logo Yükle</p>
                            <p className="text-[10px] text-gray-400 font-medium mt-1">PNG, JPG (Max 2MB)</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center gap-4 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-lime/10 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-gray-600" />
                </div>
                <p className="text-[10px] text-gray-500 font-medium leading-tight">İpucu: Saydam arka planlı PNG dosyaları profesyonel görünüm sağlar.</p>
            </div>
        </div>
    );
};
