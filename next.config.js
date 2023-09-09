/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  maximumFileSizeToCacheInBytes: 10000000,
});
const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'k.kakaocdn.net'],
  },
};

module.exports = withPWA({ nextConfig });
