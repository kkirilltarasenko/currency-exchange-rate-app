"use client";

import { useSettingsContext } from '../../features/settings/context/settings-provider';

/**
 * Хук для получения настроек приложения в любом компоненте
 * Это упрощенная версия для компонентов, которым нужны только настройки
 */
export function useAppSettings() {
  const { settings, isLoading } = useSettingsContext();
  
  return {
    settings,
    isLoading,
    // Удобные геттеры для часто используемых настроек
    theme: settings.theme,
    language: settings.language,
    compactMode: settings.compactMode,
    animationsEnabled: settings.animationsEnabled,
    showBankLogos: settings.showBankLogos,
    defaultBaseCurrency: settings.defaultBaseCurrency,
    defaultTargetCurrency: settings.defaultTargetCurrency,
    decimalPlaces: settings.decimalPlaces,
    numberFormat: settings.numberFormat,
    autoRefresh: settings.autoRefresh,
    refreshInterval: settings.refreshInterval,
    notifications: settings.notifications,
    soundEnabled: settings.soundEnabled,
    favoriteBanks: settings.favoriteBanks,
    saveHistory: settings.saveHistory,
    historyLimit: settings.historyLimit,
  };
}