/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['img1.terwergreen.com'],
  },
}

module.exports = nextConfig
