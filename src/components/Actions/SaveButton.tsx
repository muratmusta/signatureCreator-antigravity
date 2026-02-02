'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Cloud, Loader2, Check } from 'lucide-react';
import { useSignature } from '@/context/SignatureContext';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export const SaveButton: React.FC = () => {
    const { data, user, selectedTemplate } = useSignature();
    const [saving, setSaving] = useState(false);
    const supabase = createClient();

    const handleSave = async () => {
        if (!user) {
            toast.error("Oturum bilgisi bulunamadı.");
            return;
        }

        setSaving(true);
        try {
            // Check if user already has a signature, update it. Or just insert new one?
            // For simplicity, let's insert a new one OR update last one.
            // Let's just Insert for log history.

            const { error } = await supabase
                .from('signatures')
                .insert({
                    user_id: user.id,
                    title: data.fullName || 'İsimsiz İmza',
                    data: { ...data, selectedTemplate } as any // Include selectedTemplate in saved JSON
                });

            if (error) throw error;

            toast.success("İmza buluta kaydedildi!");
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
            size="sm"
            className="gap-2 border-forest/20 text-forest hover:bg-forest/5"
            onClick={handleSave}
            disabled={saving}
        >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Cloud className="w-3.5 h-3.5" />}
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
    );
};
