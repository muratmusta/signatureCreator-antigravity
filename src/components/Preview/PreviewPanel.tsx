import React, { useMemo } from 'react';
import { useSignature } from '../../context/SignatureContext';
import { getTemplate } from '../Templates';
import { generateAutoLogo } from '../../utils/generateLogo';

export const PreviewPanel: React.FC = () => {
    const { data, selectedTemplate } = useSignature();

    // Get the logo source (Base64 or auto-generated)
    const logoSrc = useMemo(() => {
        if (data.useAutoLogo) {
            return generateAutoLogo(data.fullName, data.primaryColor);
        }
        return data.logoBase64 || generateAutoLogo(data.fullName, data.primaryColor);
    }, [data.logoBase64, data.useAutoLogo, data.fullName, data.primaryColor]);

    // Get the selected template component
    const TemplateComponent = getTemplate(selectedTemplate);

    // Check if user has entered minimum data
    const hasMinimumData = data.fullName.trim().length > 0;

    if (!hasMinimumData) {
        return (
            <div className="text-center p-8">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Veri Bekleniyor</h3>
                <p className="text-gray-500 text-sm mt-1">Sol panelden bilgilerinizi girmeye başlayın.</p>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <TemplateComponent data={data} logoSrc={logoSrc} />
        </div>
    );
};
