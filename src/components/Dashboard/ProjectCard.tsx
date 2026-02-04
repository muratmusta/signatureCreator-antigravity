"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, MousePointer, MoreVertical, Pencil, Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getTemplate, templateNames } from "@/components/Templates";
import { generateAutoLogo } from "@/utils/generateLogo";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import type { SignatureProject, TemplateId } from "@/types/signature";

interface ProjectCardProps {
    project: SignatureProject;
    viewMode: "grid" | "list";
    onDelete: (id: string) => void;
    onDuplicate: (project: SignatureProject) => void;
    // Optional props for future enhancements
    projectColor?: string | null;
    projectName?: string | null;
    // Kept for compatibility if needed, though we use internal state for duplicate/delete
    isSelected?: boolean;
    onSelect?: (id: string) => void;
}

export function ProjectCard({
    project,
    viewMode,
    onDelete,
    onDuplicate,
    projectColor,
    projectName
}: ProjectCardProps) {
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const logoSrc = project.data.logo || generateAutoLogo(project.data.fullName || 'U', project.data.primaryColor);
    const templateId = (project.data.selectedTemplate || 1) as TemplateId;
    const Template = getTemplate(templateId);

    // List View (Professional Row Style) - Refined
    if (viewMode === "list") {
        return (
            <div className="group">
                <Card className="rounded-[1.5rem] border border-border/50 bg-white hover:bg-slate-50 transition-all duration-500 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.08)]">
                    <div className="flex items-center gap-8 p-4">
                        {/* Preview Thumbnail - Minimalist */}
                        <Link href={`/editor/${project.id}`} className="flex-shrink-0">
                            <div className="w-32 h-16 bg-white rounded-xl overflow-hidden flex items-center justify-center border border-border/40 shadow-inner group-hover:border-secondary/40 transition-colors">
                                <div className="scale-[0.22] origin-center transform transition-transform group-hover:scale-[0.24]">
                                    <Template data={project.data} logoSrc={logoSrc} />
                                </div>
                            </div>
                        </Link>

                        {/* Info Column */}
                        <div className="flex-[2] min-w-0">
                            <Link href={`/editor/${project.id}`}>
                                <h3 className="text-base font-semibold text-foreground hover:text-primary transition-colors truncate tracking-tight mb-1">
                                    {project.title || 'İsimsiz Tasarım'}
                                </h3>
                            </Link>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-medium text-slate-400/80 tracking-wide uppercase px-2 py-0.5 bg-slate-100 rounded-md">
                                    {templateNames[templateId]}
                                </span>
                            </div>
                        </div>

                        {/* Owner */}
                        <div className="flex-1 hidden md:block">
                            <p className="text-[12px] font-medium text-slate-500/80">
                                {project.data.fullName || 'İsimsiz'}
                            </p>
                        </div>

                        {/* Date */}
                        <div className="flex-1 hidden lg:block text-right pr-6">
                            <p className="text-[11px] font-medium text-slate-400">
                                {format(new Date(project.updated_at), 'd MMM yyyy', { locale: tr })}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1">
                            <Link href={`/editor/${project.id}`}>
                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white hover:text-primary shadow-sm border border-transparent hover:border-border/50 transition-all">
                                    <Pencil className="w-4 h-4" />
                                </Button>
                            </Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white shadow-sm border border-transparent hover:border-border/50 transition-all">
                                        <MoreVertical className="w-4 h-4 text-slate-400" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48 p-1.5 rounded-[1.25rem] shadow-2xl bg-white border border-border/40">
                                    <DropdownMenuItem onClick={() => onDuplicate(project)} className="rounded-lg py-2.5 cursor-pointer font-semibold text-xs text-slate-600">
                                        <Copy className="w-3.5 h-3.5 mr-2" />
                                        <span>Kopyala</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="opacity-50" />
                                    <DropdownMenuItem
                                        onClick={() => setShowDeleteAlert(true)}
                                        className="text-destructive focus:text-destructive focus:bg-destructive/5 rounded-lg py-2.5 cursor-pointer font-semibold text-xs"
                                    >
                                        <Trash2 className="w-3.5 h-3.5 mr-2" />
                                        <span>Sil</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </Card>

                <DeleteAlert
                    open={showDeleteAlert}
                    onOpenChange={setShowDeleteAlert}
                    onConfirm={() => onDelete(project.id)}
                />
            </div>
        );
    }

    // Grid view - Premium Apple-style Floating Card
    return (
        <div className="group">
            <Card className="premium-card overflow-hidden">
                <div className="flex flex-col h-full">
                    {/* Preview Section - High Emphasis */}
                    <Link href={`/editor/${project.id}`} className="block w-full h-64 bg-white relative overflow-hidden group/preview">
                        {/* Decorative background grid/dots */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

                        <div className="h-full flex items-center justify-center p-8 transition-transform duration-700 group-hover/preview:scale-[1.03]">
                            <div className="scale-[0.55] sm:scale-[0.65] origin-center shadow-[0_20px_50px_-20px_rgba(0,0,0,0.12)] transition-shadow duration-500 group-hover/preview:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.15)] bg-white p-4 rounded-lg">
                                <Template data={project.data} logoSrc={logoSrc} />
                            </div>
                        </div>

                        {/* Glass Badge */}
                        <div className="absolute top-5 left-5">
                            <span className="text-[10px] font-bold px-3 py-1.5 bg-white/60 backdrop-blur-md border border-white/40 rounded-full text-foreground/80 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.05)] uppercase tracking-wider">
                                {templateNames[templateId]}
                            </span>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover/preview:opacity-100 transition-opacity duration-500" />
                    </Link>

                    {/* Content Section - Minimalist */}
                    <div className="p-6 pt-5">
                        <div className="flex justify-between items-start gap-4 mb-5">
                            <div className="min-w-0">
                                <Link href={`/editor/${project.id}`}>
                                    <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors truncate tracking-tight">
                                        {project.title || 'İsimsiz Tasarım'}
                                    </h3>
                                </Link>
                                <div className="flex items-center gap-2 mt-1.5">
                                    <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
                                        <span className="text-[8px] font-bold text-slate-400">{(project.data.fullName || 'U')[0]}</span>
                                    </div>
                                    <p className="text-[12px] font-medium text-slate-400">
                                        {project.data.fullName || 'İsimsiz Kullanıcı'}
                                    </p>
                                </div>
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-slate-50 border border-transparent hover:border-border/50 transition-all shrink-0">
                                        <MoreVertical className="w-4 h-4 text-slate-400" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48 p-1.5 rounded-2xl shadow-2xl bg-white border border-border/40">
                                    <DropdownMenuItem asChild>
                                        <Link href={`/editor/${project.id}`} className="flex items-center gap-2 cursor-pointer rounded-lg py-2.5 px-3 font-semibold text-xs text-slate-600">
                                            <Pencil className="w-3.5 h-3.5" />
                                            <span>Düzenle</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onDuplicate(project)} className="rounded-lg py-2.5 px-3 cursor-pointer font-semibold text-xs text-slate-600">
                                        <Copy className="w-3.5 h-3.5 mr-2" />
                                        <span>Kopyala</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="opacity-50" />
                                    <DropdownMenuItem
                                        onClick={() => setShowDeleteAlert(true)}
                                        className="text-destructive focus:text-destructive focus:bg-destructive/5 rounded-lg py-2.5 px-3 cursor-pointer font-semibold text-xs"
                                    >
                                        <Trash2 className="w-3.5 h-3.5 mr-2" />
                                        <span>Sil</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="flex items-center justify-between py-3 px-4 bg-slate-50/50 rounded-2xl border border-slate-100/50">
                            <p className="text-[9px] font-bold text-slate-400/70 uppercase tracking-widest">
                                GÜNCELLEME
                            </p>
                            <span className="text-[10px] font-semibold text-slate-400 tabular-nums">
                                {format(new Date(project.updated_at), 'd MMM yyyy', { locale: tr })}
                            </span>
                        </div>
                    </div>
                </div>
            </Card>

            <DeleteAlert
                open={showDeleteAlert}
                onOpenChange={setShowDeleteAlert}
                onConfirm={() => onDelete(project.id)}
            />
        </div>
    );
}

function DeleteAlert({ open, onOpenChange, onConfirm }: { open: boolean, onOpenChange: (open: boolean) => void, onConfirm: () => void }) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="rounded-xl border-border">
                <AlertDialogHeader>
                    <AlertDialogTitle className="font-extrabold text-xl uppercase tracking-tight">Emin misiniz?</AlertDialogTitle>
                    <AlertDialogDescription className="font-medium text-slate-500">
                        Bu imzayı kalıcı olarak siliyorsunuz. Bu işlem geri alınamaz.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-2">
                    <AlertDialogCancel className="rounded-lg font-bold text-xs uppercase tracking-wider border-border hover:bg-slate-50">Vazgeç</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="bg-destructive text-white hover:bg-destructive text-xs uppercase tracking-wider font-bold rounded-lg px-4"
                    >
                        Evet, Sil
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
