'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Cloud, Loader2 } from 'lucide-react';
import { useSignature } from '@/context/SignatureContext';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export const SaveButton: React.FC<{ onSave?: () => void }> = ({ onSave }) => {
    const { data, user, selectedTemplate, projectId, setProjectId } = useSignature();
    const [saving, setSaving] = useState(false);
    const supabase = createClient();

    const handleSave = async () => {
        if (!user) {
            toast.error("Lütfen önce giriş yapın.");
            return;
        }

        setSaving(true);
        try {
            if (projectId) {
                // UPDATE existing project
                const { error } = await supabase
                    .from('signatures')
                    .update({
                        title: data.fullName || 'İsimsiz İmza',
                        data: { ...data, selectedTemplate } as any,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', projectId);

                if (error) throw error;
                toast.success("Proje güncellendi!");
                onSave?.();
            } else {
                // INSERT new project
                const { data: insertedData, error } = await supabase
                    .from('signatures')
                    .insert({
                        user_id: user.id,
                        title: data.fullName || 'İsimsiz İmza',
                        data: { ...data, selectedTemplate } as any
                    })
                    .select()
                    .single();

                if (error) throw error;

                // Set the new project ID so future saves UPDATE instead of INSERT
                if (insertedData) {
                    setProjectId(insertedData.id);
                }

                toast.success("İmza buluta kaydedildi!");
                onSave?.();
            }
        } catch (error: any) {
            console.error(error);
            toast.error("Kaydetme başarısız: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Button
            variant="outline"
            size="lg"
            className="gap-2.5 h-11 px-5 rounded-2xl font-black text-xs tracking-widest bg-forest text-white border-forest hover:bg-forest/90 shadow-premium transition-all active:scale-95 disabled:opacity-70"
            onClick={handleSave}
            disabled={saving}
        >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Cloud className="w-4 h-4 text-lime" />}
            {saving ? 'KAYDEDİLİYOR' : projectId ? 'GÜNCELLE' : 'PROJEYİ KAYDET'}
        </Button>
    );
};
