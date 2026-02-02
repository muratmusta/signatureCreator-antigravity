export function useClipboard() {
    const copyToClipboard = async (content: string) => {
        try {
            await navigator.clipboard.writeText(content);
            return true;
        } catch (error) {
            console.error('Clipboard error:', error);
            return false;
        }
    };

    return { copyToClipboard };
}
