const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

/**
 * Medusa Cloud-related environment variables
 */
const S3_HOSTNAME = process.env.MEDUSA_CLOUD_S3_HOSTNAME
const S3_PATHNAME = process.env.MEDUSA_CLOUD_S3_PATHNAME

const PRODUCT_IMAGE_HOSTNAMES = [
  "www.anglingdirect.co.uk",
  "www.mftackle.com",
  "nasluka-shop.com",
  "fishingindustry.bg",
  "s13emagst.akamaized.net",
  "www.angel-domaene.de",
  "foxcdn1.blob.core.windows.net",
  "www.prestoninnovations.com",
  "matchfishing.hr",
  "hobbyhome.co.uk",
  "cbu01.alicdn.com",
]


/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      ...PRODUCT_IMAGE_HOSTNAMES.map((hostname) => ({
        protocol: "https",
        hostname,
      })),
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
      ...(S3_HOSTNAME && S3_PATHNAME
        ? [
            {
              protocol: "https",
              hostname: S3_HOSTNAME,
              pathname: S3_PATHNAME,
            },
          ]
        : []),
    ],
  },
}

module.exports = nextConfig
