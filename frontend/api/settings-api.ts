import { httpClient } from './http-client';
import { API_ENDPOINTS } from './config';
import { AppSettings } from '../features/settings/types';

export interface GetSettingsResponse {
  success: true;
  data: AppSettings;
}

export interface UpdateSettingsRequest {
  settings: Partial<AppSettings>;
}

export interface UpdateSettingsResponse {
  success: true;
  data: AppSettings;
}

export interface ResetSettingsResponse {
  success: true;
  data: AppSettings;
}

export const settingsApi = {
  async getSettings(): Promise<AppSettings> {
    const response = await httpClient.get<GetSettingsResponse>(API_ENDPOINTS.SETTINGS);
    return response.data;
  },

  async updateSettings(settings: Partial<AppSettings>): Promise<AppSettings> {
    const response = await httpClient.put<UpdateSettingsResponse>(
      API_ENDPOINTS.SETTINGS,
      { settings }
    );
    return response.data;
  },

  async resetSettings(): Promise<AppSettings> {
    const response = await httpClient.post<ResetSettingsResponse>(
      `${API_ENDPOINTS.SETTINGS}/reset`
    );
    return response.data;
  },
};