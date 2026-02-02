export type SectionType = 'avatar' | 'info' | 'contact' | 'social' | 'banner';

export interface SignatureData {
    fullName: string;
    title: string;
    company: string;
    phone: string;
    email: string;
    address: string;
    website: string;
    logoBase64: string; // Base64 encoded image
    useAutoLogo: boolean;
    primaryColor: string;
    socialLinks: {
        linkedin: string;
        instagram: string;
        twitter: string;
    };
    layout: SectionType[];
}

export const defaultSignatureData: SignatureData = {
    fullName: '',
    title: '',
    company: '',
    phone: '',
    email: '',
    address: '',
    website: '',
    logoBase64: '',
    useAutoLogo: false,
    primaryColor: '#3B82F6',
    socialLinks: {
        linkedin: '',
        instagram: '',
        twitter: '',
    },
    layout: ['avatar', 'info', 'contact', 'social'],
};

export type TemplateId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
