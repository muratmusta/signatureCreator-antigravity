import React from 'react';
import type { SignatureData, SectionType } from '../../types/signature';
import { normalizeUrl } from '../../utils/url';

interface TemplateProps {
  data: SignatureData;
  logoSrc: string;
}

/**
 * Template 1: Dynamic Vertical Stack
 * High-Contrast Premium Version
 */
export const Template1: React.FC<TemplateProps> = ({ data, logoSrc }) => {
  const layout = data.layout || ['avatar', 'info', 'contact', 'social'];

  const sections: Record<SectionType, React.ReactNode> = {
    avatar: (
      <tr>
        <td align="center" style={{ paddingBottom: '20px' }}>
          <img
            src={logoSrc}
            alt="Logo"
            width="80"
            height="80"
            style={{ display: 'block', border: 0, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
          />
        </td>
      </tr>
    ),
    info: (
      <tr>
        <td align="center" style={{ paddingBottom: '16px' }}>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#000000', letterSpacing: '-0.03em', lineHeight: '1.1' }}>{data.fullName}</div>
          <div style={{ fontSize: '13px', color: data.primaryColor, fontWeight: '800', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{data.title}</div>
          {data.company && <div style={{ fontSize: '14px', color: '#666', marginTop: '6px', fontWeight: '500' }}>{data.company}</div>}
        </td>
      </tr>
    ),
    contact: (
      <tr>
        <td align="center" style={{ paddingBottom: '20px' }}>
          <table cellPadding="0" cellSpacing="0" border={0} style={{ margin: '0 auto' }}>
            <tbody>
              {data.email && (
                <tr>
                  <td style={{ padding: '3px 0', fontSize: '13px', color: '#000000', fontWeight: '600' }}>
                    <a href={`mailto:${data.email}`} style={{ color: '#000000', textDecoration: 'none' }}>{data.email}</a>
                  </td>
                </tr>
              )}
              {data.phone && (
                <tr>
                  <td style={{ padding: '3px 0', fontSize: '13px', color: '#666666', fontWeight: '500' }}>
                    {data.phone}
                  </td>
                </tr>
              )}
              {data.website && (
                <tr>
                  <td style={{ padding: '3px 0', fontSize: '13px', color: data.primaryColor, fontWeight: '700' }}>
                    <a href={normalizeUrl(data.website)} style={{ color: data.primaryColor, textDecoration: 'none' }}>{data.website.replace(/^https?:\/\//, '')}</a>
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
        <td align="center" style={{ paddingTop: '12px', borderTop: '1px solid #f0f0f0' }}>
          <table cellPadding="0" cellSpacing="0" border={0} style={{ margin: '0 auto' }}>
            <tbody>
              <tr>
                {data.socialLinks.linkedin && (
                  <td style={{ padding: '0 8px' }}>
                    <a href={normalizeUrl(data.socialLinks.linkedin)} target="_blank" rel="noopener noreferrer">
                      <img src="https://img.icons8.com/fluent/48/000000/linkedin.png" width="22" height="22" alt="LI" />
                    </a>
                  </td>
                )}
                {data.socialLinks.twitter && (
                  <td style={{ padding: '0 8px' }}>
                    <a href={normalizeUrl(data.socialLinks.twitter)} target="_blank" rel="noopener noreferrer">
                      <img src="https://img.icons8.com/fluent/48/000000/twitter.png" width="22" height="22" alt="TW" />
                    </a>
                  </td>
                )}
                {data.socialLinks.instagram && (
                  <td style={{ padding: '0 8px' }}>
                    <a href={normalizeUrl(data.socialLinks.instagram)} target="_blank" rel="noopener noreferrer">
                      <img src="https://img.icons8.com/fluent/48/000000/instagram-new.png" width="22" height="22" alt="IG" />
                    </a>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    ),
    banner: (
      data.badges && data.badges.length > 0 ? (
        <tr>
          <td align="center" style={{ paddingTop: '16px' }}>
            <table cellPadding="0" cellSpacing="0" border={0} style={{ margin: '0 auto' }}>
              <tbody>
                <tr>
                  {data.badges.map((badge) => (
                    <td key={badge.id} style={{ padding: '0 5px' }}>
                      {badge.linkUrl ? (
                        <a href={normalizeUrl(badge.linkUrl)} target="_blank" rel="noopener noreferrer">
                          <img src={badge.imageUrl} alt={badge.altText} height="28" style={{ display: 'block' }} />
                        </a>
                      ) : (
                        <img src={badge.imageUrl} alt={badge.altText} height="28" style={{ display: 'block' }} />
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      ) : null
    )
  };

  return (
    <div style={{ padding: '32px', backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid #f0f0f0', maxWidth: '400px', margin: '0 auto' }}>
      <table width="100%" cellPadding="0" cellSpacing="0" border={0}>
        <tbody>
          {layout.map(key => (
            <React.Fragment key={key}>
              {sections[key]}
            </React.Fragment>
          ))}
          {/* Always try to render badges at the end if not in layout, or use layout badge key */}
          {(!layout.includes('banner')) && sections.banner}
        </tbody>
      </table>
    </div>
  );
};
