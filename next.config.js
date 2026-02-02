/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.supabase.co',
                pathname: '/storage/v1/object/public/**',
            },
        ],
        formats: ['image/avif', 'image/webp'],
    },
    // Enable React strict mode for better development experience
    reactStrictMode: true,
    // Compress responses
    compress: true,
    // Generate ETags for better caching
    generateEtags: true,
    // Power by header
    poweredByHeader: false,
}

module.exports = nextConfig
