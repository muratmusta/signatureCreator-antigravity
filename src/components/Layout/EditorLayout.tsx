'use client';

import React from 'react';

interface EditorLayoutProps {
    sidebarContent: React.ReactNode; // Middle panel (Form)
    toolbarContent: React.ReactNode; // Left thin sidebar
    headerContent: React.ReactNode;
    mainContent: React.ReactNode;    // Right preview panel
}

export const EditorLayout: React.FC<EditorLayoutProps> = ({
    sidebarContent,
    toolbarContent,
    headerContent,
    mainContent,
}) => {
    return (
        <div className="flex flex-col h-screen w-full overflow-hidden bg-slate-50/50">
            {/* Fixed Header */}
            <header className="h-16 workbench-header shrink-0 shadow-sm z-50">
                {headerContent}
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Panel: Thin Toolbar */}
                <aside className="w-[72px] shrink-0 border-r border-border/50 bg-white flex flex-col items-center py-6 gap-4 z-40">
                    {toolbarContent}
                </aside>

                {/* Middle Panel: Form Fields */}
                <aside className="w-[450px] shrink-0 border-r border-border/50 bg-white flex flex-col z-30 shadow-[4px_0_24px_-4px_rgba(0,0,0,0.02)]">
                    <div className="flex-1 overflow-y-auto scrollbar-hide">
                        {sidebarContent}
                    </div>
                </aside>

                {/* Right Panel: Live Preview (Workbench Canvas) */}
                <main className="flex-1 relative overflow-hidden bg-slate-100/50 flex flex-col items-center justify-center">
                    {mainContent}
                </main>
            </div>
        </div>
    );
};
