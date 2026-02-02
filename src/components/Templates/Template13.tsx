import React from 'react';
import type { SignatureData } from '../../types/signature';

interface TemplateProps {
    data: SignatureData;
    logoSrc: string;
}

/**
 * Template 13: Corporate Legal
 * Features: Serif fonts, formal layout, confidentiality disclaimer
 */
export const Template13: React.FC<TemplateProps> = ({ data, logoSrc }) => {
    const primaryColor = data.primaryColor || '#1e3a8a'; // Dark Blue default

    return (
        <div style={{ fontFamily: 'Georgia, serif', padding: '10px', maxWidth: '600px' }}>
            <table width="100%" cellPadding="0" cellSpacing="0" border={0}>
                <tbody>
                    <tr>
                        {/* Logo Column */}
                        <td valign="top" style={{ width: '100px', paddingRight: '20px', borderRight: `3px solid ${primaryColor}` }}>
                            <img
                                src={logoSrc}
                                alt="Company Logo"
                                width="80"
                                height="80"
                                style={{ display: 'block', objectFit: 'contain' }}
                            />
                        </td>

                        {/* Info Column */}
                        <td valign="top" style={{ paddingLeft: '20px' }}>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#000000', marginBottom: '4px' }}>
                                {data.fullName}
                            </div>
                            <div style={{ fontSize: '14px', fontStyle: 'italic', color: '#555555', marginBottom: '12px' }}>
                                {data.title}
                                {data.company && <span> | <strong>{data.company}</strong></span>}
                            </div>

                            <table cellPadding="0" cellSpacing="0" border={0} style={{ fontSize: '12px', color: '#444444' }}>
                                <tbody>
                                    {data.email && (
                                        <tr>
                                            <td style={{ paddingBottom: '2px', fontWeight: 'bold', width: '60px' }}>Email:</td>
                                            <td style={{ paddingBottom: '2px' }}><a href={`mailto:${data.email}`} style={{ color: primaryColor, textDecoration: 'none' }}>{data.email}</a></td>
                                        </tr>
                                    )}
                                    {data.phone && (
                                        <tr>
                                            <td style={{ paddingBottom: '2px', fontWeight: 'bold' }}>Mobile:</td>
                                            <td style={{ paddingBottom: '2px' }}>{data.phone}</td>
                                        </tr>
                                    )}
                                    {data.website && (
                                        <tr>
                                            <td style={{ paddingBottom: '2px', fontWeight: 'bold' }}>Web:</td>
                                            <td style={{ paddingBottom: '2px' }}><a href={data.website.startsWith('http') ? data.website : `https://${data.website}`} style={{ color: primaryColor, textDecoration: 'none' }}>{data.website}</a></td>
                                        </tr>
                                    )}
                                    {data.address && (
                                        <tr>
                                            <td style={{ paddingBottom: '2px', fontWeight: 'bold' }}>Office:</td>
                                            <td style={{ paddingBottom: '2px' }}>{data.address}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </td>
                    </tr>

                    {/* Disclaimer Section */}
                    <tr>
                        <td colSpan={2} style={{ paddingTop: '15px' }}>
                            <div style={{ fontSize: '10px', color: '#888888', borderTop: '1px solid #eeeeee', paddingTop: '10px', lineHeight: '1.4' }}>
                                CONFIDENTIALITY NOTICE: The information in this email may be confidential and/or legally privileged. It has been sent for the sole use of the intended recipient(s). If the reader of this message is not an intended recipient, you are hereby notified that any unauthorized review, use, disclosure, dissemination, distribution, or copying of this communication is strictly prohibited.
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
