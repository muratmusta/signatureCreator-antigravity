import React from 'react';
import type { SignatureData, SectionType } from '../../types/signature';

interface TemplateProps {
  data: SignatureData;
  logoSrc: string;
}

/**
 * Template 2: Dynamic Centered Layou
 * Similar to Template 1 but strictly centered with styling nuances.
 */
export const Template2: React.FC<TemplateProps> = ({ data, logoSrc }) => {
  const layout = data.layout || ['avatar', 'info', 'contact', 'social'];

  const sections: Record<SectionType, React.ReactNode> = {
    avatar: (
      <tr>
        <td align="center" style={{ paddingBottom: '16px' }}>
          <img
            src={logoSrc}
            alt="Logo"
            width="90"
            height="90"
            style={{ display: 'block', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${data.primaryColor}` }}
          />
        </td>
      </tr>
    ),
    info: (
      <tr>
        <td align="center" style={{ paddingBottom: '12px' }}>
          <div style={{ fontSize: '20px', fontWeight: '900', color: '#000', textTransform: 'uppercase', letterSpacing: '1px' }}>{data.fullName}</div>
          <div style={{ fontSize: '12px', backgroundColor: data.primaryColor, color: '#fff', padding: '4px 12px', borderRadius: '20px', display: 'inline-block', fontWeight: 600, marginTop: '6px' }}>{data.title}</div>
          {data.company && <div style={{ fontSize: '14px', color: '#666', marginTop: '6px', fontStyle: 'italic' }}>{data.company}</div>}
        </td>
      </tr>
    ),
    contact: (
      <tr>
        <td align="center" style={{ paddingBottom: '16px' }}>
          <table cellPadding="0" cellSpacing="0" border={0} style={{ margin: '0 auto' }}>
            <tbody>
              {data.email && (
                <tr>
                  <td align="center" style={{ padding: '3px 0', fontSize: '13px', color: '#333' }}>
                    <a href={`mailto:${data.email}`} style={{ color: '#333', textDecoration: 'none', borderBottom: `1px solid ${data.primaryColor}` }}>{data.email}</a>
                  </td>
                </tr>
              )}
              {data.phone && (
                <tr>
                  <td align="center" style={{ padding: '3px 0', fontSize: '13px', color: '#333' }}>
                    {data.phone}
                  </td>
                </tr>
              )}
              {data.website && (
                <tr>
                  <td align="center" style={{ padding: '3px 0', fontSize: '13px', color: '#333' }}>
                    <a href={data.website.startsWith('http') ? data.website : `https://${data.website}`} style={{ color: '#333', textDecoration: 'none' }}>{data.website}</a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </td>
      </tr>
    ),
    social: (
      <tr>
        <td align="center" style={{ paddingTop: '8px' }}>
          <table cellPadding="0" cellSpacing="0" border={0} style={{ margin: '0 auto' }}>
            <tbody>
              <tr>
                {data.socialLinks.linkedin && (
                  <td style={{ padding: '0 8px' }}>
                    <a href={data.socialLinks.linkedin} style={{ textDecoration: 'none', color: data.primaryColor, fontSize: '12px', fontWeight: 'bold' }}>LN</a>
                  </td>
                )}
                {data.socialLinks.twitter && (
                  <td style={{ padding: '0 8px' }}>
                    <a href={data.socialLinks.twitter} style={{ textDecoration: 'none', color: data.primaryColor, fontSize: '12px', fontWeight: 'bold' }}>TW</a>
                  </td>
                )}
                {data.socialLinks.instagram && (
                  <td style={{ padding: '0 8px' }}>
                    <a href={data.socialLinks.instagram} style={{ textDecoration: 'none', color: data.primaryColor, fontSize: '12px', fontWeight: 'bold' }}>IG</a>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    ),
    banner: null as any
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', padding: '30px', backgroundColor: '#fff', borderTop: `4px solid ${data.primaryColor}` }}>
      <table width="100%" cellPadding="0" cellSpacing="0" border={0}>
        <tbody>
          {layout.map(key => (
            <React.Fragment key={key}>
              {sections[key]}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
