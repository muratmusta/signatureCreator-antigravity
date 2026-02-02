'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    // Magic Link Login
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`,
                },
            });

            if (error) throw error;
            toast.success("Giriş bağlantısı e-posta adresinize gönderildi!");
        } catch (error: any) {
            toast.error("Giriş hatası: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Anonymous Login (Guest)
    const handleGuest = async () => {
        setLoading(true);

        try {
            const { error } = await supabase.auth.signInAnonymously();
            if (error) {
                console.warn("Supabase Anon Auth failed, falling back to local guest mode.");
                // Fallback: Set a cookie manually to bypass middleware
                document.cookie = "signature-guest-mode=true; path=/; max-age=31536000"; // 1 year

                toast.success("Misafir modu (Çevrimdışı) aktif edildi.");
                router.refresh();
                router.push('/dashboard');
            } else {
                toast.success("Misafir olarak giriş yapılıyor...");
                router.refresh();
                router.push('/dashboard');
            }
        } catch (e) {
            toast.error("Bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-forest rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-sm">S</div>
                    <h1 className="text-2xl font-bold text-gray-900">Hoş Geldiniz</h1>
                    <p className="text-gray-500 mt-2">SignatureOS dünyasına adım atın.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Adresi</label>
                        <Input
                            type="email"
                            placeholder="ornek@sirket.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-11"
                        />
                    </div>
                    <Button type="submit" className="w-full h-11 font-semibold" disabled={loading}>
                        {loading ? 'Gönderiliyor...' : 'Giriş Bağlantısı Gönder'}
                    </Button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-500">Veya</span></div>
                </div>

                <Button variant="outline" className="w-full h-11" onClick={handleGuest} disabled={loading}>
                    Misafir Olarak Devam Et
                </Button>

                <p className="text-center text-xs text-muted-foreground mt-6">
                    Giriş yaparak <Link href="#" className="underline">Kullanım Şartları</Link>'nı kabul etmiş olursunuz.
                </p>
            </div>
        </div>
    );
}
