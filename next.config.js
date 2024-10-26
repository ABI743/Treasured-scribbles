/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  distDir: 'dist',
  assetPrefix: '/Treasured-scribbles/',
  basePath: '/Treasured-scribbles',
}

module.exports = nextConfig
