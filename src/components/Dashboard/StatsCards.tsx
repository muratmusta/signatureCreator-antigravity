import { Eye, MousePointer, TrendingUp, FileSignature } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { SignatureProject } from "@/types/signature";

interface StatsCardsProps {
    signatures: SignatureProject[];
}

export function StatsCards({ signatures }: StatsCardsProps) {
    const totalViews = signatures.reduce((acc, s) => acc + (s.views || 0), 0);
    const totalClicks = signatures.reduce((acc, s) => acc + (s.clicks || 0), 0);
    const clickRate = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : '0';

    const stats = [
        {
            title: "Toplam İmza",
            value: signatures.length,
            icon: FileSignature,
            iconColor: "text-primary",
            iconBg: "bg-primary/5",
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <Card key={stat.title} className="bg-white border-border shadow-sm rounded-2xl hover:shadow-md transition-all duration-300">
                    <CardContent className="p-5">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl ${stat.iconBg} flex items-center justify-center shrink-0`}>
                                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">
                                    {stat.title}
                                </p>
                                <p className="text-2xl font-extrabold text-foreground tracking-tight tabular-nums">
                                    {stat.value}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
