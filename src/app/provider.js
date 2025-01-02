// src/app/provider.js
"use client";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { useEffect } from "react";

export function I18nProvider({ children }) {
  useEffect(() => {
    i18n.init();
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
