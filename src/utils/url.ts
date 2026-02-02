/**
 * Normalizes a URL to ensure it has a protocol and is properly formatted.
 */
export const normalizeUrl = (url: string | undefined | null): string => {
    if (!url) return '';
    const trimmed = url.trim();
    if (!trimmed) return '';

    // If it already has a protocol, return as is
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
        return trimmed;
    }

    // If it starts with mailto: or tel:, return as is
    if (trimmed.startsWith('mailto:') || trimmed.startsWith('tel:')) {
        return trimmed;
    }

    // Default to https
    return `https://${trimmed}`;
};

/**
 * Strips the protocol from a URL for display purposes.
 */
export const displayUrl = (url: string | undefined | null): string => {
    if (!url) return '';
    return url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
};
