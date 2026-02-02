import React from 'react';
import type { SignatureData, SectionType } from '../../types/signature';

interface TemplateProps {
  data: SignatureData;
  logoSrc: string;
}

/**
 * Template 6: Boxed Layout
 * Content is contained within a styled box.
 */
export const Template6: React.FC<TemplateProps> = ({ data, logoSrc }) => {
  const layout = data.layout || ['avatar', 'info', 'contact', 'social'];

  const sections: Record<SectionType, React.ReactNode> = {
    avatar: (
      <tr><td style={{ paddingRight: '20px' }} valign="middle">
        <img src={logoSrc} width="80" height="80" style={{ borderRadius: '0', display: 'block' }} alt="Avatar" />
      </td></tr>
    ),
    info: (
      <tr><td style={{ paddingBottom: '10px' }}>
        <div style={{ color: '#fff', backgroundColor: data.primaryColor, padding: '5px 10px', display: 'inline-block', fontWeight: 'bold', fontSize: '14px' }}>{data.fullName}</div>
        <div style={{ marginTop: '6px', color: '#555', fontSize: '13px' }}>{data.title}</div>
      </td></tr>
    ),
    contact: (
      <tr><td style={{ paddingBottom: '10px' }}>
        <table cellPadding="0" cellSpacing="0" border={0}>
          <tbody>
            {data.email && <tr><td style={{ fontSize: '12px', color: '#777' }}>✉️ {data.email}</td></tr>}
            {data.phone && <tr><td style={{ fontSize: '12px', color: '#777' }}>📞 {data.phone}</td></tr>}
          </tbody>
        </table>
      </td></tr>
    ),
    social: (
      <tr><td>
        {/* Simple text links for compactness */}
        <div style={{ fontSize: '11px', color: '#999' }}>
          Connect with me:
          {data.socialLinks.linkedin && <a href={data.socialLinks.linkedin} style={{ color: data.primaryColor, marginLeft: '5px' }}>LinkedIn</a>}
          {data.socialLinks.twitter && <a href={data.socialLinks.twitter} style={{ color: data.primaryColor, marginLeft: '5px' }}>Twitter</a>}
        </div>
      </td></tr>
    ),
    banner: null as any
  };

  return (
    <div style={{ fontFamily: 'Tahoma, sans-serif', padding: '20px', border: `2px solid ${data.primaryColor}`, display: 'inline-block' }}>
      <table cellPadding="0" cellSpacing="0" border={0}>
        <tbody>
          {/* Simple Hybrid: If Avatar is first, put sidebar. Else Vertical. */}
          {layout[0] === 'avatar' ? (
            <tr>
              {/* Left: Avatar */}
              <td style={{ paddingRight: '20px' }} valign="middle">
                <img src={logoSrc} width="80" height="80" style={{ borderRadius: '0', display: 'block' }} alt="Avatar" />
              </td>
              {/* Right: Rest */}
              <td valign="top">
                <table cellPadding="0" cellSpacing="0" border={0}>
                  <tbody>
                    {layout.filter(k => k !== 'avatar').map(key => <React.Fragment key={key}>{sections[key]}</React.Fragment>)}
                  </tbody>
                </table>
              </td>
            </tr>
          ) : (
            // Vertical
            layout.map(key => <React.Fragment key={key}>{sections[key]}</React.Fragment>)
          )}
        </tbody>
      </table>
    </div>
  );
};
