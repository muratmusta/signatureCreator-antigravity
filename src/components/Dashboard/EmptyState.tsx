import Link from "next/link";
import { FileSignature, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EmptyStateProps {
    searchQuery: string;
}

export function EmptyState({ searchQuery }: EmptyStateProps) {
    if (searchQuery) {
        return (
            <Card className="p-12 text-center bg-white border border-dashed border-slate-200 rounded-2xl shadow-sm">
                <div className="w-16 h-16 rounded-xl bg-slate-50 mx-auto mb-4 flex items-center justify-center border border-slate-100">
                    <FileSignature className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 tracking-tight">
                    Sonuç Bulunamadı
                </h3>
                <p className="text-sm text-slate-500 mb-6 max-w-xs mx-auto font-medium opacity-70">
                    "{searchQuery}" aramasıyla eşleşen bir tasarım bulamadık. Daha genel bir arama yapmayı deneyin.
                </p>
                <Button variant="outline" className="h-10 px-6 rounded-full font-bold text-[10px] tracking-wider uppercase border-slate-200" onClick={() => window.location.reload()}>
                    Aramayı Temizle
                </Button>
            </Card>
        );
    }

    return (
        <Card className="p-16 text-center bg-white border border-border/60 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
            <div className="relative z-10">
                <div className="w-20 h-20 rounded-[2rem] bg-secondary/10 mx-auto mb-8 flex items-center justify-center shadow-sm border border-secondary/20 transition-transform duration-700 group-hover:scale-110">
                    <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4 tracking-tight leading-tight">
                    Efsanevi Bir <br />Başlangıç Yapın.
                </h2>
                <p className="text-slate-500/80 mb-10 max-w-sm mx-auto leading-relaxed text-sm font-medium">
                    Profesyonel e-posta imzanızı saniyeler içinde tasarlayın.
                    Dünya standartlarında şablonlarla markanızı parlatın.
                </p>
                <Link href="/editor/new">
                    <Button className="btn-primary h-14 px-10 text-[11px] tracking-[0.15em] font-black group shadow-xl">
                        <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
                        HEMEN TASARLA
                    </Button>
                </Link>
            </div>

            {/* Subtle Gradient Backdrops */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -ml-32 -mb-32 pointer-events-none" />
        </Card>
    );
}
