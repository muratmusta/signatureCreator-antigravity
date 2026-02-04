"use client";

import React from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useSignature } from '@/context/SignatureContext';
import { GripVertical, User, Briefcase, Phone, Hash, Image as ImageIcon } from 'lucide-react';
import type { SectionType } from '@/types/signature';
import { cn } from '@/lib/utils';

const SECTION_LABELS: Record<SectionType, { label: string; icon: React.FC<{ className?: string }> }> = {
    avatar: { label: 'Logo / Fotoğraf', icon: ImageIcon },
    info: { label: 'Kişisel Bilgiler', icon: User },
    contact: { label: 'İletişim Bilgileri', icon: Phone },
    social: { label: 'Sosyal Medya', icon: Hash },
    banner: { label: 'Banner / Not', icon: Briefcase },
};

interface SortableItemProps {
    id: SectionType;
}

function SortableItem({ id }: SortableItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto' as const,
    };

    const Meta = SECTION_LABELS[id];
    const Icon = Meta.icon;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "flex items-center gap-4 p-4 bg-card border border-border rounded-2xl mb-3 shadow-sm select-none transition-all",
                isDragging ? "opacity-30 ring-4 ring-primary/20 scale-105" : "hover:border-primary/30 hover:bg-muted/10 group focus-within:border-primary active:scale-[0.98]"
            )}
        >
            <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-primary p-1 transition-colors"
            >
                <GripVertical className="w-5 h-5" />
            </div>

            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
                <Icon className="w-5 h-5" />
            </div>

            <span className="text-sm font-black flex-1 text-foreground uppercase tracking-tight">{Meta.label}</span>

            {/* Visual indicator of position */}
            <div className="w-2 h-2 rounded-full bg-border" />
        </div>
    );
}

export function SortableLayers() {
    const { data, updateData } = useSignature();
    // Ensure we have a valid layout array
    const items = data.layout || ['avatar', 'info', 'contact', 'social'];

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = items.indexOf(active.id as SectionType);
            const newIndex = items.indexOf(over.id as SectionType);

            updateData({
                layout: arrayMove(items, oldIndex, newIndex),
            });
        }
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <div className="p-6 space-y-6">
                <div>
                    <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">
                        Düzen Sıralaması
                    </h3>
                    <p className="text-[11px] text-muted-foreground font-bold leading-relaxed opacity-70">
                        İmza parçalarının yerini değiştirmek için sürükleyip bırakın. Bu işlem tasarımı anında günceller.
                    </p>
                </div>

                <div className="bg-muted/10 p-3 rounded-[2rem] border border-border">
                    <SortableContext
                        items={items}
                        strategy={verticalListSortingStrategy}
                    >
                        {items.map((id) => (
                            <SortableItem key={id} id={id} />
                        ))}
                    </SortableContext>
                </div>
            </div>
        </DndContext>
    );
}
