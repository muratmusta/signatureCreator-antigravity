/**
 * Generates a placeholder logo using initials
 * Uses placehold.co service
 */
export const generateAutoLogo = (
    fullName: string,
    primaryColor: string
): string => {
    if (!fullName.trim()) {
        return `https://placehold.co/80x80/${primaryColor.replace('#', '')}/white?text=?&font=roboto`;
    }

    const initials = fullName
        .trim()
        .split(' ')
        .filter(n => n.length > 0)
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2); // Max 2 characters

    const bgColor = primaryColor.replace('#', '');
    return `https://placehold.co/80x80/${bgColor}/white?text=${initials}&font=roboto`;
};
