// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cwoel4rgy59p0nml.public.blob.vercel-storage.com", // your Vercel Blob
      },
      {
        protocol: "https",
        hostname: "blob.vercel-storage.com", // optional Vercel
      },
      {
        protocol: "https",
        hostname: "jqijjwkgjavuqxjtwver.supabase.co", // Supabase
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com", // GitHub
      },
      
    ],
  },
};

export default nextConfig;
