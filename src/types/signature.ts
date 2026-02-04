export type SectionType = 'avatar' | 'info' | 'contact' | 'social' | 'banner';

export interface SignatureData {
    fullName: string;
    title: string;
    company: string;
    phone: string;
    email: string;
    address: string;
    website: string;
    logo?: string; // Base64 encoded image
    useAutoLogo: boolean;
    primaryColor: string;
    socialLinks: {
        linkedin: string;
        instagram: string;
        twitter: string;
    };
    layout: SectionType[];
    showBranding?: boolean;
    selectedTemplate?: number;
    badges?: Badge[];
}

export interface Badge {
    id: string;
    imageUrl: string;
    altText: string;
    linkUrl?: string;
}

export const defaultSignatureData: SignatureData = {
    fullName: '',
    title: '',
    company: '',
    phone: '',
    email: '',
    address: '',
    website: '',
    logo: '',
    useAutoLogo: false,
    primaryColor: '#3B82F6',
    socialLinks: {
        linkedin: '',
        instagram: '',
        twitter: '',
    },
    layout: ['avatar', 'info', 'contact', 'social'],
    showBranding: true,
    badges: [],
};

export type TemplateId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;

import { Database } from './supabase';

export type SignatureProject = Omit<Database['public']['Tables']['signatures']['Row'], 'data'> & {
    data: SignatureData;
};
