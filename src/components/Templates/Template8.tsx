import React from 'react';
import type { SignatureData, SectionType } from '../../types/signature';

interface TemplateProps {
  data: SignatureData;
  logoSrc: string;
}

export const Template8: React.FC<TemplateProps> = ({ data, logoSrc }) => {
  const layout = data.layout || ['avatar', 'info', 'contact', 'social'];
  // Very compact, small fonts
  const sections: Record<SectionType, React.ReactNode> = {
    avatar: (<tr><td style={{ paddingBottom: '5px' }}><img src={logoSrc} width="40" height="40" alt="Av" style={{ borderRadius: '4px' }} /></td></tr>),
    info: (<tr><td style={{ fontSize: '12px', fontWeight: 'bold' }}>{data.fullName} | <span style={{ fontWeight: 'normal', color: '#666' }}>{data.title}</span></td></tr>),
    contact: (<tr><td style={{ fontSize: '11px', color: '#888' }}>{data.email} • {data.phone}</td></tr>),
    social: (<tr><td style={{ fontSize: '10px', color: data.primaryColor }}>{data.socialLinks.linkedin && 'LinkedIn '} {data.socialLinks.twitter && 'Twitter'}</td></tr>),
    banner: null as any
  };
  return (
    <div style={{ fontFamily: 'Arial', borderLeft: `2px solid ${data.primaryColor}`, paddingLeft: '10px' }}>
      <table cellPadding="0" cellSpacing="0" border={0}><tbody>{layout.map(k => <React.Fragment key={k}>{sections[k]}</React.Fragment>)}</tbody></table>
    </div>
  )
};
