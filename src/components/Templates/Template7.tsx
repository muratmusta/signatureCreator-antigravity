import React from 'react';
import type { SignatureData, SectionType } from '../../types/signature';

interface TemplateProps {
  data: SignatureData;
  logoSrc: string;
}

/**
 * Template 7: Distinct Header
 * Often used when social links or names are prioritized.
 */
export const Template7: React.FC<TemplateProps> = ({ data, logoSrc }) => {
  const layout = data.layout || ['social', 'info', 'contact', 'avatar']; // Custom default order for logic check

  const sections: Record<SectionType, React.ReactNode> = {
    avatar: (
      <tr><td align="right" style={{ paddingLeft: '20px' }}>
        <img src={logoSrc} width="60" height="60" style={{ borderRadius: '50%', display: 'block', border: `2px solid ${data.primaryColor}` }} alt="Avatar" />
      </td></tr>
    ),
    info: (
      <tr><td>
        <div style={{ fontSize: '16px', fontWeight: 'bold', color: data.primaryColor, textAlign: 'right' }}>{data.fullName}</div>
        <div style={{ fontSize: '12px', color: '#444', textAlign: 'right' }}>{data.title}</div>
        <div style={{ fontSize: '12px', color: '#888', textAlign: 'right', fontStyle: 'italic' }}>{data.company}</div>
      </td></tr>
    ),
    contact: (
      <tr><td style={{ paddingTop: '10px' }}>
        <div style={{ fontSize: '11px', textAlign: 'right', color: '#666' }}>
          {data.email}<br />
          {data.phone}<br />
          <a href={data.website} style={{ color: '#666', textDecoration: 'none' }}>{data.website}</a>
        </div>
      </td></tr>
    ),
    social: (
      <tr><td align="right" style={{ paddingBottom: '10px' }}>
        {/* Social Icons Right Aligned */}
        {data.socialLinks.linkedin && <span style={{ fontSize: '10px', backgroundColor: '#eee', padding: '2px 5px', borderRadius: '3px', marginLeft: '5px' }}>LI</span>}
        {data.socialLinks.twitter && <span style={{ fontSize: '10px', backgroundColor: '#eee', padding: '2px 5px', borderRadius: '3px', marginLeft: '5px' }}>TW</span>}
      </td></tr>
    ),
    banner: null as any
  };

  return (
    <div style={{ fontFamily: 'Georgia, serif', padding: '15px' }}>
      {/* Align Right Layout */}
      <table width="100%" cellPadding="0" cellSpacing="0" border={0}>
        <tbody>
          {/* If Avatar is last, render Left Content | Right Avatar */}
          {/* For simplicity, just use pure vertical stack but right aligned content */}
          {layout.map(key => <React.Fragment key={key}>{sections[key]}</React.Fragment>)}
        </tbody>
      </table>
    </div>
  );
};
