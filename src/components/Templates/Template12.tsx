import React from 'react';
import type { SignatureData } from '../../types/signature';

interface TemplateProps {
    data: SignatureData;
    logoSrc: string;
}

/**
 * Template 12: Creative Centered
 * Features: Dashed border avatar, lowercase typography, centered layout
 */
export const Template12: React.FC<TemplateProps> = ({ data, logoSrc }) => {
    const primaryColor = data.primaryColor || '#ec4899';

    return (
        <div style={{ fontFamily: 'Verdana, sans-serif', padding: '10px' }}>
            <table width="100%" cellPadding="0" cellSpacing="0" border={0} style={{ margin: '0 auto', maxWidth: '400px' }}>
                <tbody>
                    {/* Avatar Section */}
                    <tr>
                        <td align="center" style={{ paddingBottom: '16px' }}>
                            <div style={{
                                display: 'inline-block',
                                padding: '6px',
                                border: `2px dashed ${primaryColor}`,
                                borderRadius: '50%'
                            }}>
                                <img
                                    src={logoSrc}
                                    alt="Profile"
                                    width="100"
                                    height="100"
                                    style={{
                                        display: 'block',
                                        borderRadius: '50%',
                                        width: '100px',
                                        height: '100px',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                        </td>
                    </tr>

                    {/* Info Section */}
                    <tr>
                        <td align="center" style={{ paddingBottom: '8px' }}>
                            <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#1a202c', letterSpacing: '-0.5px' }}>
                                {data.fullName}
                            </div>
                            <div style={{
                                fontSize: '14px',
                                color: primaryColor,
                                fontWeight: 'bold',
                                marginTop: '4px',
                                background: `${primaryColor}15`, // very light opacity
                                display: 'inline-block',
                                padding: '4px 12px',
                                borderRadius: '20px'
                            }}>
                                {data.title}
                            </div>
                        </td>
                    </tr>

                    {/* Contact Section */}
                    <tr>
                        <td align="center" style={{ paddingBottom: '20px' }}>
                            <table cellPadding="0" cellSpacing="0" border={0}>
                                <tbody>
                                    <tr>
                                        {data.email && (
                                            <td style={{ padding: '0 8px' }}>
                                                <a href={`mailto:${data.email}`} style={{ textDecoration: 'none', color: '#4a5568', fontSize: '13px' }}>
                                                    ✉️ {data.email}
                                                </a>
                                            </td>
                                        )}
                                        {data.website && (
                                            <td style={{ padding: '0 8px', borderLeft: '1px solid #cbd5e0' }}>
                                                <a href={data.website.startsWith('http') ? data.website : `https://${data.website}`} style={{ textDecoration: 'none', color: '#4a5568', fontSize: '13px' }}>
                                                    🌐 {data.website.replace(/^https?:\/\//, '')}
                                                </a>
                                            </td>
                                        )}
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>

                    {/* Social Section */}
                    {(data.socialLinks.linkedin || data.socialLinks.twitter || data.socialLinks.instagram) && (
                        <tr>
                            <td align="center" style={{ borderTop: `1px solid ${primaryColor}40`, paddingTop: '16px' }}>
                                <table cellPadding="0" cellSpacing="0" border={0}>
                                    <tbody>
                                        <tr>
                                            {data.socialLinks.linkedin && (
                                                <td style={{ padding: '0 10px' }}>
                                                    <a href={data.socialLinks.linkedin}>
                                                        <img src="https://img.icons8.com/ios-filled/50/000000/linkedin.png" width="20" height="20" alt="in" />
                                                    </a>
                                                </td>
                                            )}
                                            {data.socialLinks.twitter && (
                                                <td style={{ padding: '0 10px' }}>
                                                    <a href={data.socialLinks.twitter}>
                                                        <img src="https://img.icons8.com/ios-filled/50/000000/twitter.png" width="20" height="20" alt="tw" />
                                                    </a>
                                                </td>
                                            )}
                                            {data.socialLinks.instagram && (
                                                <td style={{ padding: '0 10px' }}>
                                                    <a href={data.socialLinks.instagram}>
                                                        <img src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png" width="20" height="20" alt="ig" />
                                                    </a>
                                                </td>
                                            )}
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
