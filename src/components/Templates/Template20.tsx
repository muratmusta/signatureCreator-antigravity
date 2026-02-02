import React from 'react';
import type { SignatureData } from '../../types/signature';

interface TemplateProps {
    data: SignatureData;
    logoSrc: string;
}

/**
 * Template 20: Executive Minimal
 * Features: High whitespace, signature-like logo, very clean
 */
export const Template20: React.FC<TemplateProps> = ({ data, logoSrc }) => {
    const primaryColor = data.primaryColor || '#000';

    return (
        <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', padding: '20px' }}>
            <div style={{ paddingBottom: '20px' }}>
                <img
                    src={logoSrc}
                    width="150"
                    height="60"
                    alt="Signature"
                    style={{ objectFit: 'contain', display: 'block' }}
                />
            </div>

            <div style={{ borderLeft: '2px solid #000', paddingLeft: '15px' }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', color: '#000' }}>
                    {data.fullName}
                </div>

                <div style={{ fontSize: '12px', letterSpacing: '1px', color: '#666', marginTop: '5px' }}>
                    {data.title}
                    {data.company && <span>, {data.company}</span>}
                </div>

                <div style={{ marginTop: '15px', fontSize: '11px', color: '#888' }}>
                    {data.email && <div style={{ marginBottom: '3px' }}><a href={`mailto:${data.email}`} style={{ color: '#888', textDecoration: 'none' }}>{data.email}</a></div>}
                    {data.phone && <div style={{ marginBottom: '3px' }}>{data.phone}</div>}
                    {data.website && <div><a href={data.website.startsWith('http') ? data.website : `https://${data.website}`} style={{ color: '#888', textDecoration: 'none' }}>{data.website.replace(/^https?:\/\//, '')}</a></div>}
                </div>
            </div>
        </div>
    );
};
