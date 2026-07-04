import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Site is served at https://shashanksurwase.github.io/Portfolio
  basePath: "/Portfolio",
  images: { unoptimized: true },
};

export default nextConfig;
