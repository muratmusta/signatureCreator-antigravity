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
import { SignatureProject } from '@/types/signature';


import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export const MySignaturesButton: React.FC = () => {
    const { user, updateData, setSelectedTemplate, setProjectId, setProjectTitle } = useSignature();
    const [isOpen, setIsOpen] = useState(false);
    const [signatures, setSignatures] = useState<SignatureProject[]>([]);
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const supabase = createClient();

    const fetchSignatures = async () => {
        if (!user) return;
        setLoading(true);
        const { data, error } = await supabase
            .from('signatures')
            .select('*')
            .eq('user_id', user.id)
            .order('updated_at', { ascending: false });

        if (!error && data) {
            setSignatures(data as unknown as SignatureProject[]);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (isOpen) fetchSignatures();
    }, [isOpen, user]);

    const loadSignature = (sig: SignatureProject) => {
        if (sig.data) {
            updateData(sig.data);
            setSelectedTemplate(sig.data.selectedTemplate || 1);
            setProjectId(sig.id);
            setProjectTitle(sig.title || 'İsimsiz İmza');
            toast.success("İmza yüklendi");
            setIsOpen(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        const { error } = await supabase.from('signatures').delete().eq('id', deleteId);
        if (!error) {
            toast.success("İmza silindi");
            setSignatures(prev => prev.filter(s => s.id !== deleteId));
        }
        setDeleteId(null);
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 text-muted-foreground hover:text-foreground"
                    >
                        <FolderOpen className="w-4 h-4" />
                        <span className="hidden sm:inline">İmzalarım</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md p-0 overflow-hidden">
                    <DialogHeader className="p-6 pb-2">
                        <DialogTitle>Kayıtlı İmzalarım</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="max-h-[60vh] p-6 pt-0">
                        <div className="space-y-3 py-4">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-10 gap-3">
                                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground/40" />
                                    <p className="text-sm text-muted-foreground">Yükleniyor...</p>
                                </div>
                            ) : signatures.length === 0 ? (
                                <div className="text-center py-10 border-2 border-dashed rounded-xl">
                                    <p className="text-sm text-muted-foreground">Henüz kayıtlı imzanız yok.</p>
                                </div>
                            ) : (
                                signatures.map((sig) => (
                                    <div
                                        key={sig.id}
                                        onClick={() => loadSignature(sig)}
                                        className="flex items-center gap-4 p-3 rounded-xl border border-border bg-card hover:bg-accent/50 cursor-pointer transition-all group relative overflow-hidden"
                                    >
                                        <div className="w-12 h-12 rounded-lg bg-forest/10 flex items-center justify-center text-forest font-bold text-lg">
                                            {sig.title?.[0] || 'S'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-sm truncate group-hover:text-forest transition-colors">
                                                {sig.title || 'İsimsiz İmza'}
                                            </h4>
                                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mt-0.5">
                                                {formatDistanceToNow(new Date(sig.updated_at || sig.created_at), { addSuffix: true, locale: tr })}
                                            </p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setDeleteId(sig.id);
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))
                            )}
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>

            <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>İmzayı silmek istediğinize emin misiniz?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bu işlem geri alınamaz. Bu imza kalıcı olarak silinecektir.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>İptal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                            Sil
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
