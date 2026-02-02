import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { render } from '@react-email/render';
import { Template1 } from '@/components/Templates/Template1';
import { Template1Email } from '@/components/Templates/Template1Email';
import { Template2 } from '@/components/Templates/Template2';
import { Template3 } from '@/components/Templates/Template3';
import { Template4 } from '@/components/Templates/Template4';
import { Template5 } from '@/components/Templates/Template5';
import { Template6 } from '@/components/Templates/Template6';
import { Template7 } from '@/components/Templates/Template7';
import { Template8 } from '@/components/Templates/Template8';
import { Template9 } from '@/components/Templates/Template9';
import { Template10 } from '@/components/Templates/Template10';
import type { SignatureData, TemplateId } from '@/types/signature';
import { generateAutoLogo } from '@/utils/generateLogo';

export const renderSignatureToHtml = async (
    templateId: number,
    data: SignatureData
): Promise<string> => {
    const logoSrc = data.useAutoLogo
        ? generateAutoLogo(data.fullName, data.primaryColor)
        : (data.logoBase64 || '');

    const brandingHtml = (data.showBranding !== false) ? `
        <br />
        <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px;">
            <tr>
                <td style="font-family: Arial, sans-serif; font-size: 10px; color: #999;">
                    Created with <a href="https://signatureos.com?utm_source=signature_footer" target="_blank" style="color: #999; text-decoration: none; font-weight: bold;">SignatureOS</a>
                </td>
            </tr>
        </table>
    ` : '';

    // Special handling for Template 1 (React Email Engine)
    if (templateId === 1) {
        try {
            const html = await render(<Template1Email data={data} logoSrc={logoSrc} />, {
                pretty: true,
            });
            if (brandingHtml) {
                return html.replace('</body>', `${brandingHtml}</body>`);
            }
            return html;
        } catch (e) {
            console.error("React Email Render Error", e);
            // Fallback to old engine if fails
        }
    }

    let Component;
    switch (templateId) {
        case 1: Component = Template1; break; // Fallback
        case 2: Component = Template2; break;
        case 3: Component = Template3; break;
        case 4: Component = Template4; break;
        case 5: Component = Template5; break;
        case 6: Component = Template6; break;
        case 7: Component = Template7; break;
        case 8: Component = Template8; break;
        case 9: Component = Template9; break;
        case 10: Component = Template10; break;
        default: Component = Template1;
    }

    const staticHtml = renderToStaticMarkup(
        <Component data={data} logoSrc={logoSrc} />
    );

    return `<!DOCTYPE html><html><body>${staticHtml}${brandingHtml}</body></html>`;
};
