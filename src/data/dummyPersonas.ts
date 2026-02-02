import type { SignatureData } from '../types/signature';

const basePersona: SignatureData = {
    fullName: '',
    title: '',
    company: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    logoBase64: '',
    useAutoLogo: true,
    primaryColor: '#000000',
    socialLinks: {
        linkedin: '',
        instagram: '',
        twitter: '',
    }
};

export const PERSONAS: Record<string, SignatureData> = {
    corporate: {
        ...basePersona,
        fullName: 'Mehmet Demir',
        title: 'Genel Müdür',
        company: 'Demir Holding',
        phone: '+90 532 111 22 33',
        email: 'mehmet@demirholding.com.tr',
        website: 'demirholding.com.tr',
        address: 'Maslak, Büyükdere Cad. No:1 İstanbul',
        primaryColor: '#163300', // Forest
        socialLinks: { ...basePersona.socialLinks, linkedin: 'example' }
    },
    tech: {
        ...basePersona,
        fullName: 'Ayşe Yılmaz',
        title: 'Senior Frontend Developer',
        company: 'CodeTech Solutions',
        phone: '+90 555 444 55 66',
        email: 'ayse.yilmaz@codetech.io',
        website: 'www.codetech.io',
        address: 'Teknopark İstanbul, Pendik',
        primaryColor: '#2563eb', // Blue
        socialLinks: { ...basePersona.socialLinks, linkedin: 'example', twitter: 'example' }
    },
    creative: {
        ...basePersona,
        fullName: 'Zeynep Kaya',
        title: 'Art Director',
        company: 'Studio Vivid',
        phone: '+90 544 333 22 11',
        email: 'zeynep@studiovivid.art',
        website: 'www.studiovivid.art',
        address: 'Kadıköy, Moda Cad. No:5 İstanbul',
        primaryColor: '#db2777', // Pink
        socialLinks: { ...basePersona.socialLinks, instagram: 'example', linkedin: 'example' }
    },
    startup: {
        ...basePersona,
        fullName: 'Can Yıldız',
        title: 'Co-Founder & CTO',
        company: 'Rocketship AI',
        phone: '+90 533 999 88 77',
        email: 'can@rocketship.ai',
        website: 'rocketship.ai',
        address: 'Kolektif House, Levent',
        primaryColor: '#7c3aed', // Purple
        socialLinks: { ...basePersona.socialLinks, twitter: 'example', linkedin: 'example' }
    },
    minimal: {
        ...basePersona,
        fullName: 'Elif Şahin',
        title: 'Freelance Consultant',
        company: 'ES Consultancy',
        phone: '+90 500 123 45 67',
        email: 'contact@elifsahin.com',
        website: 'elifsahin.com',
        address: 'Beşiktaş, İstanbul',
        primaryColor: '#ea580c', // Orange
        socialLinks: { ...basePersona.socialLinks, linkedin: 'example' }
    }
};

// Map template IDs to Personas to ensure visual variety
export const TEMPLATE_PERSONA_MAP: Record<number, SignatureData> = {
    1: PERSONAS.corporate,
    2: PERSONAS.tech,
    3: PERSONAS.minimal,
    4: PERSONAS.startup,
    5: PERSONAS.creative,
    6: PERSONAS.corporate, // reuse
    7: PERSONAS.tech,      // reuse
    8: PERSONAS.creative,  // reuse
    9: PERSONAS.startup,   // reuse
    10: PERSONAS.minimal,  // reuse
};
