import React from 'react';
import type { SignatureData, SectionType } from '../../types/signature';

interface TemplateProps {
  data: SignatureData;
  logoSrc: string;
}

/**
 * Template 3: Professional Compact
 * Logo and Info side-by-side. Socials at bottom.
 * Fully Dynamic.
 */
export const Template3: React.FC<TemplateProps> = ({ data, logoSrc }) => {
  const layout = data.layout || ['avatar', 'info', 'contact', 'social'];

  // Template 3 distinct style: Compact font, gray nuances.

  const sections: Record<SectionType, React.ReactNode> = {
    avatar: (
      <tr>
        <td style={{ paddingRight: '15px' }} valign="top">
          <img
            src={logoSrc}
            alt="Logo"
            width="72"
            height="72"
            style={{ display: 'block', borderRadius: '4px' }}
          />
        </td>
      </tr>
    ),
    info: (
      <tr>
        <td style={{ paddingBottom: '8px' }}>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#111' }}>{data.fullName}</div>
          <div style={{ fontSize: '13px', color: '#555', letterSpacing: '0.5px' }}>{data.title}</div>
          {data.company && <div style={{ fontSize: '13px', color: data.primaryColor, fontWeight: 'bold', marginTop: '2px' }}>{data.company}</div>}
        </td>
      </tr>
    ),
    contact: (
      <tr>
        <td style={{ paddingBottom: '8px' }}>
          <table cellPadding="0" cellSpacing="0" border={0}>
            <tbody>
              {data.email && <tr><td style={{ fontSize: '12px', color: '#666', padding: '1px 0' }}><b>E:</b> <a href={`mailto:${data.email}`} style={{ textDecoration: 'none', color: '#666' }}>{data.email}</a></td></tr>}
              {data.phone && <tr><td style={{ fontSize: '12px', color: '#666', padding: '1px 0' }}><b>P:</b> {data.phone}</td></tr>}
              {data.website && <tr><td style={{ fontSize: '12px', color: '#666', padding: '1px 0' }}><b>W:</b> <a href={data.website} style={{ textDecoration: 'none', color: '#666' }}>{data.website}</a></td></tr>}
            </tbody>
          </table>
        </td>
      </tr>
    ),
    social: (
      <tr>
        <td style={{ paddingTop: '5px' }}>
          <table cellPadding="0" cellSpacing="0" border={0}>
            <tbody>
              <tr>
                {data.socialLinks.linkedin && <td style={{ paddingRight: '8px' }}><a href={data.socialLinks.linkedin}><img src="https://img.icons8.com/color/48/linkedin.png" width="18" height="18" alt="LI" /></a></td>}
                {data.socialLinks.twitter && <td style={{ paddingRight: '8px' }}><a href={data.socialLinks.twitter}><img src="https://img.icons8.com/color/48/twitter.png" width="18" height="18" alt="TW" /></a></td>}
                {data.socialLinks.instagram && <td style={{ paddingRight: '8px' }}><a href={data.socialLinks.instagram}><img src="https://img.icons8.com/color/48/instagram-new.png" width="18" height="18" alt="IG" /></a></td>}
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    ),
    banner: null as any
  };

  /**
   * Template 3 Logic: 
   * This template is naturally "Side-by-Side" (Avatar Left, Content Right).
   * But we want to support D&D reordering of the Content Right column.
   * If 'avatar' is moved in the list, does it change position?
   * Let's implement a Hybrid approach:
   * 1. Check if 'avatar' is first in layout. If so, render Left-Right.
   * 2. If 'avatar' is NOT first, render as Vertical Stack (like Template 1).
   * This gives the user immense control!
   */

  const isAvatarFirst = layout[0] === 'avatar';

  if (isAvatarFirst) {
    // Horizontal Layout (Avatar | Stack)
    const rightColumnKeys = layout.filter(k => k !== 'avatar');
    return (
      <div style={{ fontFamily: 'Arial, sans-serif', padding: '15px', backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px' }}>
        <table width="100%" cellPadding="0" cellSpacing="0" border={0}>
          <tbody>
            <tr>
              {/* Left Column (Avatar) */}
              <td width="1%" valign="top" style={{ paddingRight: '20px', borderRight: `1px solid ${data.primaryColor}` }}>
                <img src={logoSrc} width="80" height="80" style={{ display: 'block', borderRadius: '4px' }} alt="Logo" />
              </td>
              {/* Right Column (Dynamic Stack) */}
              <td valign="top" style={{ paddingLeft: '20px' }}>
                <table width="100%" cellPadding="0" cellSpacing="0" border={0}>
                  <tbody>
                    {rightColumnKeys.map(key => <React.Fragment key={key}>{sections[key]}</React.Fragment>)}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else {
    // Vertical Stack (Avatar is somewhere else)
    return (
      <div style={{ fontFamily: 'Arial, sans-serif', padding: '15px', backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px' }}>
        <table width="100%" cellPadding="0" cellSpacing="0" border={0}>
          <tbody>
            {layout.map(key => <React.Fragment key={key}>{sections[key]}</React.Fragment>)}
          </tbody>
        </table>
      </div>
    );
  }
};
