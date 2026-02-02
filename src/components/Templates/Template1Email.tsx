import React from 'react';
import {
    Html,
    Head,
    Font,
    Body,
    Container,
    Section,
    Column,
    Img,
    Text,
    Link,
    Row,
} from '@react-email/components';
import type { SignatureData, SectionType } from '../../types/signature';

interface TemplateProps {
    data: SignatureData;
    logoSrc: string;
}

/**
 * Template 1 Re-implemented using React-Email components.
 * Guarantees cross-client including Outlook compatibility.
 * Fully supports Dynamic Layout (DnD).
 */
export const Template1Email: React.FC<TemplateProps> = ({ data, logoSrc }) => {
    const layout = data.layout || ['avatar', 'info', 'contact', 'social'];

    const sections: Record<SectionType, React.ReactNode> = {
        avatar: (
            <Row>
                <Column align="center" style={{ paddingBottom: '16px' }}>
                    <Img
                        src={logoSrc}
                        width="80"
                        height="80"
                        alt="Profile Avatar"
                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                    />
                </Column>
            </Row>
        ),
        info: (
            <Row>
                <Column align="center" style={{ paddingBottom: '8px' }}>
                    <Text style={{ fontSize: '18px', fontWeight: 'bold', color: data.primaryColor, margin: '0' }}>
                        {data.fullName}
                    </Text>
                    <Text style={{ fontSize: '14px', color: '#333333', margin: '4px 0 0' }}>
                        {data.title}
                    </Text>
                    {data.company && (
                        <Text style={{ fontSize: '14px', fontWeight: '600', color: '#111111', margin: '2px 0 0' }}>
                            {data.company}
                        </Text>
                    )}
                </Column>
            </Row>
        ),
        contact: (
            <Row>
                <Column align="center" style={{ paddingBottom: '16px' }}>
                    <Section>
                        {data.email && (
                            <Text style={{ fontSize: '13px', color: '#555', margin: '2px 0' }}>
                                <span style={{ opacity: 0.6 }}>✉️</span> <Link href={`mailto:${data.email}`} style={{ color: '#555', textDecoration: 'none' }}>{data.email}</Link>
                            </Text>
                        )}
                        {data.phone && (
                            <Text style={{ fontSize: '13px', color: '#555', margin: '2px 0' }}>
                                <span style={{ opacity: 0.6 }}>📞</span> {data.phone}
                            </Text>
                        )}
                        {data.website && (
                            <Text style={{ fontSize: '13px', color: '#555', margin: '2px 0' }}>
                                <span style={{ opacity: 0.6 }}>🌐</span> <Link href={data.website.startsWith('http') ? data.website : `https://${data.website}`} style={{ color: '#555', textDecoration: 'none' }}>{data.website}</Link>
                            </Text>
                        )}
                    </Section>
                </Column>
            </Row>
        ),
        social: (
            <Row>
                <Column align="center" style={{ paddingTop: '8px', borderTop: '1px solid #eeeeee' }}>
                    <Section>
                        <Row>
                            {data.socialLinks.linkedin && (
                                <Column style={{ padding: '0 5px' }}>
                                    <Link href={data.socialLinks.linkedin}><Img src="https://img.icons8.com/color/48/linkedin.png" width="24" height="24" alt="LI" /></Link>
                                </Column>
                            )}
                            {data.socialLinks.twitter && (
                                <Column style={{ padding: '0 5px' }}>
                                    <Link href={data.socialLinks.twitter}><Img src="https://img.icons8.com/color/48/twitter.png" width="24" height="24" alt="TW" /></Link>
                                </Column>
                            )}
                            {data.socialLinks.instagram && (
                                <Column style={{ padding: '0 5px' }}>
                                    <Link href={data.socialLinks.instagram}><Img src="https://img.icons8.com/color/48/instagram-new.png" width="24" height="24" alt="IG" /></Link>
                                </Column>
                            )}
                        </Row>
                    </Section>
                </Column>
            </Row>
        ),
        banner: <></>
    };

    return (
        <Html lang="tr">
            <Head>
                <Font
                    fontFamily="Roboto"
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxK.woff2',
                        format: 'woff2',
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
            </Head>
            <Body style={{ backgroundColor: '#ffffff', fontFamily: 'Roboto, Verdana, sans-serif' }}>
                <Container style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
                    <Section style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', backgroundColor: '#ffffff' }}>
                        {layout.map(key => <React.Fragment key={key}>{sections[key]}</React.Fragment>)}
                    </Section>
                    <Text style={{ textAlign: 'center', fontSize: '10px', color: '#999', marginTop: '20px' }}>
                        Created with SignatureOS
                    </Text>
                </Container>
            </Body>
        </Html>
    );
};
