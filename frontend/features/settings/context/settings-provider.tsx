"use client";

import React, { createContext, useContext, useEffect } from 'react';
import { useSettings } from '../hooks/use-settings';
import { AppSettings } from '../types';
import { useColorMode } from '@/components/ui/color-mode';

interface SettingsContextType {
  settings: AppSettings;
  isLoading: boolean;
  error: Error | null;
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  saveSettings: (newSettings: AppSettings) => Promise<void>;
  resetSettings: () => Promise<void>;
  exportSettings: () => void;
  importSettings: (file: File) => Promise<void>;
  isUpdating: boolean;
  isResetting: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
  children: React.ReactNode;
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const settingsHook = useSettings();
  const { setColorMode } = useColorMode();

  // Применяем настройки темы через Chakra UI
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const { theme } = settingsHook.settings;
    const root = document.documentElement;

    // Удаляем предыдущие классы темы
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      // Используем системную тему
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const applySystemTheme = () => {
        const isDark = mediaQuery.matches;
        setColorMode(isDark ? 'dark' : 'light');
        root.classList.toggle('dark', isDark);
        root.classList.toggle('light', !isDark);
      };

      applySystemTheme();
      mediaQuery.addEventListener('change', applySystemTheme);

      return () => {
        mediaQuery.removeEventListener('change', applySystemTheme);
      };
    } else {
      // Применяем выбранную тему
      setColorMode(theme);
      root.classList.add(theme);
    }
  }, [settingsHook.settings.theme, setColorMode]);

  // Применяем настройки языка
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const { language } = settingsHook.settings;
    document.documentElement.lang = language;
  }, [settingsHook.settings.language]);

  // Применяем настройки анимаций
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const { animationsEnabled } = settingsHook.settings;
    const root = document.documentElement;

    if (animationsEnabled) {
      root.classList.remove('no-animations');
    } else {
      root.classList.add('no-animations');
    }
  }, [settingsHook.settings.animationsEnabled]);

  // Применяем настройки компактного режима
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const { compactMode } = settingsHook.settings;
    const root = document.documentElement;

    root.classList.toggle('compact-mode', compactMode);
  }, [settingsHook.settings.compactMode]);

  return (
    <SettingsContext.Provider value={settingsHook}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettingsContext(): SettingsContextType {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettingsContext must be used within a SettingsProvider');
  }
  return context;
}