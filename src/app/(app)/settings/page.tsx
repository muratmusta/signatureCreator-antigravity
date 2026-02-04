'use client';

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { OrganizationSettings } from '@/components/Settings/OrganizationSettings';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { Mail, User as UserIcon, Shield, LogOut, Building2, CreditCard, Bell, Sparkles, ChevronRight, CheckCircle2, Globe, PlusCircle, Globe2 } from 'lucide-react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';

export default function SettingsPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');
    const router = useRouter();
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const supabase = createClient();
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };
        getUser();
    }, []);

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        toast.success("Oturum kapatıldı.");
        router.push('/login');
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <LoadingSpinner size="lg" />
                <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Yükleniyor</p>
            </div>
        );
    }

    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Hesap Ayarları</h1>
                    <p className="text-sm font-medium text-gray-400 mt-1">Profilinizi, organizasyonunuzu ve aboneliğinizi buradan yönetin.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Navigation Sidebar */}
                    <aside className="w-full lg:w-64 shrink-0 space-y-1">
                        <NavButton
                            active={activeTab === 'profile'}
                            onClick={() => setActiveTab('profile')}
                            icon={<UserIcon className="w-4 h-4" />}
                            label="Profil"
                        />
                        <NavButton
                            active={activeTab === 'organization'}
                            onClick={() => setActiveTab('organization')}
                            icon={<Building2 className="w-4 h-4" />}
                            label="Organizasyon"
                        />
                        <NavButton
                            active={activeTab === 'domains'}
                            onClick={() => setActiveTab('domains')}
                            icon={<Globe2 className="w-4 h-4" />}
                            label="Özel Domain"
                        />
                        <NavButton
                            active={activeTab === 'subscription'}
                            onClick={() => setActiveTab('subscription')}
                            icon={<CreditCard className="w-4 h-4" />}
                            label="Abonelik"
                        />
                        <NavButton
                            active={activeTab === 'notifications'}
                            onClick={() => setActiveTab('notifications')}
                            icon={<Bell className="w-4 h-4" />}
                            label="Bildirimler"
                        />
                        <div className="h-px bg-gray-100 my-4" />
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-destructive hover:bg-destructive/5 rounded-lg transition-all"
                        >
                            <LogOut className="w-4 h-4" />
                            Oturumu Kapat
                        </button>
                    </aside>

                    {/* Content Area */}
                    <div className="flex-1 min-w-0">
                        {activeTab === 'profile' && (
                            <div className="space-y-10 animate-in fade-in duration-500">
                                <section className="space-y-6">
                                    <h2 className="text-xl font-bold text-gray-900 tracking-tight uppercase tracking-wider text-xs text-gray-400">Genel Bilgiler</h2>
                                    <div className="grid gap-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 ml-1">E-posta Adresi</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <input
                                                        disabled
                                                        value={user?.email || ''}
                                                        className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-400"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 ml-1">Hesap Durumu</label>
                                                <div className="h-11 px-4 bg-lime/10 border border-lime/20 rounded-lg flex items-center justify-between">
                                                    <span className="text-sm font-bold text-gray-900">Ücretsiz Plan</span>
                                                    <CheckCircle2 className="w-4 h-4 text-gray-900" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 ml-1">Kullanıcı ID (UID)</label>
                                            <div className="flex items-center gap-3">
                                                <code className="flex-1 h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center text-xs font-mono text-gray-400 overflow-hidden truncate">
                                                    {user?.id}
                                                </code>
                                                <Button variant="outline" className="h-11 px-4 rounded-lg font-bold text-xs hover:bg-black hover:text-white transition-all uppercase">Kopyala</Button>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <div className="h-px bg-gray-100" />

                                <section className="space-y-6">
                                    <h2 className="text-xl font-bold text-gray-900 tracking-tight uppercase tracking-wider text-xs text-gray-400">Güvenlik</h2>
                                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                                        <SecurityItem icon={<Shield className="w-5 h-5 text-gray-400" />} title="İki Faktörlü Doğrulama" desc="Ektra güvenlik katmanı ekleyin" />
                                        <SecurityItem icon={<Shield className="w-5 h-5 text-gray-400" />} title="Şifre Değiştir" desc="Hesap parolanızı güncelleyin" last />
                                    </div>
                                </section>

                                <div className="p-8 bg-destructive/5 rounded-2xl border border-destructive/10">
                                    <h3 className="text-destructive font-bold text-lg mb-2">Tehlikeli Bölge</h3>
                                    <p className="text-sm text-destructive/60 font-medium mb-6">Hesabınızı silmek kalıcı bir işlemdir. Lütfen dikkatli olun.</p>
                                    <Button variant="destructive" className="h-11 px-6 rounded-lg font-bold text-xs uppercase tracking-widest shadow-md">HESABI KALICI OLARAK SİL</Button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'organization' && (
                            <div className="animate-in fade-in duration-500">
                                <OrganizationSettings />
                            </div>
                        )}

                        {activeTab === 'domains' && (
                            <div className="animate-in fade-in duration-500 space-y-10">
                                <Card className="rounded-2xl border-dashed border-2 border-gray-200 bg-gray-50/50 p-12 text-center group hover:bg-white transition-all duration-500">
                                    <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110">
                                        <Globe className="w-7 h-7 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Alan Adı Bağlayın</h3>
                                    <p className="text-gray-400 text-sm font-medium max-w-sm mx-auto mb-8">Henüz bağlı bir alan adınız yok. Kurumsal bir görünüm için markanıza özel domain ekleyin.</p>

                                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                        <Button className="h-11 px-6 bg-black text-white hover:bg-gray-800 rounded-lg shadow-sm gap-2 font-bold text-xs">
                                            <PlusCircle className="w-4 h-4" /> ALAN ADI EKLE
                                        </Button>
                                        <Button variant="ghost" className="h-11 px-6 rounded-lg font-bold text-xs text-gray-400 hover:text-black transition-all">REHBERİ GÖRÜNTÜLE</Button>
                                    </div>
                                </Card>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <DomainFeature label="SSL Sertifikası" desc="Alt alan adlarınız için otomatik SSL koruması." />
                                    <DomainFeature label="Marka Kimliği" desc="Linklerde kendi domain isminizi kullanın." />
                                </div>
                            </div>
                        )}

                        {activeTab === 'subscription' && (
                            <div className="animate-in fade-in duration-500 space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <PlanCard
                                        name="STARTER"
                                        price="0"
                                        active={true}
                                        features={['3 Aktif Proje', 'Standart Şablonlar', 'Reklamlı İmza']}
                                    />
                                    <PlanCard
                                        name="ENTERPRISE"
                                        price="149"
                                        active={false}
                                        recommend
                                        features={['Sınırsız Proje', 'Özel Domain', 'Beyaz Etiket', 'Ekip Yönetimi']}
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="animate-in fade-in duration-500">
                                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                                    <div className="p-8 space-y-10">
                                        <NotificationToggle label="Email Raporları" description="Haftalık kullanım özetleri ve yenilikler." defaultChecked />
                                        <NotificationToggle label="Güvenlik Uyarıları" description="Hesap girişleri ve kritik uyarılar." defaultChecked />
                                        <NotificationToggle label="Sistem Duyuruları" description="Platform güncellemeleri ve bakım haberleri." />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

const NavButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
    <button
        onClick={onClick}
        className={`
            w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-bold transition-all
            ${active
                ? 'bg-black text-white shadow-md'
                : 'text-gray-500 hover:bg-gray-50'
            }
        `}
    >
        <div className="flex items-center gap-3">
            {icon}
            {label}
        </div>
        {active && <ChevronRight className="w-4 h-4 opacity-50" />}
    </button>
);

const SecurityItem = ({ icon, title, desc, last }: any) => (
    <div className={`p-6 flex items-center justify-between hover:bg-gray-50 transition-all cursor-pointer group ${!last && 'border-b border-gray-100'}`}>
        <div className="flex items-center gap-5">
            <div className="w-11 h-11 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                {icon}
            </div>
            <div>
                <p className="font-bold text-gray-900 text-sm">{title}</p>
                <p className="text-xs text-gray-400 font-medium">{desc}</p>
            </div>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-black transition-colors" />
    </div>
);

const DomainFeature = ({ label, desc }: any) => (
    <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">{label}</h4>
        <p className="text-xs text-gray-500 font-medium leading-relaxed">{desc}</p>
    </div>
);

const PlanCard = ({ name, price, features, active, recommend }: any) => (
    <Card className={`rounded-2xl p-8 relative flex flex-col h-full overflow-hidden transition-all ${active ? 'border-black ring-1 ring-black bg-white' : 'border-gray-100 bg-white hover:shadow-lg'}`}>
        {active && <div className="absolute top-0 right-0 px-4 py-1 bg-black text-white text-[10px] font-bold tracking-widest rounded-bl-xl">AKTİF</div>}
        {recommend && !active && <div className="absolute top-0 right-0 px-4 py-1 bg-lime text-black text-[10px] font-bold tracking-widest rounded-bl-xl uppercase">Önerilen</div>}

        <h3 className="text-lg font-bold text-gray-900 mb-6">{name}</h3>
        <div className="flex items-baseline gap-1 mb-8">
            <span className={`text-4xl font-extrabold tracking-tight ${active ? 'text-black' : 'text-gray-900'}`}>{price}₺</span>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">/ ay</span>
        </div>

        <ul className="space-y-4 mb-10 flex-1">
            {features.map((item: string) => (
                <li key={item} className="flex items-center gap-3 text-sm font-medium text-gray-500">
                    <CheckCircle2 className="w-4 h-4 text-lime" />
                    {item}
                </li>
            ))}
        </ul>

        <Button
            disabled={active}
            className={`w-full h-11 rounded-lg font-bold text-xs uppercase tracking-widest transition-all ${active ? 'bg-gray-100 text-gray-400' : 'bg-black text-white hover:bg-gray-800'}`}
        >
            {active ? 'MEVCUT PLANINIZ' : 'Hemen Yükselt'}
        </Button>
    </Card>
);

const NotificationToggle = ({ label, description, defaultChecked }: { label: string, description: string, defaultChecked?: boolean }) => (
    <div className="flex items-center justify-between group">
        <div className="flex-1 pr-10">
            <p className="font-bold text-gray-900 text-sm mb-1">{label}</p>
            <p className="text-xs text-gray-400 font-medium">{description}</p>
        </div>
        <div className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-all duration-300 ${defaultChecked ? 'bg-lime' : 'bg-gray-200'}`}>
            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${defaultChecked ? 'translate-x-5' : 'translate-x-0'}`} />
        </div>
    </div>
);
