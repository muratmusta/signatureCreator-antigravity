'use client';

import React from 'react';
import type { SignatureProject, TemplateId } from '@/types/signature';
import { getTemplate } from '@/components/Templates';
import { generateAutoLogo } from '@/utils/generateLogo';
import { Button } from '@/components/ui/button';
import { MoreVertical, Edit2, Trash2, Copy, ExternalLink, Clock, User, Building } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import Link from 'next/link';

interface ProjectCardProps {
    project: SignatureProject;
    viewMode: 'grid' | 'list';
    isSelected: boolean;
    onSelect: (id: string) => void;
    onDelete: (id: string) => void;
    onDuplicate: (project: SignatureProject) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    project,
    viewMode,
    isSelected,
    onSelect,
    onDelete,
    onDuplicate
}) => {
    const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);

    const templateId = (project.data.selectedTemplate || 1) as TemplateId;
    const Template = getTemplate(templateId);
    const logo = project.data.logo || generateAutoLogo(project.data.fullName, project.data.primaryColor);

    if (viewMode === 'list') {
        return (
            <div
                className={`
                    group relative flex items-center gap-6 p-4 bg-white border rounded-xl transition-all
                    ${isSelected ? 'border-black ring-1 ring-black bg-gray-50' : 'border-gray-100 hover:border-gray-200 hover:shadow-sm'}
                `}
            >
                <div
                    onClick={() => onSelect(project.id)}
                    className={`
                        w-5 h-5 rounded border-2 cursor-pointer flex items-center justify-center transition-all
                        ${isSelected ? 'bg-black border-black' : 'border-gray-200 group-hover:border-gray-400'}
                    `}
                >
                    {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>

                <div className="flex-1 flex items-center justify-between min-w-0">
                    <div className="flex items-center gap-4 min-w-0">
                        <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100 flex-shrink-0">
                            <img src={logo} alt="" className="w-8 h-8 object-contain" />
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-bold text-sm text-gray-900 truncate">{project.title}</h3>
                            <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                                <span className="flex items-center gap-1"><User className="w-3 h-3" /> {project.data.fullName}</span>
                                {project.data.company && <span className="flex items-center gap-1"><Building className="w-3 h-3" /> {project.data.company}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-8 text-xs font-medium text-gray-400">
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] uppercase tracking-wider font-bold">Düzenleme</span>
                            <span className="text-gray-600">{format(new Date(project.updated_at), 'd MMM yyyy', { locale: tr })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link href={`/editor/${project.id}`}>
                                <Button variant="secondary" size="sm" className="h-9 px-4 rounded-lg font-bold text-xs gap-2">
                                    Düzenle
                                </Button>
                            </Link>
                            <ProjectActions
                                onDuplicate={() => onDuplicate(project)}
                                onDelete={() => setShowDeleteAlert(true)}
                            />
                        </div>
                    </div>
                </div>

                <DeleteDialog isOpen={showDeleteAlert} onOpenChange={setShowDeleteAlert} onConfirm={() => onDelete(project.id)} />
            </div>
        );
    }

    return (
        <div
            className={`
                group relative flex flex-col bg-white border rounded-2xl transition-all overflow-hidden
                ${isSelected ? 'border-black ring-1 ring-black shadow-lg' : 'border-gray-100 hover:border-gray-200 hover:shadow-md'}
            `}
        >
            {/* Selection Overlay */}
            <div
                onClick={() => onSelect(project.id)}
                className={`
                    absolute top-4 left-4 z-10 w-6 h-6 rounded-lg border-2 cursor-pointer flex items-center justify-center transition-all bg-white
                    ${isSelected ? 'bg-black border-black' : 'border-gray-200 opacity-0 group-hover:opacity-100'}
                `}
            >
                {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>

            {/* Actions Menu Overlay */}
            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <ProjectActions
                    onDuplicate={() => onDuplicate(project)}
                    onDelete={() => setShowDeleteAlert(true)}
                />
            </div>

            {/* Preview Area */}
            <Link href={`/editor/${project.id}`} className="block relative aspect-[4/3] bg-gray-50/50 border-b border-gray-100 overflow-hidden group/preview">
                <div className="absolute inset-0 flex items-center justify-center p-8 transform group-hover/preview:scale-[1.02] transition-transform duration-500 origin-center">
                    <div className="w-full max-w-full bg-white scale-[0.6] origin-center shadow-xl p-6 rounded-xl">
                        <Template data={project.data} logoSrc={logo} />
                    </div>
                </div>
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-black text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-xl flex items-center gap-2 transform translate-y-4 group-hover/preview:translate-y-0 transition-transform">
                        Düzenle <Edit2 className="w-3.5 h-3.5" />
                    </div>
                </div>
            </Link>

            {/* Info Area */}
            <div className="p-5 space-y-4">
                <div className="min-w-0">
                    <h3 className="font-bold text-sm text-gray-900 mb-1 truncate">{project.title}</h3>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100">
                            <img src={logo} alt="" className="w-4 h-4 object-contain" />
                        </div>
                        <span className="text-xs text-gray-400 font-medium truncate">{project.data.fullName}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-300 uppercase tracking-wider">
                        <Clock className="w-3.5 h-3.5" />
                        {format(new Date(project.updated_at), 'd MMM yyyy', { locale: tr })}
                    </div>
                    <Link href={`/editor/${project.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 px-3 rounded-lg text-xs font-bold hover:bg-black hover:text-white">
                            Aç
                        </Button>
                    </Link>
                </div>
            </div>

            <DeleteDialog isOpen={showDeleteAlert} onOpenChange={setShowDeleteAlert} onConfirm={() => onDelete(project.id)} />
        </div>
    );
};

const ProjectActions = ({ onDuplicate, onDelete }: { onDuplicate: () => void, onDelete: () => void }) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="h-9 w-9 bg-white border border-gray-200 shadow-sm rounded-lg hover:bg-gray-50">
                <MoreVertical className="w-4 h-4 text-gray-500" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 p-1.5 rounded-xl">
            <DropdownMenuItem className="gap-3 rounded-lg py-2.5 cursor-pointer" onClick={onDuplicate}>
                <Copy className="w-4 h-4" />
                <span className="font-medium text-sm">Kopyala</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 rounded-lg py-2.5 text-destructive focus:text-destructive cursor-pointer" onClick={onDelete}>
                <Trash2 className="w-4 h-4" />
                <span className="font-medium text-sm">Sil</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);

const DeleteDialog = ({ isOpen, onOpenChange, onConfirm }: { isOpen: boolean, onOpenChange: (open: boolean) => void, onConfirm: () => void }) => (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
        <AlertDialogContent className="rounded-2xl">
            <AlertDialogHeader>
                <AlertDialogTitle className="font-bold">Emin misiniz?</AlertDialogTitle>
                <AlertDialogDescription className="text-sm font-medium">
                    Bu tasarımı kalıcı olarak siliyorsunuz. Bu işlem geri alınamaz.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel className="rounded-xl font-bold">Vazgeç</AlertDialogCancel>
                <AlertDialogAction onClick={onConfirm} className="bg-destructive text-white hover:bg-destructive/90 rounded-xl font-bold">
                    Evet, Sil
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
);
