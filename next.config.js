/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  distDir: 'dist',
  assetPrefix: '/Treasured-scribbles/',
  basePath: '/Treasured-scribbles',
}

module.exports = nextConfig
