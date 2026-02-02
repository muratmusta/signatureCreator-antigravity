import React from 'react';
import type { SignatureData, SectionType } from '../../types/signature';

interface TemplateProps {
    data: SignatureData;
    logoSrc: string;
}

/**
 * Template 11: Tech Minimalist (Horizontal Layout)
 * Features: Squared rounded avatar, vertical divider, compact typography
 */
export const Template11: React.FC<TemplateProps> = ({ data, logoSrc }) => {
    // Right column sections that can be reordered (if we wanted to support dnd here)
    // For now, we fix the order to ensure the design integrity of this specific template

    const primaryColor = data.primaryColor || '#000000';

    return (
        <div style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: '10px' }}>
            <table cellPadding="0" cellSpacing="0" border={0} style={{ width: 'auto' }}>
                <tbody>
                    <tr>
                        {/* Left Column: Avatar */}
                        <td style={{ verticalAlign: 'top', paddingRight: '24px' }}>
                            <img
                                src={logoSrc}
                                alt="Logo"
                                width="96"
                                height="96"
                                style={{
                                    display: 'block',
                                    borderRadius: '16px', // Modern tech look
                                    objectFit: 'cover',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                                }}
                            />
                        </td>

                        {/* Divider */}
                        <td style={{ width: '2px', verticalAlign: 'top', paddingTop: '4px', paddingBottom: '4px' }}>
                            <div style={{ width: '2px', height: '100%', minHeight: '80px', backgroundColor: '#e5e7eb', borderRadius: '1px' }}></div>
                        </td>

                        {/* Right Column: Info & Details */}
                        <td style={{ verticalAlign: 'top', paddingLeft: '24px' }}>
                            <table cellPadding="0" cellSpacing="0" border={0}>
                                <tbody>
                                    {/* Name & Title */}
                                    <tr>
                                        <td style={{ paddingBottom: '12px' }}>
                                            <div style={{
                                                fontSize: '18px',
                                                fontWeight: '800',
                                                color: '#111827',
                                                letterSpacing: '-0.025em',
                                                lineHeight: '1.2'
                                            }}>
                                                {data.fullName}
                                            </div>
                                            <div style={{
                                                fontSize: '13px',
                                                color: primaryColor,
                                                fontWeight: '600',
                                                marginTop: '4px',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em'
                                            }}>
                                                {data.title}
                                                {data.company && <span style={{ color: '#9ca3af', fontWeight: '400' }}> • {data.company}</span>}
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Contact Grid */}
                                    <tr>
                                        <td style={{ paddingBottom: '16px' }}>
                                            <table cellPadding="0" cellSpacing="0" border={0}>
                                                <tbody>
                                                    {data.email && (
                                                        <tr>
                                                            <td style={{ paddingBottom: '4px', paddingRight: '16px' }}>
                                                                <a href={`mailto:${data.email}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                                                                    <span style={{ fontSize: '13px', color: '#4b5563', fontWeight: '500' }}>{data.email}</span>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    )}
                                                    {data.phone && (
                                                        <tr>
                                                            <td style={{ paddingBottom: '4px', paddingRight: '16px' }}>
                                                                <span style={{ fontSize: '13px', color: '#4b5563', fontWeight: '500' }}>{data.phone}</span>
                                                            </td>
                                                        </tr>
                                                    )}
                                                    {data.website && (
                                                        <tr>
                                                            <td style={{ paddingBottom: '4px' }}>
                                                                <a href={data.website.startsWith('http') ? data.website : `https://${data.website}`} style={{ textDecoration: 'none' }}>
                                                                    <span style={{ fontSize: '13px', color: primaryColor, fontWeight: '600' }}>{data.website.replace(/^https?:\/\//, '')}</span>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>

                                    {/* Social Icons (Monochrome/Simple) */}
                                    {(data.socialLinks.linkedin || data.socialLinks.twitter || data.socialLinks.instagram) && (
                                        <tr>
                                            <td>
                                                <table cellPadding="0" cellSpacing="0" border={0}>
                                                    <tbody>
                                                        <tr>
                                                            {data.socialLinks.linkedin && (
                                                                <td style={{ paddingRight: '8px' }}>
                                                                    <a href={data.socialLinks.linkedin} style={{ display: 'inline-block' }}>
                                                                        <img src="https://cdn.simpleicons.org/linkedin/9ca3af" width="16" height="16" alt="LI" style={{ display: 'block' }} />
                                                                    </a>
                                                                </td>
                                                            )}
                                                            {data.socialLinks.twitter && (
                                                                <td style={{ paddingRight: '8px' }}>
                                                                    <a href={data.socialLinks.twitter} style={{ display: 'inline-block' }}>
                                                                        <img src="https://cdn.simpleicons.org/x/9ca3af" width="16" height="16" alt="X" style={{ display: 'block' }} />
                                                                    </a>
                                                                </td>
                                                            )}
                                                            {data.socialLinks.instagram && (
                                                                <td style={{ paddingRight: '8px' }}>
                                                                    <a href={data.socialLinks.instagram} style={{ display: 'inline-block' }}>
                                                                        <img src="https://cdn.simpleicons.org/instagram/9ca3af" width="16" height="16" alt="IG" style={{ display: 'block' }} />
                                                                    </a>
                                                                </td>
                                                            )}
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    )}
                                    {/* Badges */}
                                    {data.badges && data.badges.length > 0 && (
                                        <tr>
                                            <td style={{ paddingTop: '16px' }}>
                                                <table cellPadding="0" cellSpacing="0" border={0}>
                                                    <tbody>
                                                        <tr>
                                                            {data.badges.map((badge) => (
                                                                <td key={badge.id} style={{ paddingRight: '8px' }}>
                                                                    {badge.linkUrl ? (
                                                                        <a href={badge.linkUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
                                                                            <img src={badge.imageUrl} alt={badge.altText} height="24" style={{ display: 'block', height: '24px' }} />
                                                                        </a>
                                                                    ) : (
                                                                        <img src={badge.imageUrl} alt={badge.altText} height="24" style={{ display: 'block', height: '24px' }} />
                                                                    )}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table >
        </div >
    );
};
