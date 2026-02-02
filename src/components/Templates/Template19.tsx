import React from 'react';
import type { SignatureData } from '../../types/signature';

interface TemplateProps {
    data: SignatureData;
    logoSrc: string;
}

/**
 * Template 19: Academic / Graduate
 * Features: Classic university look, focus on department/role
 */
export const Template19: React.FC<TemplateProps> = ({ data, logoSrc }) => {
    const primaryColor = data.primaryColor || '#7c2d12'; // Brown/Maroon common for universities

    return (
        <div style={{ fontFamily: '"Times New Roman", Times, serif', padding: '10px' }}>
            <table cellPadding="0" cellSpacing="0" border={0} style={{ borderBottom: `2px solid ${primaryColor}`, paddingBottom: '10px', marginBottom: '10px' }}>
                <tbody>
                    <tr>
                        <td valign="middle" style={{ paddingRight: '15px' }}>
                            <img
                                src={logoSrc}
                                width="60"
                                height="60"
                                alt="Uni"
                                style={{ objectFit: 'contain' }}
                            />
                        </td>
                        <td valign="middle">
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#111' }}>
                                {data.fullName}
                            </div>
                            <div style={{ fontSize: '14px', color: '#444', fontStyle: 'italic' }}>
                                {data.title}
                            </div>
                            {data.company && (
                                <div style={{ fontSize: '14px', color: primaryColor, fontWeight: 'bold' }}>
                                    {data.company}
                                </div>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div style={{ fontSize: '12px', fontFamily: 'Arial, sans-serif', color: '#555' }}>
                {data.phone && <span style={{ marginRight: '15px' }}>📞 {data.phone}</span>}
                {data.email && <span style={{ marginRight: '15px' }}><a href={`mailto:${data.email}`} style={{ color: '#555', textDecoration: 'none' }}>✉️ {data.email}</a></span>}
                {data.website && <span><a href={data.website.startsWith('http') ? data.website : `https://${data.website}`} style={{ color: '#555', textDecoration: 'none' }}>🌐 {data.website.replace(/^https?:\/\//, '')}</a></span>}
            </div>
        </div>
    );
};
