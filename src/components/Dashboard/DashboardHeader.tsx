"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserMenu } from "@/components/Dashboard/UserMenu";
import { useSearch } from "@/context/SearchContext";

export function DashboardHeader() {
    const { searchQuery, setSearchQuery } = useSearch();

    return (
        <header className="h-16 bg-primary border-b border-white/5 sticky top-0 z-40 shrink-0">
            <div className="h-full flex items-center justify-between px-6 gap-6">
                {/* Left: Mobile Sidebar Toggle */}
                <div className="flex items-center gap-3 shrink-0 lg:hidden">
                    <SidebarTrigger className="text-white hover:bg-white/10 rounded-lg" />
                </div>

                {/* Center: Search Bar - Refined Width & Alignment */}
                <div className="flex-1 flex items-center justify-center px-4 h-full">
                    <div className="relative w-full max-w-md group flex items-center h-full">
                        <Search className="absolute left-4 w-4 h-4 text-white/40 group-focus-within:text-secondary transition-colors pointer-events-none z-10" />
                        <input
                            type="text"
                            placeholder="Tasarım ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:ring-2 focus:ring-secondary/20 focus:border-secondary focus:bg-white/10 w-full h-10 pl-11 pr-4 rounded-xl transition-all outline-none text-sm font-medium"
                        />
                    </div>
                </div>

                {/* Right: Actions & Profile */}
                <div className="flex items-center gap-2 shrink-0 h-full">
                    {/* Notifications - Cleaned up */}
                    <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/10 rounded-xl h-10 w-10 transition-all">
                        <Bell className="w-5 h-5" />
                    </Button>

                    <div className="h-6 w-px bg-white/10 mx-1" />

                    {/* User Menu */}
                    <UserMenu />
                </div>
            </div>
        </header>
    );
}
