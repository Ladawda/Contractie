import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // PostHog reverse proxy is handled via middleware (src/middleware.ts)
  // Middleware approach avoids 431 "Request Header Fields Too Large" errors
  // that occur with rewrites in local dev due to oversized cookies/headers
  skipTrailingSlashRedirect: true,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://us-assets.i.posthog.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://tdhxydzsguacwuwtledk.supabase.co; connect-src 'self' https://www.google-analytics.com https://us.i.posthog.com https://tdhxydzsguacwuwtledk.supabase.co; frame-ancestors 'none';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
