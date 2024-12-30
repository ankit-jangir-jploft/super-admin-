/** @type {import('next').NextConfig} */
import { i18n } from "./next-i18next.config.mjs";

const nextConfig = {
  images: {
    domains: ["v5.checkprojectstatus.com"],
  },
  i18n,
};

export default nextConfig;
