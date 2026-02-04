import React, { useState } from 'react';
import { useOrganization } from '@/lib/hooks/useOrganization';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Users, Plus, Shield, LogOut, Building2, Mail, ExternalLink, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export function OrganizationSettings() {
    const { organization, members, role, loading, createOrganization, leaveOrganization, inviteMember } = useOrganization();
    const [newOrgName, setNewOrgName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    // Invite State
    const [showInvite, setShowInvite] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [isInviting, setIsInviting] = useState(false);

    const handleCreate = async () => {
        if (!newOrgName.trim()) {
            toast.error('Lütfen bir isim girin.');
            return;
        }
        setIsCreating(true);
        await createOrganization(newOrgName);
        setIsCreating(false);
    };

    const handleInvite = async () => {
        if (!inviteEmail.trim()) return;
        setIsInviting(true);
        await inviteMember(inviteEmail);
        setIsInviting(false);
        setInviteEmail('');
        setShowInvite(false);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-24">
                <LoadingSpinner size="lg" />
                <p className="mt-4 text-[10px] font-black text-gray-400 tracking-widest uppercase">Organizasyon Verileri Alınıyor</p>
            </div>
        );
    }

    if (!organization) {
        return (
            <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-700">
                <Card className="rounded-[40px] border-dashed border-2 bg-white/50 overflow-hidden group hover:bg-white transition-all duration-500">
                    <CardHeader className="p-12 pb-6">
                        <div className="w-16 h-16 bg-forest/5 rounded-2xl flex items-center justify-center mb-6 border border-forest/5 group-hover:scale-110 transition-transform duration-500">
                            <Building2 className="w-8 h-8 text-forest" />
                        </div>
                        <CardTitle className="text-3xl font-black text-gray-900 tracking-tight">Ekipler İçin SignatureOS</CardTitle>
                        <CardDescription className="text-lg font-medium text-gray-500 leading-relaxed max-w-xl">
                            Takımınızla birlikte çalışmak, kurumsal şablonları paylaşmak ve tüm imzaları tek bir panelden yönetmek için bir organizasyon oluşturun.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-12 pt-0">
                        <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
                            <input
                                placeholder="Organizasyon Adı (örn: Acme Studio)"
                                value={newOrgName}
                                onChange={(e) => setNewOrgName(e.target.value)}
                                className="flex-1 h-14 px-6 bg-white border border-gray-100 rounded-2xl text-sm font-bold shadow-sm outline-none focus:ring-4 focus:ring-forest/5 focus:border-forest transition-all"
                            />
                            <Button onClick={handleCreate} disabled={isCreating} className="h-14 px-8 bg-forest text-white hover:bg-forest/90 font-black text-xs tracking-widest rounded-2xl shadow-premium-xl transition-all active:scale-95">
                                {isCreating ? <LoadingSpinner size="sm" /> : 'BAŞLAT'}
                            </Button>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-gray-50">
                            <Features label="ORTAK ŞABLONLAR" desc="Kurumsal kimliğinize uygun tasarımları tüm ekiple paylaşın." />
                            <Features label="MERKEZİ YÖNETİM" desc="Tüm imzaları tek bir yerden kontrol edin ve güncelleyin." />
                            <Features label="YETKİLENDİRME" desc="Admin ve üye rolleri ile erişimi profesyonelce yönetin." />
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Main Info Card */}
            <div className="relative p-12 bg-white border border-gray-100 rounded-[40px] shadow-premium overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                    <Building2 className="w-64 h-64 text-forest" />
                </div>

                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="px-4 py-1.5 bg-forest text-white text-[10px] font-black rounded-full tracking-widest uppercase">
                                    {role === 'admin' ? 'YÖNETİCİ' : 'ÜYE'}
                                </span>
                                <span className="h-1 w-1 bg-gray-200 rounded-full" />
                                <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">{members.length} AKTİF ÜYE</span>
                            </div>
                            <h2 className="text-4xl font-black text-gray-900 tracking-tight">{organization.name}</h2>
                            <div className="flex items-center gap-2 group cursor-pointer">
                                <span className="text-xs font-mono text-gray-400 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 group-hover:bg-gray-100 transition-colors">{organization.id}</span>
                                <ExternalLink className="w-3.5 h-3.5 text-gray-300" />
                            </div>
                        </div>

                        {role === 'admin' && (
                            <Button
                                className="h-14 px-8 bg-forest text-white hover:bg-forest/90 font-black text-xs tracking-widest rounded-2xl shadow-premium-xl gap-3 transition-all active:scale-95 group"
                                onClick={() => setShowInvite(!showInvite)}
                            >
                                <Plus className={`w-4 h-4 transition-transform duration-500 ${showInvite ? 'rotate-45' : ''}`} />
                                YENİ ÜYE DAVET ET
                            </Button>
                        )}
                    </div>

                    {/* Invite Form */}
                    {showInvite && (
                        <div className="bg-[#F9FAFB] border border-gray-100 rounded-[32px] p-8 animate-in slide-in-from-top-4 duration-500 mb-8">
                            <h4 className="font-black text-xs text-forest tracking-widest uppercase mb-4">Üye Daveti Gönder</h4>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="relative flex-1">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    <input
                                        placeholder="E-posta adresi"
                                        value={inviteEmail}
                                        onChange={(e) => setInviteEmail(e.target.value)}
                                        className="w-full h-14 pl-14 pr-6 bg-white border border-gray-100 rounded-2xl text-sm font-bold shadow-sm outline-none focus:ring-4 focus:ring-lime/10 transition-all"
                                    />
                                </div>
                                <Button onClick={handleInvite} disabled={isInviting} className="h-14 px-10 bg-lime text-forest hover:bg-forest hover:text-white font-black text-xs tracking-widest rounded-2xl shadow-lg transition-all active:scale-95">
                                    {isInviting ? <LoadingSpinner size="sm" /> : 'DAVET LİNKİ OLUŞTUR'}
                                </Button>
                            </div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-4 ml-1 opacity-60">Davet linki otomatik olarak panoya kopyalanacaktır.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Members Section */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 ml-4">
                    <Users className="w-4 h-4 text-gray-300" />
                    <h3 className="text-xs font-black text-gray-400 tracking-widest uppercase">TAKIM ÜYELERİ</h3>
                </div>

                <div className="grid gap-4">
                    {members.map((member) => (
                        <div key={member.user_id} className="group p-6 bg-white border border-gray-100 rounded-[32px] flex items-center justify-between hover:shadow-premium transition-all duration-500">
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shadow-inner group-hover:scale-105 transition-transform duration-500">
                                        {member.profiles?.avatar_url ? (
                                            <img src={member.profiles.avatar_url} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-xl font-black text-gray-300">
                                                {(member.profiles?.full_name || 'U')[0].toUpperCase()}
                                            </span>
                                        )}
                                    </div>
                                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-lg flex items-center justify-center border-2 border-white shadow-sm ${member.role === 'admin' ? 'bg-forest' : 'bg-gray-200'}`}>
                                        <Shield className={`w-3 h-3 ${member.role === 'admin' ? 'text-white' : 'text-gray-400'}`} />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-black text-gray-900 tracking-tight flex items-center gap-2 text-lg">
                                        {member.profiles?.full_name || 'İsimsiz Kullanıcı'}
                                        {member.role === 'admin' && <CheckCircle2 className="w-4 h-4 text-lime" />}
                                    </div>
                                    <div className="text-sm text-gray-400 font-bold tracking-tight">
                                        {member.profiles?.email || member.user_id}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Button variant="ghost" className="h-10 px-4 rounded-xl font-bold text-gray-400 hover:text-forest transition-all">Düzenle</Button>
                                {role === 'admin' && member.user_id !== organization.id /* Simplistic */ && (
                                    <Button variant="ghost" className="h-10 px-4 rounded-xl font-bold text-destructive hover:bg-destructive/5 transition-all">Kaldır</Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Leave Action */}
            <div className="pt-8 border-t border-gray-100">
                <button
                    onClick={leaveOrganization}
                    className="flex items-center gap-3 px-6 py-4 rounded-2xl text-xs font-black text-destructive hover:bg-destructive/5 transition-all tracking-widest uppercase"
                >
                    <LogOut className="w-4 h-4" />
                    {role === 'admin' && members.length === 1 ? 'ORGANİZASYONU KALICI OLARAK SİL' : 'ORGANİZASYONDAN AYRIL'}
                </button>
            </div>
        </div>
    );
}

const Features = ({ label, desc }: any) => (
    <div className="space-y-3">
        <h4 className="text-[10px] font-black text-forest tracking-[0.2em] uppercase">{label}</h4>
        <p className="text-xs text-gray-400 font-bold leading-relaxed">{desc}</p>
    </div>
);
