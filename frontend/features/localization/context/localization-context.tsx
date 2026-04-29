"use client";

import React, { createContext, useContext } from 'react';
import { useSettings } from '@/features/settings/hooks/use-settings';
import { Locale } from '@/i18n';

interface LocalizationContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isLoading: boolean;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export function LocalizationProvider({ children }: { children: React.ReactNode }) {
  const { settings, updateSetting, isLoading: settingsLoading } = useSettings();

  const locale = (settings?.language as Locale) || 'ru';

  const setLocale = (newLocale: Locale) => {
    updateSetting('language', newLocale);
  };

  return (
    <LocalizationContext.Provider
      value={{
        locale,
        setLocale,
        isLoading: settingsLoading,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
}

export function useLocalization() {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
}