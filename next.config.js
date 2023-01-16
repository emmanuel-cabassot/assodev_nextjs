/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com','wembleypark.com', 'localhost'],
  },
  
}

module.exports = nextConfig
