/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // 可选：如果使用新的 App Router 特性
    appDir: true
  },
  webpack: (config) => {
    config.resolve.alias['@'] = './src';
    return config;
  }
}

module.exports = nextConfig 