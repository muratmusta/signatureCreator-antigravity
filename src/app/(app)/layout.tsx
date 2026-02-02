import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Dashboard - SignatureOS',
    description: 'Email imza projelerinizi yönetin, düzenleyin ve indirin.',
    robots: {
        index: false,
        follow: false,
    },
}

export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
