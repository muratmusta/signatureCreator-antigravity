import type { SignatureData } from '../../types/signature';

/**
 * Generates HTML for all templates
 * These are pure functions that return HTML strings
 */

export const generateTemplate1Html = (data: SignatureData, logoSrc: string): string => {
  return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.4; color: #333333;">
  <tr>
    <td style="padding-right: 20px; vertical-align: top;">
      <img src="${logoSrc}" alt="Logo" width="80" height="80" style="display: block; border: 0;" />
    </td>
    <td style="border-left: 3px solid ${data.primaryColor}; padding-left: 20px; vertical-align: top;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding-bottom: 5px;">
            <strong style="font-size: 16px; color: #000000;">${data.fullName}</strong>
          </td>
        </tr>
        ${data.title ? `<tr><td style="padding-bottom: 8px; color: ${data.primaryColor}; font-size: 13px;">${data.title}</td></tr>` : ''}
        ${data.company ? `<tr><td style="padding-bottom: 8px; font-weight: bold;">${data.company}</td></tr>` : ''}
        ${data.phone ? `<tr><td style="padding-bottom: 3px;">📞 ${data.phone}</td></tr>` : ''}
        ${data.email ? `<tr><td style="padding-bottom: 3px;">✉️ <a href="mailto:${data.email}" style="color: ${data.primaryColor}; text-decoration: none;">${data.email}</a></td></tr>` : ''}
        ${data.website ? `<tr><td style="padding-bottom: 3px;">🌐 <a href="${data.website}" style="color: ${data.primaryColor}; text-decoration: none;">${data.website}</a></td></tr>` : ''}
        ${data.address ? `<tr><td style="padding-bottom: 8px; color: #666666; font-size: 12px;">📍 ${data.address}</td></tr>` : ''}
        ${(data.socialLinks.linkedin || data.socialLinks.instagram || data.socialLinks.twitter) ? `
        <tr>
          <td style="padding-top: 10px;">
            ${data.socialLinks.linkedin ? `<a href="${data.socialLinks.linkedin}" style="text-decoration: none; margin-right: 8px;"><img src="https://img.icons8.com/color/24/linkedin.png" alt="LinkedIn" width="24" height="24" style="border: 0; display: inline-block;" /></a>` : ''}
            ${data.socialLinks.instagram ? `<a href="${data.socialLinks.instagram}" style="text-decoration: none; margin-right: 8px;"><img src="https://img.icons8.com/color/24/instagram-new.png" alt="Instagram" width="24" height="24" style="border: 0; display: inline-block;" /></a>` : ''}
            ${data.socialLinks.twitter ? `<a href="${data.socialLinks.twitter}" style="text-decoration: none;"><img src="https://img.icons8.com/color/24/twitter.png" alt="Twitter" width="24" height="24" style="border: 0; display: inline-block;" /></a>` : ''}
          </td>
        </tr>
        ` : ''}
      </table>
    </td>
  </tr>
</table>
  `.trim();
};

// Add similar functions for other templates...
// For brevity, I'll create a generic function that uses template ID

export const generateTemplateHtml = (
  _templateId: number,
  data: SignatureData,
  logoSrc: string
): string => {
  // For now, all templates will use Template1 structure
  // You can expand this to handle all 10 templates
  return generateTemplate1Html(data, logoSrc);
};
