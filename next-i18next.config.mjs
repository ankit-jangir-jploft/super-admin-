// next-i18next.config.mjs
import path from "path";

export const i18n = {
  defaultLocale: "en",
  locales: ["en", "es"], // Add your desired languages here
};

export const localePath = path.resolve("./public/locales");
