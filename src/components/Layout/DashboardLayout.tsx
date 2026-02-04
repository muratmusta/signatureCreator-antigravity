import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/Dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <SidebarInset className="flex flex-col min-h-screen bg-slate-50/50 min-w-0 overflow-hidden transition-[margin] duration-300 md:peer-data-[state=expanded]:ml-[var(--sidebar-width)] md:peer-data-[state=collapsed]:ml-[var(--sidebar-width-icon)]">
                <DashboardHeader />
                <div className="flex-1 overflow-y-auto w-full relative">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};
