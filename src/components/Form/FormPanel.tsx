import React from 'react';
import { useSignature } from '../../context/SignatureContext';
import { LogoUploader } from './LogoUploader';
import { ColorPicker } from './ColorPicker';
import { SortableLayers } from '../Editor/SortableLayers';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { User, Phone, Globe, Linkedin, Instagram, Twitter, Palette, Layers } from 'lucide-react';

const MAX_LENGTHS = {
    fullName: 50,
    title: 50,
    company: 50,
    phone: 20,
    email: 50,
    website: 50,
    address: 100,
};

export const FormPanel: React.FC = () => {
    const { data, updateData } = useSignature();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (value.length <= (MAX_LENGTHS[name as keyof typeof MAX_LENGTHS] || 100)) {
            updateData({ [name]: value });
        }
    };

    const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updateData({
            socialLinks: {
                ...data.socialLinks,
                [name]: value,
            },
        });
    };

    return (
        <div className="flex flex-col h-full bg-white overflow-hidden">
            {/* Fixed Header */}
            <div className="p-6 pb-4 shrink-0 border-b border-gray-50">
                <h2 className="text-xl font-bold text-forest mb-1">Düzenleyici</h2>
                <p className="text-sm text-gray-500">İçerik ve stil ayarları</p>
            </div>

            {/* Tabs Container - Flex 1 to take remaining height */}
            <Tabs defaultValue="content" className="flex-1 flex flex-col min-h-0 w-full">

                {/* Fixed Tabs List */}
                <div className="px-6 py-4 shrink-0 bg-white z-10">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="content">İçerik</TabsTrigger>
                        <TabsTrigger value="style">Stil</TabsTrigger>
                        <TabsTrigger value="social">Sosyal</TabsTrigger>
                        <TabsTrigger value="layout"><Layers className="w-4 h-4" /></TabsTrigger>
                    </TabsList>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="px-6 pb-32 pt-2 space-y-6">

                        {/* --- CONTENT TAB --- */}
                        <TabsContent value="content" className="space-y-6 mt-0">

                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                                    <User className="w-4 h-4 text-lime" /> Kişisel Bilgiler
                                </h3>

                                <div className="space-y-3">
                                    <div className="grid gap-1.5">
                                        <Label htmlFor="fullName">Ad Soyad</Label>
                                        <Input
                                            id="fullName"
                                            name="fullName"
                                            value={data.fullName}
                                            onChange={handleChange}
                                            placeholder="Ad Soyad"
                                        />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="title">Unvan</Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            value={data.title}
                                            onChange={handleChange}
                                            placeholder="Örn. Proje Yöneticisi"
                                        />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="company">Şirket</Label>
                                        <Input
                                            id="company"
                                            name="company"
                                            value={data.company}
                                            onChange={handleChange}
                                            placeholder="Şirket Adı"
                                        />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-lime" /> İletişim
                                </h3>

                                <div className="space-y-3">
                                    <div className="grid gap-1.5">
                                        <Label htmlFor="phone">Telefon</Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            value={data.phone}
                                            onChange={handleChange}
                                            placeholder="+90 ..."
                                        />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="email">E-posta</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            value={data.email}
                                            onChange={handleChange}
                                            placeholder="mail@ornek.com"
                                        />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="website">Website</Label>
                                        <Input
                                            id="website"
                                            name="website"
                                            value={data.website}
                                            onChange={handleChange}
                                            placeholder="www.siteniz.com"
                                        />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="address">Adres</Label>
                                        <Input
                                            id="address"
                                            name="address"
                                            value={data.address}
                                            onChange={handleChange}
                                            placeholder="Tam adresiniz"
                                        />
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* --- STYLE TAB --- */}
                        <TabsContent value="style" className="space-y-6 mt-0">
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                                    <Palette className="w-4 h-4 text-lime" /> Görsel Kimlik
                                </h3>

                                <LogoUploader />

                                <Separator className="my-4" />

                                <ColorPicker />
                            </div>
                        </TabsContent>

                        {/* --- SOCIAL TAB --- */}
                        <TabsContent value="social" className="space-y-6 mt-0">
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-lime" /> Sosyal Medya
                                </h3>
                                <p className="text-xs text-gray-500 mb-4">Linkleri 'https://' ile başlayarak giriniz.</p>

                                <div className="space-y-3">
                                    <div className="grid gap-1.5">
                                        <Label htmlFor="linkedin" className="flex items-center gap-2"><Linkedin className="w-3 h-3" /> LinkedIn</Label>
                                        <Input
                                            id="linkedin"
                                            name="linkedin"
                                            value={data.socialLinks.linkedin}
                                            onChange={handleSocialChange}
                                            placeholder="linkedin.com/in/..."
                                        />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="twitter" className="flex items-center gap-2"><Twitter className="w-3 h-3" /> Twitter</Label>
                                        <Input
                                            id="twitter"
                                            name="twitter"
                                            value={data.socialLinks.twitter}
                                            onChange={handleSocialChange}
                                            placeholder="twitter.com/..."
                                        />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="instagram" className="flex items-center gap-2"><Instagram className="w-3 h-3" /> Instagram</Label>
                                        <Input
                                            id="instagram"
                                            name="instagram"
                                            value={data.socialLinks.instagram}
                                            onChange={handleSocialChange}
                                            placeholder="instagram.com/..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* --- LAYOUT TAB --- */}
                        <TabsContent value="layout" className="space-y-6 mt-0">
                            <SortableLayers />
                        </TabsContent>

                    </div>
                </div>
            </Tabs>
        </div>
    );
};
