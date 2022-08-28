/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['img1.terwergreen.com'],
  },
}

module.exports = nextConfig
