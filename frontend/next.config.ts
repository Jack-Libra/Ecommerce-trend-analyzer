import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://172.29.224.1:3000',
  ],
};
module.exports = {
  images: {
    domains: ['images-na.ssl-images-amazon.com'], // ✅ 或 amazon.com 相關域名
  },
};

export default nextConfig;
