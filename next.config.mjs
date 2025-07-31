/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Vercel Blob
      {
        protocol: "https",
        hostname: "blob.vercel-storage.com",
      },
      // Imgur
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      // Cloudinary
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      // Your own site on Vercel
      {
        protocol: "https",
        hostname: "zimio.vercel.app",
      },
      // Google Photos or short links
      {
        protocol: "https",
        hostname: "images.app.goo.gl",
      },
      // Google profile images
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
