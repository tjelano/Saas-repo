/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'replicate.delivery',
            },
            {
                protocol: 'https',
                hostname: '*.supabase.co',
            },
        ],
    },
};

export default nextConfig;
