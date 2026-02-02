import React from 'react';
import type { SignatureData, SectionType } from '../../types/signature';
import { normalizeUrl } from '../../utils/url';

interface TemplateProps {
  data: SignatureData;
  logoSrc: string;
}

/**
 * Template 2: Centered Modern Stack
 * High-Contrast Premium Version
 */
export const Template2: React.FC<TemplateProps> = ({ data, logoSrc }) => {
  const layout = data.layout || ['avatar', 'info', 'contact', 'social'];

  const sections: Record<SectionType, React.ReactNode> = {
    avatar: (
      <tr>
        <td align="center" style={{ paddingBottom: '24px' }}>
          <img
            src={logoSrc}
            alt="Logo"
            width="90"
            height="90"
            style={{
              display: 'block',
              borderRadius: '50%',
              objectFit: 'cover',
              border: `4px solid ${data.primaryColor}`,
              boxShadow: '0 8px 16px rgba(0,0,0,0.08)'
            }}
          />
        </td>
      </tr>
    ),
    info: (
      <tr>
        <td align="center" style={{ paddingBottom: '16px' }}>
          <div style={{ fontSize: '26px', fontWeight: '900', color: '#000000', textTransform: 'uppercase', letterSpacing: '2px', lineHeight: '1.2' }}>{data.fullName}</div>
          <div style={{
            fontSize: '11px',
            backgroundColor: data.primaryColor,
            color: '#ffffff',
            padding: '6px 16px',
            borderRadius: '30px',
            display: 'inline-block',
            fontWeight: '900',
            marginTop: '10px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase'
          }}>{data.title}</div>
          {data.company && <div style={{ fontSize: '15px', color: '#999', marginTop: '10px', fontStyle: 'italic', fontWeight: '500' }}>{data.company}</div>}
        </td>
      </tr>
    ),
    contact: (
      <tr>
        <td align="center" style={{ paddingBottom: '24px' }}>
          <table cellPadding="0" cellSpacing="0" border={0} style={{ margin: '0 auto' }}>
            <tbody>
              {data.email && (
                <tr>
                  <td align="center" style={{ padding: '4px 0', fontSize: '14px', color: '#111', fontWeight: '600' }}>
                    <a href={`mailto:${data.email}`} style={{ color: '#111', textDecoration: 'none', borderBottom: `2px solid ${data.primaryColor}` }}>{data.email}</a>
                  </td>
                </tr>
              )}
              {data.phone && (
                <tr>
                  <td align="center" style={{ padding: '4px 0', fontSize: '14px', color: '#666', fontWeight: '500' }}>
                    {data.phone}
                  </td>
                </tr>
              )}
              {data.website && (
                <tr>
                  <td align="center" style={{ padding: '4px 0', fontSize: '14px', color: '#111', fontWeight: '700' }}>
                    <a href={normalizeUrl(data.website)} style={{ color: '#111', textDecoration: 'none' }}>{data.website.replace(/^https?:\/\//, '')}</a>
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
        <td align="center" style={{ paddingTop: '16px', borderTop: '2px solid #000' }}>
          <table cellPadding="0" cellSpacing="0" border={0} style={{ margin: '0 auto' }}>
            <tbody>
              <tr>
                {data.socialLinks.linkedin && (
                  <td style={{ padding: '0 10px' }}>
                    <a href={normalizeUrl(data.socialLinks.linkedin)} target="_blank" rel="noopener noreferrer">
                      <img src="https://img.icons8.com/ios-filled/50/000000/linkedin.png" width="20" height="20" alt="LI" />
                    </a>
                  </td>
                )}
                {data.socialLinks.twitter && (
                  <td style={{ padding: '0 10px' }}>
                    <a href={normalizeUrl(data.socialLinks.twitter)} target="_blank" rel="noopener noreferrer">
                      <img src="https://img.icons8.com/ios-filled/50/000000/twitter.png" width="20" height="20" alt="TW" />
                    </a>
                  </td>
                )}
                {data.socialLinks.instagram && (
                  <td style={{ padding: '0 10px' }}>
                    <a href={normalizeUrl(data.socialLinks.instagram)} target="_blank" rel="noopener noreferrer">
                      <img src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png" width="20" height="20" alt="IG" />
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
          <td align="center" style={{ paddingTop: '24px' }}>
            <table cellPadding="0" cellSpacing="0" border={0} style={{ margin: '0 auto' }}>
              <tbody>
                <tr>
                  {data.badges.map((badge) => (
                    <td key={badge.id} style={{ padding: '0 6px' }}>
                      {badge.linkUrl ? (
                        <a href={normalizeUrl(badge.linkUrl)} target="_blank" rel="noopener noreferrer">
                          <img src={badge.imageUrl} alt={badge.altText} height="32" style={{ display: 'block' }} />
                        </a>
                      ) : (
                        <img src={badge.imageUrl} alt={badge.altText} height="32" style={{ display: 'block' }} />
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
    <div style={{ padding: '40px', backgroundColor: '#ffffff', borderBottom: `8px solid ${data.primaryColor}`, maxWidth: '400px', margin: '0 auto' }}>
      <table width="100%" cellPadding="0" cellSpacing="0" border={0}>
        <tbody>
          {layout.map(key => (
            <React.Fragment key={key}>
              {sections[key]}
            </React.Fragment>
          ))}
          {!layout.includes('banner') && sections.banner}
        </tbody>
      </table>
    </div>
  );
};
