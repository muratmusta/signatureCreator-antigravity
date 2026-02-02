'use client';

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
import { SectionType } from '@/types/signature';
import { cn } from '@/lib/utils';

const SECTION_LABELS: Record<SectionType, { label: string; icon: React.FC<any> }> = {
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
        zIndex: isDragging ? 50 : 'auto',
    };

    const Meta = SECTION_LABELS[id];
    const Icon = Meta.icon;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "flex items-center gap-3 p-3 bg-card border border-border rounded-lg mb-2 shadow-sm select-none transition-colors",
                isDragging ? "opacity-50 ring-2 ring-primary" : "hover:bg-accent/50"
            )}
        >
            <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground p-1"
            >
                <GripVertical className="w-4 h-4" />
            </div>

            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-muted text-muted-foreground">
                <Icon className="w-4 h-4" />
            </div>

            <span className="text-sm font-medium flex-1">{Meta.label}</span>
        </div>
    );
}

export function SortableLayers() {
    const { data, updateData } = useSignature();
    // Default layout if undefined
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
            <div className="p-4 space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Düzen Sıralaması
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                    İmza parçalarının yerini değiştirmek için sürükleyin.
                </p>
                <SortableContext
                    items={items}
                    strategy={verticalListSortingStrategy}
                >
                    {items.map((id) => (
                        <SortableItem key={id} id={id} />
                    ))}
                </SortableContext>
            </div>
        </DndContext>
    );
}
