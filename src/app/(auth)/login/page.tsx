'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Link from 'next/link';
import { ArrowLeft, Loader2 as LoadingSpinner } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleGoogleLogin = async () => {
        setLoading(true);
        const supabase = createClient();

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            toast.error('Giriş yapılamadı: ' + error.message);
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-forest/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 -z-20"></div>

            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Link href="/" className="inline-flex items-center gap-3 font-bold text-2xl text-forest group">
                        <div className="w-12 h-12 bg-forest rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110">
                            <span className="text-2xl font-black">S</span>
                        </div>
                        <span className="tracking-tight text-3xl">SignatureOS</span>
                    </Link>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-10 border border-gray-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black mb-2 text-gray-900 tracking-tight">Hoş Geldiniz</h1>
                        <p className="text-gray-500 font-medium">
                            Başlamak için hesabınıza giriş yapın
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Button
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="w-full h-14 font-bold gap-3 bg-white text-gray-700 border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all rounded-2xl shadow-sm text-lg"
                            variant="outline"
                        >
                            {loading ? (
                                <LoadingSpinner size="sm" />
                            ) : (
                                <>
                                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Google ile Giriş Yap
                                </>
                            )}
                        </Button>

                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                        <p className="text-gray-500 font-medium text-sm">
                            Hesabınız yok mu?{' '}
                            <Link href="/register" className="text-forest font-bold hover:underline ml-1">
                                Ücretsiz Kayıt Ol
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Back Link */}
                <div className="mt-8 text-center animate-in fade-in duration-1000 delay-300">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 font-medium transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Ana sayfaya dön
                    </Link>
                </div>

                <p className="text-center text-[11px] text-gray-400 mt-12 leading-relaxed max-w-xs mx-auto">
                    Giriş yaparak{' '}
                    <Link href="/terms" className="underline hover:text-gray-600">Terimler</Link>
                    {' '}ve{' '}
                    <Link href="/privacy" className="underline hover:text-gray-600">Gizlilik</Link>
                    {' '}şartlarını kabul etmiş olursunuz.
                </p>
            </div>
        </div>
    );
}
