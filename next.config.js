/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['vercel.com'],
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  // Uncomment the following lines if you need to handle custom routes
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: '/api/:path*',
  //     },
  //   ]
  // },
}

module.exports = nextConfig
