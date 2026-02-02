import React from 'react';
import type { SignatureData } from '../../types/signature';

interface TemplateProps {
    data: SignatureData;
    logoSrc: string;
}

/**
 * Template 18: Medical Professional
 * Features: Clean, trustworthy design, prominent credentials
 */
export const Template18: React.FC<TemplateProps> = ({ data, logoSrc }) => {
    const primaryColor = data.primaryColor || '#0ea5e9'; // Sky blue

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '10px' }}>
            <table cellPadding="0" cellSpacing="0" border={0}>
                <tbody>
                    <tr>
                        <td valign="middle" style={{ paddingRight: '20px' }}>
                            <img
                                src={logoSrc}
                                width="100"
                                height="100"
                                alt="Dr"
                                style={{ borderRadius: '50%', objectFit: 'cover' }}
                            />
                        </td>
                        <td valign="middle">
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a' }}>
                                {data.fullName}
                            </div>
                            <div style={{
                                fontSize: '13px',
                                color: '#fff',
                                backgroundColor: primaryColor,
                                display: 'inline-block',
                                padding: '3px 10px',
                                borderRadius: '12px',
                                margin: '5px 0 10px 0',
                                fontWeight: 'bold'
                            }}>
                                {data.title}
                            </div>

                            <table cellPadding="0" cellSpacing="0" border={0} style={{ fontSize: '13px', color: '#334155' }}>
                                <tbody>
                                    {data.company && <tr><td colSpan={2} style={{ paddingBottom: '4px', fontWeight: 'bold' }}>{data.company}</td></tr>}
                                    {data.phone && <tr><td style={{ color: primaryColor, paddingRight: '5px' }}>T:</td><td>{data.phone}</td></tr>}
                                    {data.email && <tr><td style={{ color: primaryColor, paddingRight: '5px' }}>E:</td><td><a href={`mailto:${data.email}`} style={{ color: '#334155', textDecoration: 'none' }}>{data.email}</a></td></tr>}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
