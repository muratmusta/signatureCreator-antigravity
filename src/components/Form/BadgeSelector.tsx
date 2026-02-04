'use client';

import React from 'react';
import { useSignature } from '@/context/SignatureContext';
import { BADGE_PRESETS } from '@/data/badges';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Plus, X, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export const BadgeSelector = () => {
    const { data, updateData } = useSignature();
    const badges = data.badges || [];

    const addBadge = (preset: typeof BADGE_PRESETS[0]) => {
        if (badges.some(b => b.id === preset.id)) {
            toast.error("Bu rozet zaten ekli");
            return;
        }

        const newBadge = {
            id: preset.id,
            imageUrl: preset.imageUrl,
            altText: preset.altText,
            linkUrl: ''
        };
        updateData({ badges: [...badges, newBadge] });
        toast.success(`${preset.label} eklendi`);
    };

    const removeBadge = (id: string) => {
        updateData({ badges: badges.filter(b => b.id !== id) });
    };

    const updateBadgeLink = (id: string, link: string) => {
        const newBadges = badges.map(b =>
            b.id === id ? { ...b, linkUrl: link } : b
        );
        updateData({ badges: newBadges });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Label className="text-[10px] font-black tracking-[0.15em] text-muted-foreground uppercase opacity-70">ROZETLER VE SERTİFİKALAR</Label>
                <div className="px-2.5 py-0.5 bg-primary/20 rounded-full text-[10px] font-black text-primary uppercase">
                    {badges.length} ADET
                </div>
            </div>

            {badges.length > 0 && (
                <div className="space-y-4">
                    {badges.map((badge) => (
                        <div key={badge.id} className="bg-card border border-border rounded-[1.25rem] p-4 shadow-sm space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="h-14 w-14 bg-muted/30 rounded-2xl flex items-center justify-center overflow-hidden p-2 border border-border shadow-inner group">
                                        <img src={badge.imageUrl} alt={badge.altText} className="max-w-full max-h-full transition-transform group-hover:scale-110" />
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-xs font-black text-foreground uppercase tracking-tight">{badge.altText}</span>
                                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-60">Doğrulanmış Rozet</span>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon-sm" className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all" onClick={() => removeBadge(badge.id)}>
                                    <X className="w-4.5 h-4.5" />
                                </Button>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-xl border border-border group focus-within:border-primary/50 focus-within:bg-card focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <input
                                    placeholder="Yönlendirme linki..."
                                    value={badge.linkUrl || ''}
                                    onChange={(e) => updateBadgeLink(badge.id, e.target.value)}
                                    className="h-6 flex-1 text-xs bg-transparent border-none focus:outline-none placeholder:text-muted-foreground/30 font-bold text-foreground"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Accordion type="single" collapsible className="w-full border-t border-border pt-2">
                <AccordionItem value="presets" className="border-none">
                    <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex items-center gap-3 group">
                            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-primary/20">
                                <Plus className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">Koleksiyondan Ekle</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="grid grid-cols-2 gap-3 pt-2 pb-4">
                            {BADGE_PRESETS.map((preset) => {
                                const isAdded = badges.some(b => b.id === preset.id);
                                return (
                                    <button
                                        key={preset.id}
                                        onClick={() => addBadge(preset)}
                                        disabled={isAdded}
                                        className={`
                                            flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 group/item
                                            ${isAdded
                                                ? 'bg-muted/10 border-transparent opacity-40 cursor-not-allowed grayscale'
                                                : 'bg-card border-border hover:border-primary/50 hover:bg-muted/10 hover:shadow-soft hover:-translate-y-1 active:scale-95'
                                            }
                                        `}
                                    >
                                        <div className="h-12 flex items-center justify-center p-1">
                                            <img src={preset.imageUrl} alt={preset.label} className={`max-h-full max-w-full transition-all ${isAdded ? '' : 'grayscale group-hover/item:grayscale-0'}`} />
                                        </div>
                                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-tight group-hover/item:text-primary transition-colors">{preset.label}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};
