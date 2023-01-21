/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com','wembleypark.com', 'localhost', '5.196.88.154', 'api-projectdev.fr'],
  },
  
}

module.exports = nextConfig
