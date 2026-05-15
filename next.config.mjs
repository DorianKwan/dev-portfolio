/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['voyageai', 'react-markdown'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
