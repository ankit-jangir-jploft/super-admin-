"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import Cookies from "js-cookie";

const savedLanguage = Cookies.get("i18next") || "nor";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    lng: savedLanguage,
    fallbackLng: "en",
    supportedLngs: ["en", "nor"],
    ns: ["common"],
    defaultNS: "common",
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["cookie"],
      lookupCookie: "i18next",
      caches: ["cookie"],
      cookieOptions: { expires: 365, path: "/" },
    },
  });

export const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
  Cookies.set("i18next", lng, { expires: 365, path: "/" });
};

export default i18n;
