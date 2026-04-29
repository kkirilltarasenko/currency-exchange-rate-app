"use client";

import { useCallback } from 'react';
import { AppSettings, DEFAULT_SETTINGS } from '../types';
import {
  useSettingsQuery,
  useUpdateSettingsMutation,
  useResetSettingsMutation
} from './use-settings-query';

const SETTINGS_STORAGE_KEY = 'currency-exchange-settings';

export function useSettings() {
  const { data: settings = DEFAULT_SETTINGS, isLoading, error } = useSettingsQuery();
  const updateSettingsMutation = useUpdateSettingsMutation();
  const resetSettingsMutation = useResetSettingsMutation();

  // Сохранение настроек (сначала на сервер, потом в localStorage как резерв)
  const saveSettings = useCallback(async (newSettings: AppSettings) => {
    try {
      // Пытаемся сохранить на сервер
      await updateSettingsMutation.mutateAsync(newSettings);
      // Если успешно, сохраняем в localStorage как резерв
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
    } catch (error) {
      console.error('Ошибка сохранения настроек на сервер:', error);
      // Если сервер недоступен, сохраняем только в localStorage
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
      } catch (localError) {
        console.error('Ошибка сохранения настроек в localStorage:', localError);
      }
    }
  }, [updateSettingsMutation]);

  // Обновление отдельного параметра
  const updateSetting = useCallback(<K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    saveSettings(newSettings);
  }, [settings, saveSettings]);

  // Сброс настроек к дефолтным
  const resetSettings = useCallback(async () => {
    try {
      await resetSettingsMutation.mutateAsync();
      localStorage.removeItem(SETTINGS_STORAGE_KEY);
    } catch (error) {
      console.error('Ошибка сброса настроек:', error);
      // Если сервер недоступен, сбрасываем локально
      localStorage.removeItem(SETTINGS_STORAGE_KEY);
    }
  }, [resetSettingsMutation]);

  // Экспорт настроек
  const exportSettings = useCallback(() => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'currency-exchange-settings.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [settings]);

  // Импорт настроек
  const importSettings = useCallback((file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string);
          // Валидация импортированных настроек
          const validatedSettings = { ...DEFAULT_SETTINGS, ...importedSettings };
          saveSettings(validatedSettings);
          resolve();
        } catch (error) {
          reject(new Error('Неверный формат файла настроек'));
        }
      };
      reader.onerror = () => reject(new Error('Ошибка чтения файла'));
      reader.readAsText(file);
    });
  }, [saveSettings]);

  return {
    settings,
    isLoading: isLoading || updateSettingsMutation.isPending || resetSettingsMutation.isPending,
    error,
    updateSetting,
    saveSettings,
    resetSettings,
    exportSettings,
    importSettings,
    // Дополнительные состояния для UI
    isUpdating: updateSettingsMutation.isPending,
    isResetting: resetSettingsMutation.isPending,
  };
}