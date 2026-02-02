import React from 'react';
import type { SignatureData } from '../../types/signature';

interface TemplateProps {
    data: SignatureData;
    logoSrc: string;
}

/**
 * Template 14: Compact Badge
 * Features: Card-like appearance, small footprint, condensed info
 */
export const Template14: React.FC<TemplateProps> = ({ data, logoSrc }) => {
    const primaryColor = data.primaryColor || '#000000';

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', display: 'inline-block' }}>
            <table cellPadding="0" cellSpacing="0" border={0} style={{
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                backgroundColor: '#fafafa',
                width: '320px'
            }}>
                <tbody>
                    <tr>
                        <td style={{ padding: '12px' }}>
                            <table width="100%" cellPadding="0" cellSpacing="0" border={0}>
                                <tbody>
                                    <tr>
                                        <td width="50" valign="top">
                                            <img
                                                src={logoSrc}
                                                alt="Avatar"
                                                width="40"
                                                height="40"
                                                style={{ borderRadius: '50%', display: 'block' }}
                                            />
                                        </td>
                                        <td valign="top" style={{ paddingLeft: '10px' }}>
                                            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#171717' }}>{data.fullName}</div>
                                            <div style={{ fontSize: '12px', color: primaryColor }}>{data.title}</div>

                                            <div style={{ marginTop: '8px', fontSize: '11px', color: '#525252' }}>
                                                {data.phone && <div style={{ marginBottom: '2px' }}>📞 {data.phone}</div>}
                                                {data.email && <div style={{ marginBottom: '2px' }}>✉️ {data.email}</div>}
                                                {data.website && <div>🌐 {data.website.replace(/^https?:\/\//, '')}</div>}
                                            </div>
                                        </td>
                                        <td width="30" valign="top" align="right">
                                            {data.socialLinks.linkedin && (
                                                <a href={data.socialLinks.linkedin} style={{ display: 'block', marginBottom: '4px' }}>
                                                    <img src="https://img.icons8.com/material-outlined/24/000000/linkedin.png" width="16" height="16" alt="in" />
                                                </a>
                                            )}
                                            {data.socialLinks.twitter && (
                                                <a href={data.socialLinks.twitter} style={{ display: 'block', marginBottom: '4px' }}>
                                                    <img src="https://img.icons8.com/material-outlined/24/000000/twitter.png" width="16" height="16" alt="x" />
                                                </a>
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
