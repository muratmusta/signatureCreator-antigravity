import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Zap, Shield, Layout } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans">
            {/* Header */}
            <header className="px-6 h-20 flex items-center justify-between border-b border-gray-100 fixed width-full bg-white/80 backdrop-blur-md z-50 w-full top-0">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-forest rounded-lg flex items-center justify-center text-white font-bold shadow-sm">S</div>
                    <span className="font-bold text-xl tracking-tight text-gray-900">SignatureOS</span>
                </div>
                <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
                    <a href="#features" className="hover:text-forest transition-colors">Özellikler</a>
                    <a href="#pricing" className="hover:text-forest transition-colors">Fiyatlandırma</a>
                    <a href="#templates" className="hover:text-forest transition-colors">Şablonlar</a>
                </nav>
                <div className="flex gap-4">
                    <Link href="/dashboard">
                        <Button variant="ghost" className="text-gray-600">Giriş Yap</Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button className="bg-forest hover:bg-forest/90 text-white font-semibold shadow-lg shadow-forest/20">
                            Ücretsiz Başla
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 text-center lg:pt-48 lg:pb-32 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-forest/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

                <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
                    İşletmeniz için <span className="text-forest relative inline-block">
                        Profesyonel
                        <svg className="absolute w-full h-3 -bottom-1 left-0 text-forest/20" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" /></svg>
                    </span> <br /> Email İmzaları
                </h1>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Tasarımcıya ihtiyaç duymadan, saniyeler içinde kurumsal kalitede e-posta imzaları oluşturun. Outlook, Gmail ve Apple Mail ile %100 uyumlu.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/editor/new">
                        <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-gray-900 text-white hover:bg-black transition-transform hover:scale-105 shadow-xl">
                            Hemen Tasarlamaya Başla <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                    <span className="text-sm text-gray-400 font-medium">Kredi kartı gerekmez</span>
                </div>

                {/* Hero Image Mockup */}
                <div className="mt-16 mx-auto max-w-5xl shadow-2xl rounded-2xl border border-gray-200 overflow-hidden bg-white relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
                    <img src="https://placehold.co/1200x800/f8fafc/e2e8f0?text=SignatureOS+Editor+Interface" alt="Editor Preview" className="w-full h-auto" />
                    {/* Not: Gerçek screenshot buraya gelecek */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
                        <Link href="/editor/new">
                            <Button className="rounded-full shadow-2xl scale-125">Önizle</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 bg-gray-50/50 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Neden SignatureOS?</h2>
                        <p className="text-gray-500">Standartların ötesinde bir imza deneyimi.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Layout, title: "Sürükle & Bırak Editör", desc: "Kodlama bilmeden, blokları sürükleyerek hayalinizdeki tasarımı yaratın." },
                            { icon: Zap, title: "Anında HTML Üretimi", desc: "Tasarımınız anlık olarak optimize edilmiş HTML koduna dönüşür." },
                            { icon: Shield, title: "Kurumsal Standartlar", desc: "Tüm e-posta istemcileriyle uyumlu, spam filtrelerine takılmayan yapı." }
                        ].map((f, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center text-forest mb-6">
                                    <f.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>© 2026 SignatureOS. Tüm hakları saklıdır.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-gray-900">Gizlilik</a>
                        <a href="#" className="hover:text-gray-900">Kullanım Şartları</a>
                        <a href="#" className="hover:text-gray-900">İletişim</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
