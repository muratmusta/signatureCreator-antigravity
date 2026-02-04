import { DashboardLayout as DashboardLayoutComponent } from "@/components/Layout/DashboardLayout";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <DashboardLayoutComponent>{children}</DashboardLayoutComponent>;
}
