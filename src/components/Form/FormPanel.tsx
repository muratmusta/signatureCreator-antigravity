"use client";

import React from 'react';
import { useSignature } from '@/context/SignatureContext';
import { LogoUploader } from './LogoUploader';
import { BadgeSelector } from './BadgeSelector';
import { SortableLayers } from '@/components/Editor/SortableLayers';
import { TemplateSelector } from '@/components/Preview/TemplateSelector';
import {
    User,
    Briefcase,
    Building2,
    Mail,
    Phone,
    Globe,
    MapPin,
    Linkedin,
    Twitter,
    Instagram,
    Palette,
    Link2,
    Layout,
    Layers,
    Settings2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

interface FormPanelProps {
    activeTab: 'content' | 'design' | 'templates';
}

export const FormPanel: React.FC<FormPanelProps> = ({ activeTab }) => {
    const { data, updateData } = useSignature();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updateData({ [name]: value });
    };

    const handleSocialChange = (key: string, value: string) => {
        updateData({
            socialLinks: {
                ...data.socialLinks,
                [key]: value
            }
        });
    };

    if (activeTab === 'templates') {
        return (
            <div className="flex flex-col h-full bg-white">
                <div className="p-8 border-b border-border/50">
                    <h2 className="text-xl font-black text-[#163300] tracking-tight mb-1">Şablonlar</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">İmzanız için mükemmel görünümü seçin</p>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                    <TemplateSelector />
                </div>
            </div>
        );
    }

    if (activeTab === 'design') {
        return (
            <div className="flex flex-col h-full bg-white">
                <div className="p-8 border-b border-border/50">
                    <h2 className="text-xl font-black text-[#163300] tracking-tight mb-1">Tasarım</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Renkler ve stiller</p>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-10">
                    <div className="space-y-4">
                        <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Marka Rengi</Label>
                        <div className="flex items-center gap-5 p-4 bg-slate-50 rounded-2xl border border-border group transition-all hover:border-[#9FE870]/30 shadow-sm">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-white/50 ring-2 ring-white ring-offset-1">
                                <input
                                    type="color"
                                    name="primaryColor"
                                    value={data.primaryColor}
                                    onChange={handleChange}
                                    className="absolute inset--2 w-20 h-20 cursor-pointer border-none p-0 scale-150"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-extrabold text-[#163300] uppercase tracking-wider">{data.primaryColor}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-60">Ana Marka Rengi</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Profil / Logo</Label>
                        <LogoUploader />
                    </div>

                    <div className="space-y-4">
                        <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Katman Düzeni</Label>
                        <SortableLayers />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="p-8 border-b border-border/50">
                <h2 className="text-xl font-black text-[#163300] tracking-tight mb-1">İçerik</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kişisel ve iletişim bilgileriniz</p>
            </div>

            <div className="flex-1 overflow-y-auto">
                <Accordion type="single" collapsible defaultValue="personal" className="w-full">
                    {/* Kişisel Bilgiler */}
                    <AccordionItem value="personal" className="border-b border-border/50 px-6">
                        <AccordionTrigger className="hover:no-underline py-6">
                            <SectionHeader icon={<User className="w-4 h-4" />} title="Kişisel Bilgiler" />
                        </AccordionTrigger>
                        <AccordionContent className="pb-8 space-y-6">
                            <PremiumInput icon={<User className="w-5 h-5" />} label="TAM ADINIZ" name="fullName" value={data.fullName} onChange={handleChange} placeholder="Ad Soyad..." />
                            <PremiumInput icon={<Briefcase className="w-5 h-5" />} label="ÜNVAN" name="title" value={data.title} onChange={handleChange} placeholder="Yazılım Geliştirici..." />
                            <PremiumInput icon={<Building2 className="w-5 h-5" />} label="ŞİRKET" name="company" value={data.company} onChange={handleChange} placeholder="SignatureOS..." />
                        </AccordionContent>
                    </AccordionItem>

                    {/* İletişim Bilgileri */}
                    <AccordionItem value="contact" className="border-b border-border/50 px-6">
                        <AccordionTrigger className="hover:no-underline py-6">
                            <SectionHeader icon={<Mail className="w-4 h-4" />} title="İletişim & Linkler" />
                        </AccordionTrigger>
                        <AccordionContent className="pb-8 space-y-6">
                            <PremiumInput icon={<Mail className="w-5 h-5" />} label="E-POSTA" name="email" value={data.email} onChange={handleChange} placeholder="merhaba@signature.os" />
                            <PremiumInput icon={<Phone className="w-5 h-5" />} label="TELEFON" name="phone" value={data.phone} onChange={handleChange} placeholder="+90 ..." />
                            <PremiumInput icon={<Globe className="w-5 h-5" />} label="WEB SİTESİ" name="website" value={data.website} onChange={handleChange} placeholder="www.signature.os" />
                            <PremiumInput icon={<MapPin className="w-5 h-5" />} label="ADRES" name="address" value={data.address} onChange={handleChange} placeholder="İstanbul, TR" />
                        </AccordionContent>
                    </AccordionItem>

                    {/* Sosyal Medya */}
                    <AccordionItem value="social" className="border-b border-border/50 px-6">
                        <AccordionTrigger className="hover:no-underline py-6">
                            <SectionHeader icon={<Link2 className="w-4 h-4" />} title="Sosyal Medya" />
                        </AccordionTrigger>
                        <AccordionContent className="pb-8 space-y-6">
                            <PremiumInput icon={<Linkedin className="w-5 h-5" />} label="LINKEDIN" value={data.socialLinks.linkedin} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSocialChange('linkedin', e.target.value)} placeholder="Username..." />
                            <PremiumInput icon={<Twitter className="w-5 h-5" />} label="TWITTER" value={data.socialLinks.twitter} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSocialChange('twitter', e.target.value)} placeholder="Username..." />
                            <PremiumInput icon={<Instagram className="w-5 h-5" />} label="INSTAGRAM" value={data.socialLinks.instagram} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSocialChange('instagram', e.target.value)} placeholder="Username..." />
                        </AccordionContent>
                    </AccordionItem>

                    {/* Rozetler */}
                    <AccordionItem value="badges" className="border-none px-6">
                        <AccordionTrigger className="hover:no-underline py-6">
                            <SectionHeader icon={<Layout className="w-4 h-4" />} title="Rozetler & Sertifikalar" />
                        </AccordionTrigger>
                        <AccordionContent className="pb-12">
                            <BadgeSelector />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
};

const SectionHeader = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
    <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shadow-sm transition-colors group-hover:bg-[#9FE870]/20 group-hover:text-[#163300]">
            {icon}
        </div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest group-hover:text-[#163300] transition-colors">{title}</span>
    </div>
);

const PremiumInput = ({ icon, label, ...props }: any) => (
    <div className="space-y-3 px-1">
        <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] leading-none mb-1 opacity-80">{label}</Label>
        <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#163300] transition-colors">
                {icon}
            </div>
            <input
                {...props}
                className="w-full h-14 pl-12 pr-4 bg-[#F2F5F7] border border-transparent rounded-xl text-sm font-bold text-[#163300] placeholder:text-slate-300 focus:bg-white focus:border-[#163300] focus:ring-4 focus:ring-[#163300]/5 outline-none transition-all shadow-sm"
            />
        </div>
    </div>
);
