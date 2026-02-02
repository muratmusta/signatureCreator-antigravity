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
        <div className="flex h-screen w-full overflow-hidden bg-white text-gray-900 font-sans selection:bg-lime selection:text-black">

            {/* Sidebar (Form Panel) */}
            <aside className={`
                w-full md:w-[400px] shrink-0 border-r border-gray-100 bg-white flex flex-col z-20 h-full 
                absolute md:relative transition-transform duration-300 ease-in-out
                ${activeTab === 'edit' ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                shadow-2xl md:shadow-none
            `}>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {sidebarContent}
                </div>
            </aside>

            {/* Main Content (Preview Canvas) */}
            <div className={`
                flex-1 flex flex-col min-w-0 bg-gray-50/50 relative
                ${activeTab === 'preview' ? 'flex' : 'hidden md:flex'}
            `}>
                {/* Header */}
                <header className="h-20 border-b border-gray-100 bg-white flex items-center z-30 sticky top-0 px-2 shrink-0">
                    {headerContent}
                </header>

                {/* Canvas Area */}
                <main className="flex-1 relative overflow-hidden flex flex-col items-center justify-center p-4">
                    {mainContent}
                </main>
            </div>

            {/* Mobile Navigation Tab Bar */}
            <div className="md:hidden fixed bottom-6 left-6 right-6 bg-black rounded-xl p-1.5 flex gap-1 h-14 z-50 shadow-2xl">
                <button
                    onClick={() => onTabChange('edit')}
                    className={`
                        flex-1 rounded-lg flex items-center justify-center gap-2 transition-all
                        ${activeTab === 'edit' ? 'bg-white text-black shadow-sm' : 'text-gray-400'}
                    `}
                >
                    <span className="text-[11px] font-bold uppercase tracking-widest">DÜZENLE</span>
                </button>
                <button
                    onClick={() => onTabChange('preview')}
                    className={`
                        flex-1 rounded-lg flex items-center justify-center gap-2 transition-all
                        ${activeTab === 'preview' ? 'bg-white text-black shadow-sm' : 'text-gray-400'}
                    `}
                >
                    <span className="text-[11px] font-bold uppercase tracking-widest">ÖNİZLE</span>
                </button>
            </div>
        </div>
    );
};
