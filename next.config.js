/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: ['i.ibb.co'],
  },
  basePath: '/app',
}

module.exports = nextConfig
