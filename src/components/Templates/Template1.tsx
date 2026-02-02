import React from 'react';
import type { SignatureData, SectionType } from '../../types/signature';

interface TemplateProps {
  data: SignatureData;
  logoSrc: string;
}

/**
 * Template 1: Dynamic Vertical Stack
 * Fully controllable via Drag & Drop Layout
 */
export const Template1: React.FC<TemplateProps> = ({ data, logoSrc }) => {
  // Default layout fallback
  const layout = data.layout || ['avatar', 'info', 'contact', 'social'];

  const sections: Record<SectionType, React.ReactNode> = {
    avatar: (
      <tr>
        <td align="center" style={{ paddingBottom: '16px' }}>
          <img
            src={logoSrc}
            alt="Logo"
            width="100"
            height="100"
            style={{ display: 'block', border: 0, borderRadius: '50%', objectFit: 'cover' }}
          />
        </td>
      </tr>
    ),
    info: (
      <tr>
        <td align="center" style={{ paddingBottom: '12px' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a1a1a', letterSpacing: '-0.5px' }}>{data.fullName}</div>
          <div style={{ fontSize: '14px', color: data.primaryColor, fontWeight: 600, marginTop: '2px' }}>{data.title}</div>
          {data.company && <div style={{ fontSize: '14px', color: '#666', marginTop: '2px' }}>{data.company}</div>}
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
                  <td style={{ padding: '2px 0', fontSize: '13px', color: '#555' }}>
                    <span style={{ opacity: 0.6 }}>✉️</span> <a href={`mailto:${data.email}`} style={{ color: '#555', textDecoration: 'none' }}>{data.email}</a>
                  </td>
                </tr>
              )}
              {data.phone && (
                <tr>
                  <td style={{ padding: '2px 0', fontSize: '13px', color: '#555' }}>
                    <span style={{ opacity: 0.6 }}>📞</span> {data.phone}
                  </td>
                </tr>
              )}
              {data.website && (
                <tr>
                  <td style={{ padding: '2px 0', fontSize: '13px', color: '#555' }}>
                    <span style={{ opacity: 0.6 }}>🌐</span> <a href={data.website.startsWith('http') ? data.website : `https://${data.website}`} style={{ color: '#555', textDecoration: 'none' }}>{data.website}</a>
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
        <td align="center" style={{ paddingTop: '8px', borderTop: '1px solid #eee' }}>
          <table cellPadding="0" cellSpacing="0" border={0} style={{ margin: '0 auto' }}>
            <tbody>
              <tr>
                {data.socialLinks.linkedin && (
                  <td style={{ padding: '0 5px' }}>
                    <a href={data.socialLinks.linkedin}><img src="https://img.icons8.com/color/48/linkedin.png" width="24" height="24" alt="LI" /></a>
                  </td>
                )}
                {data.socialLinks.twitter && (
                  <td style={{ padding: '0 5px' }}>
                    <a href={data.socialLinks.twitter}><img src="https://img.icons8.com/color/48/twitter.png" width="24" height="24" alt="TW" /></a>
                  </td>
                )}
                {data.socialLinks.instagram && (
                  <td style={{ padding: '0 5px' }}>
                    <a href={data.socialLinks.instagram}><img src="https://img.icons8.com/color/48/instagram-new.png" width="24" height="24" alt="IG" /></a>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    ),
    banner: null as any // Placeholder
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', padding: '20px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
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
