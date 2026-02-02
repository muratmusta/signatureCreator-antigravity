'use client';

import React, { useRef, useEffect } from 'react';

interface EditorLayoutProps {
    sidebarContent: React.ReactNode;
    headerContent: React.ReactNode;
    mainContent: React.ReactNode;
    activeTab: 'edit' | 'preview';
    onTabChange: (tab: 'edit' | 'preview') => void;
}

export const EditorLayout: React.FC<EditorLayoutProps> = ({
    sidebarContent,
    headerContent,
    mainContent,
    activeTab,
    onTabChange
}) => {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-background text-foreground font-sans">
            {/* Desktop Sidebar - Fixed Width */}
            <aside className={`
        w-full md:w-[360px] lg:w-[400px] shrink-0 border-r border-border bg-card flex flex-col z-20 h-full absolute md:relative transition-transform duration-300 shadow-xl md:shadow-none
        ${activeTab === 'edit' ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
                {sidebarContent}
            </aside>

            {/* Main Content Area */}
            <div className={`
        flex-1 flex flex-col min-w-0 bg-[#F8FAFC] relative
        ${activeTab === 'preview' ? 'block' : 'hidden md:flex'}
      `}>
                {/* Header */}
                <header className="h-14 px-6 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between z-10 sticky top-0">
                    {headerContent}
                </header>

                {/* Canvas Wrapper - Dot Pattern Background */}
                <main className="flex-1 relative overflow-hidden flex flex-col items-center justify-center p-8 bg-dot-pattern">
                    <div className="absolute inset-0 z-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
                    {mainContent}
                </main>
            </div>

            {/* Ultra-Mobile Tab Bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-2 flex gap-2 h-16 z-50">
                <button
                    onClick={() => onTabChange('edit')}
                    className={`flex-1 rounded-lg flex flex-col items-center justify-center gap-1 ${activeTab === 'edit' ? 'text-primary bg-primary/10 font-bold' : 'text-muted-foreground'}`}
                >
                    <span className="text-xs">Düzenle</span>
                </button>
                <button
                    onClick={() => onTabChange('preview')}
                    className={`flex-1 rounded-lg flex flex-col items-center justify-center gap-1 ${activeTab === 'preview' ? 'text-primary bg-primary/10 font-bold' : 'text-muted-foreground'}`}
                >
                    <span className="text-xs">Önizle</span>
                </button>
            </div>
        </div>
    );
};
