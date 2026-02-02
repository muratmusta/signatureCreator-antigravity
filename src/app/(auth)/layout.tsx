import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Giriş Yap - SignatureOS',
    description: 'SignatureOS hesabınıza giriş yapın.',
    robots: {
        index: false,
        follow: false,
    },
}

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
