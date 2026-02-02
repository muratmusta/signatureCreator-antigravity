import React from 'react';
import type { SignatureData, SectionType } from '../../types/signature';

interface TemplateProps {
  data: SignatureData;
  logoSrc: string;
}

export const Template9: React.FC<TemplateProps> = ({ data, logoSrc }) => {
  const layout = data.layout || ['avatar', 'info', 'contact', 'social'];
  // Big Photo Top
  const sections: Record<SectionType, React.ReactNode> = {
    avatar: (<tr><td align="center"><img src={logoSrc} width="120" height="120" alt="Av" style={{ borderRadius: '50%', marginBottom: '10px' }} /></td></tr>),
    info: (<tr><td align="center"><div style={{ fontSize: '22px', fontWeight: '300' }}>{data.fullName}</div><div style={{ fontSize: '14px', color: data.primaryColor }}>{data.title}</div></td></tr>),
    contact: (<tr><td align="center" style={{ paddingTop: '10px', fontSize: '12px', color: '#777' }}>{data.email}<br />{data.phone}</td></tr>),
    social: (<tr><td align="center" style={{ paddingTop: '10px' }}>{/* Icons placeholder */}</td></tr>),
    banner: null as any
  };
  return (
    <div style={{ fontFamily: 'Times New Roman, serif', padding: '20px' }}>
      <table width="100%" cellPadding="0" cellSpacing="0" border={0}><tbody>{layout.map(k => <React.Fragment key={k}>{sections[k]}</React.Fragment>)}</tbody></table>
    </div>
  )
};
