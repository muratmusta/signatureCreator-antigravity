import QRCode from 'qrcode';

export const generateVCard = (data: any) => {
    const vCard = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${data.fullName}`,
        `ORG:${data.company}`,
        `TITLE:${data.title}`,
        `TEL;TYPE=CELL:${data.phone}`,
        `EMAIL:${data.email}`,
        `URL:${data.website}`,
        `ADR:;;${data.address}`,
        'END:VCARD'
    ].join('\n');

    return vCard;
};

export const generateQRCode = async (text: string) => {
    try {
        const url = await QRCode.toDataURL(text, {
            margin: 2,
            scale: 10,
            color: {
                dark: '#0B2C24', // Forest Green
                light: '#FFFFFF'
            }
        });
        return url;
    } catch (err) {
        console.error(err);
        return null;
    }
};
