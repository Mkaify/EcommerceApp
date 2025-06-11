/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production"
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: !isProd, // Only ignore in development
  },
  typescript: {
    ignoreBuildErrors: !isProd, // Only ignore in development
  },
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
