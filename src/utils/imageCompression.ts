/**
 * Compresses and converts an image file to Base64
 * Resizes to max 150px width while maintaining aspect ratio
 */
export const compressImageToBase64 = (
    file: File,
    maxWidth: number = 150
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                // Create canvas
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    reject(new Error('Canvas context not available'));
                    return;
                }

                // Calculate new dimensions
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }

                // Set canvas size
                canvas.width = width;
                canvas.height = height;

                // Draw and compress
                ctx.drawImage(img, 0, 0, width, height);

                // Convert to base64 with quality optimization
                const base64 = canvas.toDataURL('image/jpeg', 0.85);
                resolve(base64);
            };

            img.onerror = () => {
                reject(new Error('Failed to load image'));
            };

            img.src = e.target?.result as string;
        };

        reader.onerror = () => {
            reject(new Error('Failed to read file'));
        };

        reader.readAsDataURL(file);
    });
};

/**
 * Validates image file type and size
 */
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
        return {
            valid: false,
            error: 'Lütfen geçerli bir resim dosyası seçin (JPG, PNG, GIF, WebP)',
        };
    }

    if (file.size > maxSize) {
        return {
            valid: false,
            error: 'Dosya boyutu 5MB\'dan küçük olmalıdır',
        };
    }

    return { valid: true };
};
