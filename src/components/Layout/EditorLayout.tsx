'use client';

import React from 'react';

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
        <div className="flex h-screen w-full overflow-hidden bg-background text-foreground font-sans selection:bg-[#9FE870] selection:text-[#163300]">

            {/* Sidebar (Form Panel) - Refined Wise Card style */}
            <aside className={`
                w-full md:w-[420px] shrink-0 border-r border-border bg-white flex flex-col z-20 h-full 
                absolute md:relative transition-transform duration-300 ease-in-out
                ${activeTab === 'edit' ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                shadow-2xl md:shadow-none
            `}>
                <div className="flex-1 overflow-y-auto scrollbar-thin">
                    {sidebarContent}
                </div>
            </aside>

            {/* Main Content (Preview Canvas) */}
            <div className={`
                flex-1 flex flex-col min-w-0 bg-[#F2F5F7] relative
                ${activeTab === 'preview' ? 'flex' : 'hidden md:flex'}
            `}>
                {/* Header - Forest Style */}
                <header className="h-16 bg-[#163300] border-b border-white/10 flex items-center z-30 sticky top-0 px-2 shrink-0 shadow-md">
                    {headerContent}
                </header>

                {/* Canvas Area */}
                <main className="flex-1 relative overflow-hidden flex flex-col items-center justify-center">
                    {mainContent}
                </main>
            </div>

            {/* Mobile Navigation Tab Bar - Refined Wise Style */}
            <div className="md:hidden fixed bottom-6 left-6 right-6 bg-forest rounded-2xl p-1.5 flex gap-1 h-14 z-50 shadow-2xl border border-white/10">
                <button
                    onClick={() => onTabChange('edit')}
                    className={`
                        flex-1 rounded-xl flex items-center justify-center gap-2 transition-all
                        ${activeTab === 'edit' ? 'bg-lime text-forest shadow-glow-sm' : 'text-white/60'}
                    `}
                >
                    <span className="text-[11px] font-extrabold uppercase tracking-widest">DÜZENLE</span>
                </button>
                <button
                    onClick={() => onTabChange('preview')}
                    className={`
                        flex-1 rounded-xl flex items-center justify-center gap-2 transition-all
                        ${activeTab === 'preview' ? 'bg-lime text-forest shadow-glow-sm' : 'text-white/60'}
                    `}
                >
                    <span className="text-[11px] font-extrabold uppercase tracking-widest">ÖNİZLE</span>
                </button>
            </div>
        </div>
    );
};
