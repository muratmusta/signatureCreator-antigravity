'use client';

import React, { useState } from 'react';
import { useSignature } from '../../context/SignatureContext';
import { Button } from '../ui/button';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export const LogoUploader: React.FC = () => {
    const { data, updateData } = useSignature();
    const [uploading, setUploading] = useState(false);
    const supabase = createClient();

    const handleUpload = () => {
        document.getElementById('logo-upload')?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            toast.error('Görsel 2MB boyutundan küçük olmalıdır.');
            return;
        }

        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('logos')
                .upload(fileName, file, { upsert: false });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('logos')
                .getPublicUrl(fileName);

            updateData({
                logoBase64: publicUrl,
                useAutoLogo: false,
            });

            toast.success("Logo başarıyla yüklendi");
        } catch (error: any) {
            console.error('Upload Error:', error);
            toast.error("Yükleme sırasında hata oluştu");
        } finally {
            setUploading(false);
            // Reset input
            e.target.value = '';
        }
    };

    const handleRemoveLogo = () => {
        updateData({
            logoBase64: '',
            useAutoLogo: true,
        });
    };

    return (
        <div className="space-y-3">
            <input
                type="file"
                id="logo-upload"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />

            {!data.useAutoLogo && data.logoBase64 ? (
                <div className="relative group rounded-xl overflow-hidden border border-border bg-muted/30 aspect-square w-32 mx-auto">
                    <img
                        src={data.logoBase64}
                        alt="Logo Preview"
                        className="w-full h-full object-contain p-2"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button variant="destructive" size="icon" className="h-8 w-8 rounded-full" onClick={handleRemoveLogo}>
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            ) : (
                <div
                    onClick={handleUpload}
                    className={`
                        border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer
                        hover:border-primary/50 hover:bg-primary/5 transition-colors group
                    `}
                >
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:scale-110 transition-transform">
                        {uploading ? <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /> : <Upload className="w-5 h-5 text-muted-foreground" />}
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-medium text-foreground">Logo Yükle</p>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG (Max 2MB)</p>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-center gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground h-8"
                    onClick={() => updateData({ useAutoLogo: !data.useAutoLogo })}
                >
                    {data.useAutoLogo ? "Otomatik Logo Kullanılıyor" : "Varsayılan Logoya Dön"}
                </Button>
            </div>
        </div>
    );
};
