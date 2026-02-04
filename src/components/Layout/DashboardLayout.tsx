import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/Dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { SearchProvider } from "@/context/SearchContext";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <SearchProvider>
            <SidebarProvider>
                <div className="flex min-h-screen w-full">
                    <DashboardSidebar />
                    <SidebarInset className="flex flex-col flex-1 min-w-0 bg-slate-50/50 overflow-hidden transition-all duration-300">
                        <DashboardHeader />
                        <div className="flex-1 overflow-y-auto w-full relative">
                            {children}
                        </div>
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </SearchProvider>
    );
};
