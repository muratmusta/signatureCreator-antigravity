import React from 'react';
import type { SignatureData, SectionType } from '../../types/signature';

interface TemplateProps {
  data: SignatureData;
  logoSrc: string;
}

/**
 * Template 4: Corporate Left Bar
 * Features a colored bar on the left.
 * Dynamic Layout: Adapts layout based on sections.
 */
export const Template4: React.FC<TemplateProps> = ({ data, logoSrc }) => {
  const layout = data.layout || ['avatar', 'info', 'contact', 'social'];

  const sections: Record<SectionType, React.ReactNode> = {
    avatar: (
      <tr><td style={{ paddingBottom: '10px' }}>
        <img src={logoSrc} width="64" height="64" style={{ borderRadius: '4px', display: 'block' }} alt="Avatar" />
      </td></tr>
    ),
    info: (
      <tr><td style={{ paddingBottom: '8px' }}>
        <div style={{ color: data.primaryColor, fontWeight: 'bold', fontSize: '15px' }}>{data.fullName}</div>
        <div style={{ color: '#333', fontSize: '12px' }}>{data.title}</div>
        <div style={{ color: '#666', fontSize: '11px', textTransform: 'uppercase', marginTop: '2px' }}>{data.company}</div>
      </td></tr>
    ),
    contact: (
      <tr><td style={{ paddingBottom: '8px' }}>
        <div style={{ fontSize: '11px', color: '#555', lineHeight: '1.4' }}>
          {data.email && <div>E: <a href={`mailto:${data.email}`} style={{ textDecoration: 'none', color: '#555' }}>{data.email}</a></div>}
          {data.phone && <div>P: {data.phone}</div>}
          {data.website && <div>W: <a href={data.website} style={{ textDecoration: 'none', color: '#555' }}>{data.website}</a></div>}
        </div>
      </td></tr>
    ),
    social: (
      <tr><td style={{ paddingTop: '4px' }}>
        {data.socialLinks.linkedin && <a href={data.socialLinks.linkedin} style={{ marginRight: '8px' }}><img src="https://img.icons8.com/color/48/linkedin.png" width="16" height="16" alt="LI" style={{ display: 'inline-block' }} /></a>}
        {data.socialLinks.twitter && <a href={data.socialLinks.twitter} style={{ marginRight: '8px' }}><img src="https://img.icons8.com/color/48/twitter.png" width="16" height="16" alt="TW" style={{ display: 'inline-block' }} /></a>}
        {data.socialLinks.instagram && <a href={data.socialLinks.instagram} style={{ marginRight: '8px' }}><img src="https://img.icons8.com/color/48/instagram-new.png" width="16" height="16" alt="IG" style={{ display: 'inline-block' }} /></a>}
      </td></tr>
    ),
    banner: null as any
  };

  return (
    <div style={{ fontFamily: 'Verdana, sans-serif', padding: '10px', backgroundColor: '#fff' }}>
      <table cellPadding="0" cellSpacing="0" border={0}>
        <tbody>
          <tr>
            {/* Colored Bar */}
            <td width="4" style={{ backgroundColor: data.primaryColor, borderRadius: '2px' }}></td>
            <td width="15"></td>
            {/* Content Column */}
            <td valign="top">
              <table cellPadding="0" cellSpacing="0" border={0}>
                <tbody>
                  {layout.map(key => <React.Fragment key={key}>{sections[key]}</React.Fragment>)}
                </tbody>
              </table>

              {data.badges && data.badges.length > 0 && (
                <div style={{ paddingTop: '12px' }}>
                  {data.badges.map((badge) => (
                    <div key={badge.id} style={{ display: 'inline-block', marginRight: '8px' }}>
                      {badge.linkUrl ? (
                        <a href={badge.linkUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
                          <img src={badge.imageUrl} alt={badge.altText} height="24" style={{ display: 'block', height: '24px' }} />
                        </a>
                      ) : (
                        <img src={badge.imageUrl} alt={badge.altText} height="24" style={{ display: 'block', height: '24px' }} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
