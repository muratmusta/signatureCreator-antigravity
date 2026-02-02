import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'SignatureOS - Profesyonel Email İmzaları',
    description: 'Tasarımcıya ihtiyaç duymadan, saniyeler içinde kurumsal kalitede e-posta imzaları oluşturun. Outlook, Gmail ve Apple Mail ile %100 uyumlu.',
    keywords: ['email imzası', 'e-posta imzası', 'profesyonel imza', 'email signature', 'imza oluşturucu', 'signature generator'],
    authors: [{ name: 'SignatureOS' }],
    creator: 'SignatureOS',
    publisher: 'SignatureOS',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'tr_TR',
        url: 'https://signatureos.com',
        title: 'SignatureOS - Profesyonel Email İmzaları',
        description: 'Tasarımcıya ihtiyaç duymadan, saniyeler içinde kurumsal kalitede e-posta imzaları oluşturun.',
        siteName: 'SignatureOS',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'SignatureOS - Email İmza Oluşturucu',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SignatureOS - Profesyonel Email İmzaları',
        description: 'Tasarımcıya ihtiyaç duymadan, saniyeler içinde kurumsal kalitede e-posta imzaları oluşturun.',
        images: ['/og-image.png'],
    },
    alternates: {
        canonical: 'https://signatureos.com',
    },
    verification: {
        google: 'your-google-verification-code',
    },
}

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
