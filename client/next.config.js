/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['logodix.com', 'shutterstock.com', 'picsum.photos', 'res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'logodix.com',
        port: '',
        pathname: '/logos/**',
      },
      {
        protocol: 'https',
        hostname: 'shutterstock.com',
        port: '',
        pathname: '/image-photo/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/seed/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/id/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/energialy/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dbraa6jpj/**',
      },
    ],
  },
};

module.exports = nextConfig;
