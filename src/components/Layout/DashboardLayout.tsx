import React from 'react';
import Link from 'next/link';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children
}) => {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-background text-foreground font-sans">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card">
                <div className="p-6 border-b border-border">
                    <div className="flex items-center gap-2 font-bold text-xl text-forest">
                        <div className="w-8 h-8 bg-forest rounded-lg flex items-center justify-center text-white text-lg shadow-sm">S</div>
                        SignatureOS
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground group transition-colors">
                        <span className="w-5 h-5 flex items-center justify-center">🏠</span>
                        Projelerim
                    </Link>
                    <Link href="/editor/new" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground group transition-colors">
                        <span className="w-5 h-5 flex items-center justify-center">✨</span>
                        Yeni Oluştur
                    </Link>
                </nav>

                <div className="p-4 border-t border-border">
                    <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">U</div>
                        <div className="flex flex-col">
                            <span className="text-foreground">Kullanıcı</span>
                            <span className="text-xs">Misafir</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-muted/10 relative">
                {children}
            </main>

        </div>
    );
};
