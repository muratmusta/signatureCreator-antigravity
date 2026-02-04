import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Marketing/Header";
import { MarketingCTA } from "@/components/Marketing/MarketingCTA";
import {
    ArrowRight,
    CheckCircle2,
    Zap,
    Shield,
    Layout,
    Users,
    Download,
    Sparkles,
    MousePointer2
} from "lucide-react";

export default function LandingPage() {
    // JSON-LD Structured Data for SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "SignatureOS",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "10000"
        },
        "description": "Professional email signature generator. 100% compatible with Outlook, Gmail, and Apple Mail.",
        "url": "https://signatureos.com"
    };

    return (
        <div className="min-h-screen bg-[#F2F5F7] text-[#163300] font-sans selection:bg-[#9FE870] selection:text-[#163300]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Header />

            <main>
                {/* HERO SECTION */}
                <section className="relative pt-32 pb-20 lg:pt-56 lg:pb-32 px-6 overflow-hidden">
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center max-w-4xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#163300]/5 border border-[#163300]/10 mb-8 animate-fade-in shadow-sm">
                                <Sparkles className="w-4 h-4 text-[#163300]" />
                                <span className="text-[10px] font-black uppercase tracking-[0.34em]">Lider İmza Platformu</span>
                            </div>

                            <h1 className="text-6xl md:text-[6rem] font-black tracking-tighter leading-[0.9] mb-12">
                                E-posta İmzalarınızda <br />
                                <span className="text-white bg-[#163300] px-6 py-2 rounded-2xl inline-block mt-2 transform -rotate-1 shadow-xl">Kusursuzluk</span> Ara.
                            </h1>

                            <p className="text-xl md:text-2xl text-[#64748b] max-w-2xl mx-auto mb-16 leading-relaxed font-medium">
                                Tasarım kodlamaya, manuel güncellemelere son. <br />
                                Tüm ekibinizin imzasını saniyeler içinde, bulutta yönetin.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                <MarketingCTA
                                    size="lg"
                                    className="h-20 px-12 text-xl rounded-full shadow-neon scale-110"
                                />
                                <div className="flex -space-x-3 items-center ml-4">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-[#F2F5F7] bg-gray-200 overflow-hidden shadow-sm">
                                            <img src={`https://i.pravatar.cc/100?u=sig${i}`} alt="user" />
                                        </div>
                                    ))}
                                    <div className="pl-6 text-sm font-black uppercase tracking-widest text-[#64748b]">10K+ Kullanıcı</div>
                                </div>
                            </div>
                        </div>

                        {/* MOCKUP CONTAINER */}
                        <div className="mt-24 relative max-w-6xl mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#F2F5F7] via-transparent to-transparent z-20 h-40 bottom-0 top-auto"></div>
                            <div className="bg-[#163300] rounded-[3rem] p-4 shadow-lift overflow-hidden border border-[#163300]/10 relative group">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-[#9FE870]/50 to-transparent"></div>
                                <img
                                    src="/images/hero-mockup.png"
                                    alt="SignatureOS Dashboard Mockup"
                                    className="w-full h-auto rounded-[2.5rem] shadow-2xl transition-transform duration-1000 group-hover:scale-[1.02]"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* FEATURES SECTION */}
                <section className="py-32 bg-white relative">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-24">
                            <div className="max-w-2xl">
                                <div className="text-[#9FE870] font-black uppercase tracking-[0.4em] text-xs mb-6">Neden Bizi Seçmelisiniz?</div>
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-[#163300]">
                                    Güçlü Özellikler, <br />Sanal Basitlik.
                                </h2>
                            </div>
                            <p className="text-xl text-[#64748b] max-w-sm font-medium leading-relaxed">
                                Karmaşık kodlarla vakit kaybetmeyin. Profesyonel görünümü standartlaştırın.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Layout,
                                    title: "Görsel Editör",
                                    desc: "Sürükle bırak kolaylığıyla kod yazmadan mükemmel imzalar tasarlayın.",
                                    tag: "Kolay",
                                    color: "bg-blue-500"
                                },
                                {
                                    icon: Zap,
                                    title: "Sanal Dağıtım",
                                    desc: "Ekiplerinize imzaları merkezi bir panelden, anında servis edin.",
                                    tag: "Hızlı",
                                    color: "bg-[#9FE870]"
                                },
                                {
                                    icon: Shield,
                                    title: "Tam Uyum",
                                    desc: "Gmail, Outlook ve Apple Mail'de her zaman mükemmel görünen yapılar.",
                                    tag: "Güvenli",
                                    color: "bg-[#163300]"
                                }
                            ].map((feature, i) => (
                                <div key={i} className="group p-12 rounded-[2.5rem] bg-[#F2F5F7] border border-transparent hover:border-[#163300]/10 transition-all duration-500 hover:shadow-glow">
                                    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-10 shadow-sm group-hover:scale-110 transition-transform">
                                        <feature.icon className="w-8 h-8 text-[#163300]" />
                                    </div>
                                    <div className="inline-block px-3 py-1 rounded-full bg-white text-[10px] font-black uppercase tracking-widest mb-4 shadow-sm">
                                        {feature.tag}
                                    </div>
                                    <h3 className="text-3xl font-black mb-4 tracking-tighter">{feature.title}</h3>
                                    <p className="text-[#64748b] leading-relaxed font-medium text-lg">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PRICING TABLE - CLEAN VERSION */}
                <section className="py-32 px-6 bg-[#F2F5F7]">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-24">
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">Şeffaf Planlar.</h2>
                            <p className="text-[#64748b] font-bold uppercase tracking-[0.2em] text-xs">Gizli ücret yok, her zaman iptal edilebilir.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                            {/* Free */}
                            <div className="bg-white p-12 rounded-[3rem] border border-white shadow-card hover:shadow-xl transition-all flex flex-col items-center">
                                <h3 className="text-xl font-black uppercase tracking-[0.3em] mb-10 text-[#64748b]">Bireysel</h3>
                                <div className="mb-12 text-center">
                                    <span className="text-7xl font-black tracking-tighter">$0</span>
                                    <span className="text-[#64748b] font-bold text-sm block mt-2">SONSUZA KADAR ÜCRETSİZ</span>
                                </div>
                                <ul className="space-y-6 mb-12 w-full">
                                    {["1 İmza Projesi", "Standard Şablonlar", "Mobil Uyumlu", "Topluluk Desteği"].map((f, i) => (
                                        <li key={i} className="flex items-center gap-4 text-sm font-bold text-[#64748b]">
                                            <CheckCircle2 className="w-5 h-5 text-[#163300]" /> {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/editor/new" className="w-full">
                                    <Button variant="outline" className="w-full h-16 rounded-full border-2 border-[#163300]/10 hover:border-[#163300] font-black tracking-widest text-xs transition-all uppercase">HEMEN BAŞLA</Button>
                                </Link>
                            </div>

                            {/* Pro */}
                            <div className="bg-[#163300] p-12 rounded-[3rem] shadow-2xl relative flex flex-col items-center group overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-[#9FE870]/20 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-[#9FE870]/30 transition-colors"></div>
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#9FE870] text-[#163300] text-[10px] font-black px-6 py-2 rounded-full shadow-lg z-20">EN POPÜLER</div>

                                <h3 className="text-xl font-black uppercase tracking-[0.3em] mb-10 text-[#9FE870]">PRO / EKİP</h3>
                                <div className="mb-12 text-center relative z-10">
                                    <span className="text-7xl font-black tracking-tighter text-white">$12</span>
                                    <span className="text-white/50 font-bold text-sm block mt-2">AYLIK / KULLANICI BAŞI</span>
                                </div>
                                <ul className="space-y-6 mb-12 w-full relative z-10">
                                    {["Sınırsız Proje", "Premium Şablonlar", "Organization Yönetimi", "Öncelikli Destek", "Markasız Kullanım"].map((f, i) => (
                                        <li key={i} className="flex items-center gap-4 text-sm font-bold text-white/80">
                                            <CheckCircle2 className="w-5 h-5 text-[#9FE870]" /> {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/register" className="w-full relative z-10">
                                    <Button className="w-full h-16 rounded-full bg-[#9FE870] text-[#163300] hover:bg-white hover:text-[#163300] font-black tracking-widest text-xs transition-all uppercase shadow-lg">PRO'YA GEÇ</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FINAL SECTION */}
                <section className="py-40 bg-[#163300] relative overflow-hidden text-center text-white">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-50"></div>
                    <div className="max-w-4xl mx-auto relative z-10 px-6">
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-12 italic leading-none text-[#9FE870]">Mesajınızı <br />Güçlendirin.</h2>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <MarketingCTA size="lg" className="h-20 px-12 text-xl rounded-full bg-white text-[#163300] hover:bg-[#9FE870]" />
                            <Link href="/">
                                <Button variant="ghost" className="h-20 px-10 text-xl rounded-full text-white/60 hover:text-white hover:bg-white/10 group">
                                    Daha Fazla Bilgi <ArrowRight className="ml-3 w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="py-20 border-t border-[#163300]/10 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#163300] flex items-center justify-center font-black text-[#9FE870]">S</div>
                        <span className="text-2xl font-black tracking-tighter uppercase">SignatureOS</span>
                    </div>
                    <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-[#64748b]">
                        <Link href="/privacy" className="hover:text-[#163300] transition-colors">Gizlilik</Link>
                        <Link href="/terms" className="hover:text-[#163300] transition-colors">Şartlar</Link>
                        <Link href="/contact" className="hover:text-[#163300] transition-colors">İletişim</Link>
                    </div>
                    <p className="text-xs font-bold text-[#64748b]/50 tracking-tighter">© 2026 SignatureOS. PREMIUM QUALITY GUARANTEED.</p>
                </div>
            </footer>
        </div>
    );
}
