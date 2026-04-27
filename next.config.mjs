// basePath is read from env so we can build for both:
//   • github.io/web-danslab/   (NEXT_PUBLIC_BASE_PATH=/web-danslab)
//   • a custom domain at root  (NEXT_PUBLIC_BASE_PATH unset)
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
