'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { SignatureData, SectionType, TemplateId } from '../types/signature';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

interface SignatureContextType {
    data: SignatureData;
    selectedTemplate: TemplateId;
    updateData: (updates: Partial<SignatureData>) => void;
    setSelectedTemplate: (template: TemplateId) => void;
    resetData: () => void;
    user: any; // User object
}

const SignatureContext = createContext<SignatureContextType | undefined>(undefined);

export const SignatureProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<SignatureData>(() => loadFromLocalStorage());
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(1);
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();

    // Auto-save to localStorage whenever data changes
    useEffect(() => {
        saveToLocalStorage(data);
    }, [data]);

    // Initialize Auth (Anonymous)
    useEffect(() => {
        const initAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setUser(session.user);
            } else {
                const { data: anonData, error } = await supabase.auth.signInAnonymously();
                if (error) {
                    console.warn("Supabase Anon Auth Disabled. Falling back to local UUID.");
                    // Fallback: Use a locally generated UUID for 'guest' mode
                    // This works because we relaxed RLS policies to allow public access with any UUID
                    let guestId = localStorage.getItem('signature_guest_uuid');
                    if (!guestId) {
                        guestId = crypto.randomUUID();
                        localStorage.setItem('signature_guest_uuid', guestId);
                    }
                    setUser({ id: guestId, isAnonymous: true });
                    toast.info("Misafir modu aktif edildi.");
                } else if (anonData.user) {
                    setUser(anonData.user);
                    toast.success("Misafir oturumu açıldı.");
                }
            }
        };
        initAuth();
    }, []);

    const updateData = (updates: Partial<SignatureData>) => {
        setData((prev) => ({ ...prev, ...updates }));
    };

    const resetData = () => {
        setData(loadFromLocalStorage());
    };

    return (
        <SignatureContext.Provider
            value={{
                data,
                selectedTemplate,
                updateData,
                setSelectedTemplate,
                resetData,
                user
            }}
        >
            {children}
        </SignatureContext.Provider>
    );
};

export const useSignature = (): SignatureContextType => {
    const context = useContext(SignatureContext);
    if (!context) {
        throw new Error('useSignature must be used within SignatureProvider');
    }
    return context;
};
