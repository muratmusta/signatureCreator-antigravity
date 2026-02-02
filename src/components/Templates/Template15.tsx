import React from 'react';
import type { SignatureData } from '../../types/signature';

interface TemplateProps {
    data: SignatureData;
    logoSrc: string;
}

/**
 * Template 15: Social Influencer
 * Features: Large avatar, vibrant colors, social-first layout
 */
export const Template15: React.FC<TemplateProps> = ({ data, logoSrc }) => {
    const primaryColor = data.primaryColor || '#8b5cf6'; // Violet default

    return (
        <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', padding: '10px' }}>
            <table cellPadding="0" cellSpacing="0" border={0}>
                <tbody>
                    <tr>
                        {/* Left: Big Avatar */}
                        <td style={{ paddingRight: '20px', verticalAlign: 'middle' }}>
                            <img
                                src={logoSrc}
                                alt="Profile"
                                width="120"
                                height="120"
                                style={{
                                    borderRadius: '50%',
                                    display: 'block',
                                    border: `4px solid ${primaryColor}`,
                                    padding: '2px',
                                    objectFit: 'cover'
                                }}
                            />
                        </td>

                        {/* Right: Info */}
                        <td style={{ verticalAlign: 'middle' }}>
                            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '900', color: '#111', lineHeight: '1.2' }}>
                                {data.fullName}
                            </h1>
                            <div style={{
                                fontSize: '15px',
                                fontWeight: 'bold',
                                color: '#fff',
                                backgroundColor: primaryColor,
                                display: 'inline-block',
                                padding: '4px 12px',
                                borderRadius: '4px',
                                marginTop: '6px',
                                marginBottom: '10px'
                            }}>
                                {data.title}
                            </div>

                            {/* Socials - Priority */}
                            {(data.socialLinks.linkedin || data.socialLinks.twitter || data.socialLinks.instagram) && (
                                <div style={{ marginBottom: '10px' }}>
                                    {data.socialLinks.instagram && (
                                        <a href={data.socialLinks.instagram} style={{ textDecoration: 'none', marginRight: '10px', display: 'inline-block' }}>
                                            <img src="https://img.icons8.com/color/48/instagram-new.png" width="32" height="32" alt="IG" style={{ borderRadius: '8px' }} />
                                        </a>
                                    )}
                                    {data.socialLinks.twitter && (
                                        <a href={data.socialLinks.twitter} style={{ textDecoration: 'none', marginRight: '10px', display: 'inline-block' }}>
                                            <img src="https://img.icons8.com/color/48/twitter.png" width="32" height="32" alt="TW" style={{ borderRadius: '8px' }} />
                                        </a>
                                    )}
                                    {data.socialLinks.linkedin && (
                                        <a href={data.socialLinks.linkedin} style={{ textDecoration: 'none', marginRight: '10px', display: 'inline-block' }}>
                                            <img src="https://img.icons8.com/color/48/linkedin.png" width="32" height="32" alt="LI" style={{ borderRadius: '8px' }} />
                                        </a>
                                    )}
                                </div>
                            )}

                            {/* Contact - Minimal */}
                            <div style={{ fontSize: '13px', color: '#555' }}>
                                {data.email && <div>✉️ <a href={`mailto:${data.email}`} style={{ color: '#555', textDecoration: 'none' }}>{data.email}</a></div>}
                                {data.website && <div>🌐 <a href={data.website.startsWith('http') ? data.website : `https://${data.website}`} style={{ color: '#555', textDecoration: 'none' }}>{data.website.replace(/^https?:\/\//, '')}</a></div>}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
