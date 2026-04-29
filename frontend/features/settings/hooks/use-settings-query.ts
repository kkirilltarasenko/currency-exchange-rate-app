"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsApi } from '../../../api/settings-api';
import { QUERY_KEYS } from '../../../api/config';
import { AppSettings, DEFAULT_SETTINGS } from '../types';

export function useSettingsQuery() {
  return useQuery({
    queryKey: [QUERY_KEYS.SETTINGS],
    queryFn: settingsApi.getSettings,
    staleTime: 5 * 60 * 1000, // 5 минут
    gcTime: 10 * 60 * 1000, // 10 минут
    retry: 1,
    // Если запрос не удался, используем дефолтные настройки
    placeholderData: DEFAULT_SETTINGS,
  });
}

export function useUpdateSettingsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: settingsApi.updateSettings,
    onSuccess: (updatedSettings) => {
      // Обновляем кэш с новыми настройками
      queryClient.setQueryData([QUERY_KEYS.SETTINGS], updatedSettings);
    },
    onError: (error) => {
      console.error('Ошибка обновления настроек:', error);
      // Можно добавить toast уведомление об ошибке
    },
  });
}

export function useResetSettingsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: settingsApi.resetSettings,
    onSuccess: (defaultSettings) => {
      // Обновляем кэш с дефолтными настройками
      queryClient.setQueryData([QUERY_KEYS.SETTINGS], defaultSettings);
    },
    onError: (error) => {
      console.error('Ошибка сброса настроек:', error);
      // Можно добавить toast уведомление об ошибке
    },
  });
}