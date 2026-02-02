import React from 'react';
import type { SignatureData, SectionType } from '../../types/signature';

interface TemplateProps {
  data: SignatureData;
  logoSrc: string;
}

export const Template10: React.FC<TemplateProps> = ({ data, logoSrc }) => {
  const layout = data.layout || ['info', 'contact', 'social', 'avatar'];
  // Monospace / Code style
  const sections: Record<SectionType, React.ReactNode> = {
    avatar: (<tr><td style={{ background: '#eee', padding: '5px' }}><img src={logoSrc} width="40" height="40" alt="Av" /></td></tr>),
    info: (<tr><td style={{ color: data.primaryColor }}>{`const person = { name: "${data.fullName}", title: "${data.title}" };`}</td></tr>),
    contact: (<tr><td>{`// Contact: ${data.email}`}</td></tr>),
    social: (<tr><td>{`/* Social: ${data.website || '...'} */`}</td></tr>),
    banner: null as any
  };
  return (
    <div style={{ fontFamily: 'Consolas, monospace', padding: '15px', backgroundColor: '#f4f4f4', borderRadius: '5px', fontSize: '12px' }}>
      <table width="100%" cellPadding="0" cellSpacing="0" border={0}><tbody>{layout.map(k => <React.Fragment key={k}>{sections[k]}</React.Fragment>)}</tbody></table>
    </div>
  )
};
