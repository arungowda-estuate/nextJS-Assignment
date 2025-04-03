/** @type {import('next').NextConfig} */

const nextConfig = {
  // output: "export",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: { unoptimized: true },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};
export default nextConfig;