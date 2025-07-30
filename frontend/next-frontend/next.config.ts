import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    BACKEND_API_URL: "http://localhost:8080/api/items/",
  },
};

export default nextConfig;
