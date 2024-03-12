// Importing env files here to validate on build

import "./src/env.mjs";
import "@acme/auth/env.mjs";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ["@acme/api", "@acme/auth", "@acme/db"],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // eslint-disable-next-line @typescript-eslint/require-await
  headers: async () => {
    // To help with local development...
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/api/auth/:path*",
          has: [{ type: "header", key: "Origin", value: "(?<origin>.*)" }],
          headers: [
            { key: "Access-Control-Allow-Credentials", value: "true" },
            { key: "Access-Control-Allow-Origin", value: ":origin" },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET, OPTIONS, PATCH, DELETE, POST, PUT",
            },
            {
              key: "Access-Control-Allow-Headers",
              value:
                "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            },
          ],
        },
      ];
    }

    // In the other environments...
    return [
      // https://vercel.com/support/articles/how-to-enable-cors#enabling-cors-in-a-next.js-app
      // https://nextjs.org/docs/api-reference/next.config.js/headers#header-cookie-and-query-matching
      {
        // matching all auth API routes
        source: "/api/auth/:path*",
        // if the origin has '.my-domain.com'...
        has: [
          {
            type: "header",
            key: "Origin",
            value: "(?<origin>^https:\\/\\/.*\\.codingcodax\\.dev$)",
          },
        ],
        // these headers will be applied
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: ":origin" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, OPTIONS, PATCH, DELETE, POST, PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default config;
