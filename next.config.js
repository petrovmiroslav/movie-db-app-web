/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config.js");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    deviceSizes: [640, 750, 828],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{ loader: "@svgr/webpack", options: { exportType: "named" } }],
    });

    return config;
  },
  i18n,
};

module.exports = nextConfig;
