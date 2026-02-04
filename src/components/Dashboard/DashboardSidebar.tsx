"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Sparkles,
    LayoutGrid,
    FolderOpen,
    Settings,
    HelpCircle,
    Plus,
    Building2,
    PanelLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const mainNavItems = [
    { title: "İmzalarım", url: "/dashboard", icon: LayoutGrid },
    { title: "Projeler", url: "/dashboard/projects", icon: FolderOpen },
    { title: "Organizasyon", url: "/dashboard/organization", icon: Building2 },
];

const bottomNavItems = [
    { title: "Ayarlar", url: "/settings", icon: Settings },
    { title: "Yardım", url: "/help", icon: HelpCircle },
];

export function DashboardSidebar() {
    const pathname = usePathname();
    const { state, toggleSidebar } = useSidebar();
    const collapsed = state === "collapsed";

    const isActive = (path: string) => {
        if (path === "/dashboard") {
            return pathname === "/dashboard";
        }
        return pathname.startsWith(path);
    };

    return (
        <Sidebar collapsible="icon" className="border-r border-white/5 bg-sidebar text-sidebar-foreground">
            <SidebarHeader className="p-6 flex items-center justify-center">
                <Link href="/" className="flex items-center gap-3 w-full group">
                    <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center flex-shrink-0 shadow-lg transition-transform group-hover:rotate-6">
                        <Sparkles className="w-5 h-5 text-sidebar-primary-foreground" />
                    </div>
                    {!collapsed && (
                        <span className="text-xl font-extrabold text-white tracking-tighter uppercase leading-none">
                            Signature<span className="text-white/40">OS</span>
                        </span>
                    )}
                </Link>
            </SidebarHeader>

            <SidebarContent className="px-2 py-4">
                <div className="space-y-6">
                    {/* New Design - Action */}
                    <div className={cn("px-2 transition-all duration-300", collapsed ? "px-0 flex justify-center" : "")}>
                        <Link href="/editor/new" className={cn("block", collapsed ? "w-10" : "w-full")}>
                            {collapsed ? (
                                <Button size="icon" className="w-10 h-10 rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-lg hover:scale-110 active:scale-95 transition-all">
                                    <Plus className="w-5 h-5" />
                                </Button>
                            ) : (
                                <Button className="w-full justify-start gap-3 rounded-xl h-11 font-bold text-xs uppercase tracking-wider px-4 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 transition-all shadow-[0_0_15px_rgba(159,232,112,0.2)]">
                                    <Plus className="w-4 h-4 flex-shrink-0" />
                                    <span>Yeni Tasarım</span>
                                </Button>
                            )}
                        </Link>
                    </div>

                    {/* Management Group */}
                    <div className="space-y-1">
                        {!collapsed && (
                            <p className="px-4 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-2">
                                MENÜ
                            </p>
                        )}
                        <SidebarMenu className={cn("gap-1", collapsed ? "px-0 items-center" : "px-2")}>
                            {mainNavItems.map((item) => {
                                const active = isActive(item.url);
                                return (
                                    <SidebarMenuItem key={item.url} className={cn(collapsed ? "flex justify-center w-full" : "")}>
                                        <SidebarMenuButton asChild isActive={active} tooltip={item.title} className={cn(
                                            "h-10 transition-all duration-200",
                                            collapsed ? "w-10 px-0 justify-center" : "px-3 w-full rounded-lg",
                                            active
                                                ? "bg-sidebar-primary text-sidebar-primary-foreground font-bold shadow-sm"
                                                : "text-white/70 hover:text-white hover:bg-white/10"
                                        )}>
                                            <Link href={item.url} className={cn("flex items-center", collapsed ? "justify-center" : "w-full")}>
                                                <item.icon className={cn(
                                                    "w-4 h-4 flex-shrink-0 transition-colors",
                                                    active ? "text-white" : "opacity-80"
                                                )} />
                                                {!collapsed && <span className="text-xs font-semibold tracking-wide ml-3 truncate">{item.title}</span>}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </div>

                    {/* Support Group */}
                    <div className="space-y-1">
                        {!collapsed && (
                            <p className="px-4 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-2 mt-4 pt-4 border-t border-white/5">
                                DESTEK
                            </p>
                        )}
                        <SidebarMenu className={cn("gap-1", collapsed ? "px-0 items-center" : "px-2")}>
                            {bottomNavItems.map((item) => {
                                const active = isActive(item.url);
                                return (
                                    <SidebarMenuItem key={item.url} className={cn(collapsed ? "flex justify-center w-full" : "")}>
                                        <SidebarMenuButton asChild isActive={active} tooltip={item.title} className={cn(
                                            "h-10 transition-all duration-200",
                                            collapsed ? "w-10 px-0 justify-center" : "px-3 w-full rounded-lg",
                                            active
                                                ? "bg-sidebar-primary text-sidebar-primary-foreground font-bold shadow-sm"
                                                : "text-white/70 hover:text-white hover:bg-white/10"
                                        )}>
                                            <Link href={item.url} className={cn("flex items-center", collapsed ? "justify-center" : "w-full")}>
                                                <item.icon className={cn(
                                                    "w-4 h-4 flex-shrink-0 transition-colors",
                                                    active ? "text-white" : "opacity-80"
                                                )} />
                                                {!collapsed && <span className="text-xs font-semibold tracking-wide ml-3 truncate">{item.title}</span>}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </div>
                </div>
            </SidebarContent>

            <SidebarFooter className={cn("p-4", collapsed ? "px-0 flex justify-center" : "px-4")}>
                <SidebarMenu className={cn(collapsed ? "items-center" : "")}>
                    <SidebarMenuItem className={cn(collapsed ? "flex justify-center w-full" : "")}>
                        <SidebarMenuButton
                            onClick={() => toggleSidebar()}
                            className={cn(
                                "h-10 transition-all text-white/40 hover:text-white hover:bg-white/5",
                                collapsed ? "w-10 p-0 justify-center rounded-xl" : "w-full justify-start gap-3 rounded-lg px-3"
                            )}
                        >
                            <PanelLeft className="h-4 w-4 flex-shrink-0" />
                            {!collapsed && <span className="text-[10px] font-bold uppercase tracking-wider">Daralt</span>}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
