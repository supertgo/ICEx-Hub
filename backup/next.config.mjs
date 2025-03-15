/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      }
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
