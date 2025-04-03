"use client";

import { I18nextProvider } from "react-i18next";
import { useEffect, useState } from "react";
import i18n from "@/i18n";

export default function I18nProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("language") ?? "en";
    i18n.changeLanguage(savedLang);

    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
