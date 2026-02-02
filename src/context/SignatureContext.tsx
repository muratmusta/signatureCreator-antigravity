'use client';

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode, useCallback } from 'react';
import type { SignatureData } from '../types/signature';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import { generateAutoLogo } from '@/utils/generateLogo';

interface SignatureContextType {
    data: SignatureData;
    updateData: (newData: Partial<SignatureData>) => void;
    projectTitle: string;
    setProjectTitle: (title: string) => void;
    selectedTemplate: number;
    setSelectedTemplate: (id: number) => void;
    user: User | null;
    projectId: string | null;
    setProjectId: (id: string | null) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    isAutosaving: boolean;
    lastAutoSave: Date | null;
}

const SignatureContext = createContext<SignatureContextType | undefined>(undefined);

const MAX_HISTORY = 50; // Maximum number of history states

export const SignatureProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedTemplate, setSelectedTemplate] = useState<number>(1);
    const [projectTitle, setProjectTitle] = useState<string>('İsimsiz İmza');
    const [user, setUser] = useState<User | null>(null);
    const [projectId, setProjectId] = useState<string | null>(null);
    const initialized = useRef(false);

    // History management
    const [history, setHistory] = useState<SignatureData[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const isUndoRedoAction = useRef(false);

    // Autosave management
    const [isAutosaving, setIsAutosaving] = useState(false);
    const [lastAutoSave, setLastAutoSave] = useState<Date | null>(null);
    const autosaveTimeout = useRef<NodeJS.Timeout | null>(null);

    const [data, setData] = useState<SignatureData>({
        fullName: '',
        title: '',
        company: '',
        phone: '',
        email: '',
        website: '',
        address: '',
        logo: '',
        useAutoLogo: true,
        primaryColor: '#163300',
        layout: ['avatar', 'info', 'contact', 'social'],
        socialLinks: {
            linkedin: '',
            instagram: '',
            twitter: '',
        },
    });

    // Initialize history with initial state
    useEffect(() => {
        if (history.length === 0) {
            setHistory([data]);
            setHistoryIndex(0);
        }
    }, []);

    const updateData = useCallback((newData: Partial<SignatureData>) => {
        setData((prev) => {
            // Special handling for nested objects like socialLinks
            const socialLinks = newData.socialLinks
                ? { ...prev.socialLinks, ...newData.socialLinks }
                : prev.socialLinks;

            const updated = { ...prev, ...newData, socialLinks };

            if (updated.useAutoLogo && updated.fullName) {
                updated.logo = generateAutoLogo(updated.fullName, updated.primaryColor);
            }

            // Add to history (only if not an undo/redo action)
            if (!isUndoRedoAction.current) {
                setHistory((prevHistory) => {
                    // Remove any future history if we're not at the end
                    const newHistory = prevHistory.slice(0, historyIndex + 1);
                    // Add new state
                    newHistory.push(updated);
                    // Limit history size
                    if (newHistory.length > MAX_HISTORY) {
                        newHistory.shift();
                        return newHistory;
                    }
                    return newHistory;
                });
                setHistoryIndex((prev) => Math.min(prev + 1, MAX_HISTORY - 1));
            }

            // Trigger autosave (debounced)
            if (user && projectId && !isUndoRedoAction.current) {
                if (autosaveTimeout.current) {
                    clearTimeout(autosaveTimeout.current);
                }
                autosaveTimeout.current = setTimeout(async () => {
                    setIsAutosaving(true);
                    try {
                        const supabase = createClient();
                        await supabase
                            .from('signatures')
                            .update({
                                title: projectTitle,
                                data: updated as any,
                                updated_at: new Date().toISOString()
                            })
                            .eq('id', projectId);
                        setLastAutoSave(new Date());
                    } catch (error) {
                        console.error('Autosave error:', error);
                    } finally {
                        setIsAutosaving(false);
                    }
                }, 3000); // 3 second debounce
            }

            return updated;
        });
    }, [historyIndex, user, projectId]);

    const undo = useCallback(() => {
        if (historyIndex > 0) {
            isUndoRedoAction.current = true;
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setData(history[newIndex]);
            // Reset flag after state update
            setTimeout(() => {
                isUndoRedoAction.current = false;
            }, 0);
        }
    }, [historyIndex, history]);

    const redo = useCallback(() => {
        if (historyIndex < history.length - 1) {
            isUndoRedoAction.current = true;
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setData(history[newIndex]);
            // Reset flag after state update
            setTimeout(() => {
                isUndoRedoAction.current = false;
            }, 0);
        }
    }, [historyIndex, history]);

    const canUndo = historyIndex > 0;
    const canRedo = historyIndex < history.length - 1;

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const supabase = createClient();

        const initAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };

        initAuth();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
                e.preventDefault();
                if (e.shiftKey) {
                    redo();
                } else {
                    undo();
                }
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
                e.preventDefault();
                redo();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [undo, redo]);

    return (
        <SignatureContext.Provider
            value={{
                data,
                updateData,
                projectTitle,
                setProjectTitle,
                selectedTemplate,
                setSelectedTemplate,
                user,
                projectId,
                setProjectId,
                undo,
                redo,
                canUndo,
                canRedo,
                isAutosaving,
                lastAutoSave,
            }}
        >
            {children}
        </SignatureContext.Provider>
    );
};

export const useSignature = () => {
    const context = useContext(SignatureContext);
    if (!context) {
        throw new Error('useSignature must be used within SignatureProvider');
    }
    return context;
};
