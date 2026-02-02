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
                <Label className="text-xs font-black tracking-widest text-gray-400 uppercase">ROZETLER VE SERTİFİKALAR</Label>
                <div className="px-2 py-0.5 bg-lime/10 rounded-full text-[10px] font-bold text-forest">
                    {badges.length} adet
                </div>
            </div>

            {badges.length > 0 && (
                <div className="space-y-4">
                    {badges.map((badge) => (
                        <div key={badge.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden p-2 border border-gray-100 shadow-inner">
                                        <img src={badge.imageUrl} alt={badge.altText} className="max-w-full max-h-full transition-transform hover:scale-110" />
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-xs font-bold text-gray-900 uppercase tracking-tight">{badge.altText}</span>
                                        <span className="text-[10px] text-gray-400 font-medium">Linkli Rozet</span>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-destructive hover:bg-destructive/5 rounded-lg transition-colors" onClick={() => removeBadge(badge.id)}>
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl border border-gray-100/50 group focus-within:border-lime/30 focus-within:bg-white transition-all">
                                <ExternalLink className="w-3.2 h-3.2 text-gray-300 group-focus-within:text-lime" />
                                <input
                                    placeholder="Yönlendirme linki..."
                                    value={badge.linkUrl || ''}
                                    onChange={(e) => updateBadgeLink(badge.id, e.target.value)}
                                    className="h-6 flex-1 text-xs bg-transparent border-none focus:outline-none placeholder:text-gray-300 font-medium"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Accordion type="single" collapsible className="w-full border-t border-gray-50 pt-2">
                <AccordionItem value="presets" className="border-none">
                    <AccordionTrigger className="hover:no-underline py-2">
                        <div className="flex items-center gap-2 group">
                            <div className="w-7 h-7 rounded-lg bg-lime/10 flex items-center justify-center transition-transform group-hover:scale-110">
                                <Plus className="w-4 h-4 text-forest" />
                            </div>
                            <span className="text-xs font-bold text-gray-600">Rozet Koleksiyonundan Ekle</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="grid grid-cols-2 gap-3 pt-4">
                            {BADGE_PRESETS.map((preset) => {
                                const isAdded = badges.some(b => b.id === preset.id);
                                return (
                                    <button
                                        key={preset.id}
                                        onClick={() => addBadge(preset)}
                                        disabled={isAdded}
                                        className={`
                                            flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300
                                            ${isAdded
                                                ? 'bg-gray-50 border-transparent opacity-40 cursor-not-allowed scale-95'
                                                : 'bg-white border-gray-100 hover:border-lime/30 hover:shadow-premium hover:-translate-y-1 active:scale-95'
                                            }
                                        `}
                                    >
                                        <div className="h-10 flex items-center justify-center p-1">
                                            <img src={preset.imageUrl} alt={preset.label} className="max-h-full max-w-full grayscale group-hover:grayscale-0 transition-all" />
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">{preset.label}</span>
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
