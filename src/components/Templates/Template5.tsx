import React from 'react';
import type { SignatureData, SectionType } from '../../types/signature';

interface TemplateProps {
  data: SignatureData;
  logoSrc: string;
}

/**
 * Template 5: Modern Minimalist
 * Clean typography, generous spacing, no heavy graphics.
 */
export const Template5: React.FC<TemplateProps> = ({ data, logoSrc }) => {
  const layout = data.layout || ['avatar', 'info', 'contact', 'social'];

  const sections: Record<SectionType, React.ReactNode> = {
    avatar: (
      <tr><td align="center" style={{ paddingBottom: '20px' }}>
        <img src={logoSrc} width="50" height="50" style={{ borderRadius: '50%', display: 'block', border: '1px solid #eee' }} alt="Avatar" />
      </td></tr>
    ),
    info: (
      <tr><td align="center" style={{ paddingBottom: '15px' }}>
        <div style={{ color: '#000', fontWeight: '500', fontSize: '18px', letterSpacing: '-0.5px' }}>{data.fullName}</div>
        <div style={{ color: '#777', fontSize: '13px', marginTop: '4px' }}>{data.title} @ <span style={{ color: data.primaryColor }}>{data.company}</span></div>
      </td></tr>
    ),
    contact: (
      <tr><td align="center" style={{ paddingBottom: '15px' }}>
        <div style={{ fontSize: '12px', color: '#999', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          {data.email && <a href={`mailto:${data.email}`} style={{ textDecoration: 'none', color: '#999' }}>{data.email}</a>}
          {data.email && data.phone && <span>•</span>}
          {data.phone && <span>{data.phone}</span>}
        </div>
        {data.website && <div style={{ fontSize: '12px', marginTop: '4px' }}><a href={data.website} style={{ textDecoration: 'none', color: data.primaryColor }}>{data.website}</a></div>}
      </td></tr>
    ),
    social: (
      <tr><td align="center">
        <div style={{ fontSize: '11px', color: '#bbb' }}>
          {data.socialLinks.linkedin && <a href={data.socialLinks.linkedin} style={{ margin: '0 5px' }}><img src="https://img.icons8.com/color/48/linkedin.png" width="16" height="16" alt="LI" style={{ display: 'inline-block' }} /></a>}
          {data.socialLinks.twitter && <a href={data.socialLinks.twitter} style={{ margin: '0 5px' }}><img src="https://img.icons8.com/color/48/twitter.png" width="16" height="16" alt="TW" style={{ display: 'inline-block' }} /></a>}
          {data.socialLinks.instagram && <a href={data.socialLinks.instagram} style={{ margin: '0 5px' }}><img src="https://img.icons8.com/color/48/instagram-new.png" width="16" height="16" alt="IG" style={{ display: 'inline-block' }} /></a>}
        </div>
      </td></tr>
    ),
    banner: null as any
  };

  return (
    <div style={{ fontFamily: 'Helvetica, sans-serif', padding: '30px', backgroundColor: '#fff', border: '1px solid #f0f0f0' }}>
      <table width="100%" cellPadding="0" cellSpacing="0" border={0}>
        <tbody>
          {layout.map(key => <React.Fragment key={key}>{sections[key]}</React.Fragment>)}
        </tbody>
      </table>
    </div>
  );
};
