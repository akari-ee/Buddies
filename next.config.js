/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  maximumFileSizeToCacheInBytes: 10000000,
});
// const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'k.kakaocdn.net', 'localhost'],
  },
};

module.exports = process.env.NODE_ENV === 'development' ? nextConfig : withPWA({ nextConfig });

// module.exports = process.env.NODE_ENV === 'development' ? {
//   images: {
//     domains: ['lh3.googleusercontent.com', 'k.kakaocdn.net', 'localhost'],
//   },
// } : withPWA({
//   images: {
//     domains: ['lh3.googleusercontent.com', 'k.kakaocdn.net', 'localhost'],
//   },
// });