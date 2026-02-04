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

    // List View (Professional Row Style)
    if (viewMode === "list") {
        return (
            <div className="group">
                <Card className="rounded-xl border border-border bg-white hover:bg-slate-50 hover:border-secondary/30 transition-all shadow-sm">
                    <div className="flex items-center gap-6 p-4">
                        {/* Preview Thumbnail */}
                        <Link href={`/editor/${project.id}`} className="flex-shrink-0">
                            <div className="w-24 h-12 bg-slate-50 rounded-lg overflow-hidden flex items-center justify-center border border-border group-hover:bg-white transition-colors">
                                <div className="scale-[0.18] origin-center transform transition-transform group-hover:scale-[0.19]">
                                    <Template data={project.data} logoSrc={logoSrc} />
                                </div>
                            </div>
                        </Link>

                        {/* Info Column */}
                        <div className="flex-[2] min-w-0">
                            <Link href={`/editor/${project.id}`}>
                                <h3 className="text-sm font-extrabold text-foreground hover:text-primary transition-colors truncate uppercase tracking-tight">
                                    {project.title}
                                </h3>
                            </Link>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                {templateNames[templateId]}
                            </p>
                        </div>

                        {/* Owner */}
                        <div className="flex-1 hidden md:block">
                            <p className="text-[11px] font-bold text-slate-500 truncate uppercase tracking-tight">
                                {project.data.fullName || 'İsimsiz'}
                            </p>
                        </div>

                        {/* Date */}
                        <div className="flex-1 hidden lg:block text-right pr-4">
                            <p className="text-[10px] font-bold text-slate-400 tabular-nums uppercase tracking-widest">
                                {format(new Date(project.updated_at), 'd MMM yyyy', { locale: tr })}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            <Link href={`/editor/${project.id}`}>
                                <Button variant="ghost" size="sm" className="h-9 w-9 rounded-lg p-0 hover:bg-white hover:text-primary shadow-sm border border-transparent hover:border-border transition-all">
                                    <Pencil className="w-4 h-4" />
                                </Button>
                            </Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon-sm" className="h-9 w-9 rounded-lg hover:bg-white shadow-sm border border-transparent hover:border-border transition-all">
                                        <MoreVertical className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48 p-1 rounded-xl shadow-xl bg-card border border-border">
                                    <DropdownMenuItem onClick={() => onDuplicate(project)} className="rounded-lg py-2 cursor-pointer font-bold text-[10px] uppercase tracking-wider">
                                        <Copy className="w-3.5 h-3.5 mr-2" />
                                        <span>Kopyala</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-border/50" />
                                    <DropdownMenuItem
                                        onClick={() => setShowDeleteAlert(true)}
                                        className="text-destructive focus:text-destructive focus:bg-destructive/5 rounded-lg py-2 cursor-pointer font-bold text-[10px] uppercase tracking-wider"
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

    // Grid view - Premium Bento Card
    return (
        <div>
            <Card className="overflow-hidden group bg-white border border-border shadow-sm rounded-2xl hover:shadow-md hover:border-secondary/30 transition-all duration-300">
                <div className="flex flex-col h-full">
                    <Link href={`/editor/${project.id}`} className="block w-full h-48 bg-slate-50 relative border-b border-border transition-colors group-hover:bg-slate-100/50">
                        <div className="h-full flex items-center justify-center overflow-hidden">
                            <div className="scale-[0.48] origin-center transform transition-all duration-500 group-hover:scale-[0.50]">
                                <Template data={project.data} logoSrc={logoSrc} />
                            </div>
                        </div>
                        <div className="absolute top-4 left-4">
                            <span className="text-[10px] font-black px-3 py-1.5 bg-white border border-border rounded-lg text-foreground shadow-sm uppercase tracking-widest bg-white/90 backdrop-blur-sm">
                                {templateNames[templateId]}
                            </span>
                        </div>
                    </Link>

                    <div className="p-6 bg-white">
                        <div className="flex justify-between items-start gap-4 mb-4">
                            <div className="min-w-0">
                                <Link href={`/editor/${project.id}`}>
                                    <h3 className="text-lg font-extrabold text-foreground hover:text-primary transition-colors truncate uppercase tracking-tight">
                                        {project.title || 'İsimsiz Tasarım'}
                                    </h3>
                                </Link>
                                <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                    {project.data.fullName || 'İsimsiz Kullanıcı'}
                                </p>
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon-sm" className="h-9 w-9 rounded-lg hover:bg-slate-100 border border-transparent hover:border-border transition-all">
                                        <MoreVertical className="w-4 h-4 text-slate-400" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48 p-1 rounded-xl shadow-xl bg-card border border-border">
                                    <DropdownMenuItem asChild>
                                        <Link href={`/editor/${project.id}`} className="flex items-center gap-2 cursor-pointer rounded-lg py-2 font-bold text-[10px] uppercase tracking-wider">
                                            <Pencil className="w-3.5 h-3.5" />
                                            <span>Düzenle</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onDuplicate(project)} className="rounded-lg py-2 cursor-pointer font-bold text-[10px] uppercase tracking-wider">
                                        <Copy className="w-3.5 h-3.5 mr-2" />
                                        <span>Kopyala</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-border/50" />
                                    <DropdownMenuItem
                                        onClick={() => setShowDeleteAlert(true)}
                                        className="text-destructive focus:text-destructive focus:bg-destructive/5 rounded-lg py-2 cursor-pointer font-bold text-[10px] uppercase tracking-wider"
                                    >
                                        <Trash2 className="w-3.5 h-3.5 mr-2" />
                                        <span>Sil</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                SON GÜNCELLEME
                            </p>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest tabular-nums font-mono">
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
