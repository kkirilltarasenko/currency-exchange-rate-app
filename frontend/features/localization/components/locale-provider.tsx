"use client";

import { useEffect } from 'react';
import { useLocalization } from '../context/localization-context';

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const { locale } = useLocalization();

  useEffect(() => {
    // Обновляем атрибут lang в HTML документе
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return <>{children}</>;
}