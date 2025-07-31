// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cwoel4rgy59p0nml.public.blob.vercel-storage.com", // ✅ Your exact blob hostname
      },
      {
        protocol: "https",
        hostname: "blob.vercel-storage.com", // (Optional) for general blob domains
      },
    ],
  },
};

export default nextConfig;
