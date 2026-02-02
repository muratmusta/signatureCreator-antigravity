'use client';

import React from 'react';
import { useSignature } from '@/context/SignatureContext';
import { LogoUploader } from './LogoUploader';
import { BadgeSelector } from './BadgeSelector';
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
    Plus,
    Minus,
    GripVertical,
    ChevronDown,
    Layout,
    Palette,
    Link2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

/**
 * Redesigned FormPanel for Professional SaaS experience.
 * Focuses on hierarchy, standardized spacing, and clean typography.
 */
export const FormPanel: React.FC = () => {
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

    return (
        <div className="flex flex-col h-full bg-white border-r border-gray-100">
            {/* Studio Header */}
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white font-bold text-sm shadow-sm">S</div>
                    <h2 className="font-bold text-lg tracking-tight">İmza Stüdyosu</h2>
                </div>
                <p className="text-xs font-medium text-gray-400 leading-relaxed uppercase tracking-wider">Tasarımınızı Kişiselleştirin</p>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <Accordion type="multiple" defaultValue={['personal', 'social']} className="w-full">

                    {/* Görsel Bölümü */}
                    <AccordionItem value="appearance" className="border-b border-gray-50 px-6 py-2">
                        <AccordionTrigger className="hover:no-underline py-4">
                            <SectionHeader icon={<Palette className="w-4 h-4" />} title="Görünüm & Kimlik" />
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pb-6 space-y-6">
                            <div className="space-y-3">
                                <Label className="text-xs font-bold text-gray-500 ml-1">Marka Rengi</Label>
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <input
                                        type="color"
                                        name="primaryColor"
                                        value={data.primaryColor}
                                        onChange={handleChange}
                                        className="w-10 h-10 rounded-lg cursor-pointer border-none bg-transparent"
                                    />
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-gray-900 uppercase">{data.primaryColor}</p>
                                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mt-0.5">Primary Brand Color</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label className="text-xs font-bold text-gray-500 ml-1">Profil / Logo</Label>
                                <LogoUploader />
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Kişisel Bilgiler */}
                    <AccordionItem value="personal" className="border-b border-gray-50 px-6 py-2">
                        <AccordionTrigger className="hover:no-underline py-4">
                            <SectionHeader icon={<User className="w-4 h-4" />} title="Kişisel Bilgiler" />
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pb-6 space-y-5">
                            <PremiumInput icon={<User className="w-4 h-4" />} label="TAM ADINIZ" name="fullName" value={data.fullName} onChange={handleChange} />
                            <PremiumInput icon={<Briefcase className="w-4 h-4" />} label="ÜNVAN" name="title" value={data.title} onChange={handleChange} />
                            <PremiumInput icon={<Building2 className="w-4 h-4" />} label="ŞİRKET" name="company" value={data.company} onChange={handleChange} />
                        </AccordionContent>
                    </AccordionItem>

                    {/* İletişim Bilgileri */}
                    <AccordionItem value="contact" className="border-b border-gray-50 px-6 py-2">
                        <AccordionTrigger className="hover:no-underline py-4">
                            <SectionHeader icon={<Mail className="w-4 h-4" />} title="İletişim & Linkler" />
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pb-6 space-y-5">
                            <PremiumInput icon={<Mail className="w-4 h-4" />} label="E-POSTA" name="email" value={data.email} onChange={handleChange} />
                            <PremiumInput icon={<Phone className="w-4 h-4" />} label="TELEFON" name="phone" value={data.phone} onChange={handleChange} />
                            <PremiumInput icon={<Globe className="w-4 h-4" />} label="WEB SİTESİ" name="website" value={data.website} onChange={handleChange} />
                            <PremiumInput icon={<MapPin className="w-4 h-4" />} label="ADRES" name="address" value={data.address} onChange={handleChange} />
                        </AccordionContent>
                    </AccordionItem>

                    {/* Sosyal Medya */}
                    <AccordionItem value="social" className="border-b border-gray-50 px-6 py-2">
                        <AccordionTrigger className="hover:no-underline py-4">
                            <SectionHeader icon={<Link2 className="w-4 h-4" />} title="Sosyal Medya" />
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pb-6 space-y-5">
                            <PremiumInput icon={<Linkedin className="w-4 h-4" />} label="LINKEDIN" value={data.socialLinks.linkedin} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSocialChange('linkedin', e.target.value)} />
                            <PremiumInput icon={<Twitter className="w-4 h-4" />} label="TWITTER" value={data.socialLinks.twitter} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSocialChange('twitter', e.target.value)} />
                            <PremiumInput icon={<Instagram className="w-4 h-4" />} label="INSTAGRAM" value={data.socialLinks.instagram} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSocialChange('instagram', e.target.value)} />
                        </AccordionContent>
                    </AccordionItem>

                    {/* Rozetler */}
                    <AccordionItem value="badges" className="border-none px-6 py-2">
                        <AccordionTrigger className="hover:no-underline py-4">
                            <SectionHeader icon={<Layout className="w-4 h-4" />} title="Rozetler & Sertifikalar" />
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pb-10">
                            <BadgeSelector />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            {/* Action Area */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-3">
                <Button variant="secondary" className="flex-1 h-11 font-bold text-xs rounded-lg uppercase tracking-wider">Şablon Değiştir</Button>
            </div>
        </div>
    );
};

const SectionHeader = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
    <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
            {icon}
        </div>
        <span className="text-sm font-bold text-gray-900 tracking-tight">{title}</span>
    </div>
);

const PremiumInput = ({ icon, label, ...props }: any) => (
    <div className="space-y-1.5 px-1">
        <div className="flex items-center justify-between">
            <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{label}</Label>
        </div>
        <div className="relative group">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-black transition-colors">
                {icon}
            </div>
            <input
                {...props}
                className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium placeholder:text-gray-300 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 outline-none transition-all"
            />
        </div>
    </div>
);

const Divider = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center gap-4">
        {children}
        <div className="h-px bg-gray-100 flex-1" />
    </div>
);
