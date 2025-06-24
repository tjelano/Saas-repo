/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'randomuser.me',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'replicate.delivery',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'pbxt.replicate.delivery',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
