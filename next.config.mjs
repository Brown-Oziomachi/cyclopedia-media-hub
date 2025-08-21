import withPWAInit from "next-pwa";
import runtimeCaching from "next-pwa/cache.js";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching: [...runtimeCaching],
});

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "blob.vercel-storage.com" },
      { protocol: "https", hostname: "jqijjwkgjavuqxjtwver.supabase.co" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
    ],
  },
};

export default withPWA(nextConfig);
