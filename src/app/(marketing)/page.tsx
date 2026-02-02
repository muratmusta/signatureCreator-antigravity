import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Marketing/Header";
import { MarketingCTA } from "@/components/Marketing/MarketingCTA";
import { ArrowRight, CheckCircle2, Zap, Shield, Layout, Users, Download, Sparkles } from "lucide-react";

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
            "priceCurrency": "TRY"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "10000"
        },
        "description": "Profesyonel email imza oluşturucu. Outlook, Gmail ve Apple Mail ile %100 uyumlu.",
        "url": "https://signatureos.com",
        "screenshot": "https://signatureos.com/og-image.png"
    };

    return (
        <>
            {/* JSON-LD Script */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans">
                {/* Header */}
                <Header />

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
                        <MarketingCTA
                            size="lg"
                            className="h-14 px-8 text-lg rounded-full transition-transform hover:scale-105 shadow-xl"
                        />
                        <span className="text-sm text-gray-400 font-medium">Kredi kartı gerekmez</span>
                    </div>

                    {/* Social Proof */}
                    <div className="mt-16 flex items-center justify-center gap-8 text-sm text-gray-500 flex-wrap">
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span><strong className="text-gray-900">10,000+</strong> profesyonel</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            <span><strong className="text-gray-900">50,000+</strong> indirme</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            <span><strong className="text-gray-900">4.9/5</strong> puan</span>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="mt-16 mx-auto max-w-5xl shadow-2xl rounded-2xl border border-gray-200 overflow-hidden bg-white relative group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10"></div>
                        <img
                            src="/images/hero-mockup.png"
                            alt="SignatureOS Editor Mockup"
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        />
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

                {/* Pricing Section */}
                <section id="pricing" className="py-24 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight mb-4">Basit, Şeffaf Fiyatlandırma</h2>
                            <p className="text-gray-500">Herkes için bir plan var.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {/* Free Tier */}
                            <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 shadow-sm">
                                <h3 className="text-2xl font-bold mb-2">Ücretsiz</h3>
                                <p className="text-gray-500 mb-6">Bireysel kullanıcılar için</p>
                                <div className="mb-6">
                                    <span className="text-5xl font-black">₺0</span>
                                    <span className="text-gray-500">/ay</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {["5 imza projesi", "10 şablon", "HTML indirme", "Temel destek"].map((f, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm">
                                            <CheckCircle2 className="w-5 h-5 text-forest" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/editor/new">
                                    <Button variant="outline" className="w-full">Ücretsiz Başla</Button>
                                </Link>
                            </div>

                            {/* Pro Tier */}
                            <div className="bg-forest text-white p-8 rounded-2xl border-2 border-forest shadow-xl relative overflow-hidden">
                                <div className="absolute top-4 right-4 bg-lime text-forest text-xs font-bold px-3 py-1 rounded-full">POPÜLER</div>
                                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                                <p className="text-white/80 mb-6">Profesyoneller ve ekipler için</p>
                                <div className="mb-6">
                                    <span className="text-5xl font-black">₺99</span>
                                    <span className="text-white/80">/ay</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {["Sınırsız proje", "Tüm şablonlar", "PDF/PNG export", "Öncelikli destek", "Ekip işbirliği", "API erişimi"].map((f, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm">
                                            <CheckCircle2 className="w-5 h-5 text-lime" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/register">
                                    <Button variant="secondary" className="w-full bg-white text-forest hover:bg-white/90">Pro'ya Geç</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-24 px-6 bg-gradient-to-br from-forest to-forest/90 text-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6">Profesyonel İmzanızı Bugün Oluşturun</h2>
                        <p className="text-xl text-white/80 mb-10">Dakikalar içinde başlayın. Kredi kartı gerekmez.</p>
                        <MarketingCTA
                            variant="secondary"
                            size="lg"
                            className="h-14 px-8 text-lg rounded-full shadow-xl"
                        />
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-100 py-12 px-6">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                        <p>© 2026 SignatureOS. Tüm hakları saklıdır.</p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <Link href="/privacy" className="hover:text-gray-900">Gizlilik</Link>
                            <Link href="/terms" className="hover:text-gray-900">Kullanım Şartları</Link>
                            <Link href="/contact" className="hover:text-gray-900">İletişim</Link>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
