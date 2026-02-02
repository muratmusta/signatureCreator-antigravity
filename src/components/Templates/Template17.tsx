import React from 'react';
import type { SignatureData } from '../../types/signature';

interface TemplateProps {
    data: SignatureData;
    logoSrc: string;
}

/**
 * Template 17: Real Estate Professional
 * Features: Gold accents, high-end feel, prominent contact info
 */
export const Template17: React.FC<TemplateProps> = ({ data, logoSrc }) => {
    const primaryColor = data.primaryColor || '#cfa24e'; // Gold/Bronze default

    return (
        <div style={{ fontFamily: 'Georgia, serif', padding: '10px' }}>
            <table cellPadding="0" cellSpacing="0" border={0}>
                <tbody>
                    <tr>
                        <td valign="top" style={{ paddingRight: '15px' }}>
                            <img
                                src={logoSrc}
                                width="90"
                                height="110"
                                alt="Agent"
                                style={{ display: 'block', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </td>
                        <td valign="top" style={{ borderLeft: `1px solid ${primaryColor}`, paddingLeft: '15px' }}>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#000', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                {data.fullName}
                            </div>
                            <div style={{ fontSize: '12px', color: primaryColor, fontWeight: 'bold', marginBottom: '8px' }}>
                                {data.title} {data.company ? `| ${data.company}` : ''}
                            </div>

                            <div style={{ fontSize: '12px', color: '#444', lineHeight: '1.6', fontFamily: 'Arial, sans-serif' }}>
                                {data.phone && <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ color: primaryColor, marginRight: '5px' }}>phone:</span> {data.phone}</div>}
                                {data.email && <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ color: primaryColor, marginRight: '5px' }}>email:</span> <a href={`mailto:${data.email}`} style={{ color: '#444', textDecoration: 'none' }}>{data.email}</a></div>}
                                {data.website && <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ color: primaryColor, marginRight: '5px' }}>web:</span> <a href={data.website.startsWith('http') ? data.website : `https://${data.website}`} style={{ color: '#444', textDecoration: 'none' }}>{data.website.replace(/^https?:\/\//, '')}</a></div>}
                                {data.address && <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ color: primaryColor, marginRight: '5px' }}>office:</span> {data.address}</div>}
                            </div>

                            <div style={{ marginTop: '10px' }}>
                                {/* Simple text icon row */}
                                {data.socialLinks.linkedin && <a href={data.socialLinks.linkedin} style={{ color: primaryColor, textDecoration: 'none', fontSize: '11px', marginRight: '10px' }}>LINKEDIN</a>}
                                {data.socialLinks.instagram && <a href={data.socialLinks.instagram} style={{ color: primaryColor, textDecoration: 'none', fontSize: '11px', marginRight: '10px' }}>INSTAGRAM</a>}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
