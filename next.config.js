/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nft.petz.money",
        port: "",
        pathname: "/v1/**",
      },
    ],
  },
};

module.exports = nextConfig;
