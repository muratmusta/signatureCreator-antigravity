'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { FolderOpen, Trash2, X, Loader2 } from 'lucide-react';
import { useSignature } from '@/context/SignatureContext';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';


export const MySignaturesButton: React.FC = () => {
    const { user, updateData, setSelectedTemplate } = useSignature();
    const [isOpen, setIsOpen] = useState(false);
    const [signatures, setSignatures] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const supabase = createClient();

    const fetchSignatures = async () => {
        if (!user) return;
        setLoading(true);
        const { data, error } = await supabase
            .from('signatures')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) {
            toast.error("İmzalar yüklenirken hata oluştu.");
        } else {
            setSignatures(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (isOpen) {
            fetchSignatures();
        }
    }, [isOpen, user]);

    const loadSignature = (sig: any) => {
        if (sig.data) {
            updateData(sig.data);
            setSelectedTemplate(sig.data.selectedTemplate || 1); // If we saved template ID
            toast.success("İmza yüklendi");
            setIsOpen(false);
        }
    };

    const deleteSignature = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (!confirm("Bu imzayı silmek istediğinize emin misiniz?")) return;

        const { error } = await supabase.from('signatures').delete().eq('id', id);
        if (error) {
            toast.error("Silinemedi");
        } else {
            toast.success("İmza silindi");
            fetchSignatures();
        }
    };

    return (
        <>
            <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-foreground"
                onClick={() => setIsOpen(true)}
            >
                <FolderOpen className="w-4 h-4" />
                İmzalarım
            </Button>

            {isOpen && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
                    <div className="bg-background border border-border rounded-xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden">
                        <div className="flex items-center justify-between p-4 border-b border-border">
                            <h3 className="font-semibold">Kayıtlı İmzalarım</h3>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setIsOpen(false)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-2 space-y-2">
                            {loading ? (
                                <div className="flex justify-center p-8"><Loader2 className="animate-spin text-muted-foreground" /></div>
                            ) : signatures.length === 0 ? (
                                <div className="text-center p-8 text-muted-foreground text-sm">
                                    Henüz kayıtlı imzanız yok.
                                </div>
                            ) : (
                                signatures.map((sig) => (
                                    <div
                                        key={sig.id}
                                        onClick={() => loadSignature(sig)}
                                        className="flex items-center gap-4 p-3 rounded-lg border border-border bg-card hover:bg-accent cursor-pointer transition-colors group"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                            {sig.title?.[0] || 'S'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-sm truncate">{sig.title || 'İsimsiz İmza'}</h4>
                                            <p className="text-xs text-muted-foreground">
                                                {formatDistanceToNow(new Date(sig.created_at), { addSuffix: true, locale: tr })}
                                            </p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={(e) => deleteSignature(e, sig.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};
