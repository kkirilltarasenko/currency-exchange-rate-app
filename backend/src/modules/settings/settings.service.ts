import { Injectable } from '@nestjs/common';

export interface AppSettings {
  // Внешний вид
  theme: 'light' | 'dark' | 'system';
  language: 'ru' | 'en' | 'be';
  
  // Валютные настройки
  defaultBaseCurrency: string;
  defaultTargetCurrency: string;
  decimalPlaces: number;
  numberFormat: 'standard' | 'compact';
  
  // Обновление данных
  autoRefresh: boolean;
  refreshInterval: number; // в секундах
  
  // Уведомления
  notifications: boolean;
  soundEnabled: boolean;
  
  // Избранные банки
  favoriteBanks: string[];
  
  // История
  saveHistory: boolean;
  historyLimit: number;
  
  // Дополнительные настройки
  showBankLogos: boolean;
  compactMode: boolean;
  animationsEnabled: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'system',
  language: 'ru',
  defaultBaseCurrency: 'USD',
  defaultTargetCurrency: 'BYN',
  decimalPlaces: 4,
  numberFormat: 'standard',
  autoRefresh: true,
  refreshInterval: 300, // 5 минут
  notifications: true,
  soundEnabled: false,
  favoriteBanks: [],
  saveHistory: true,
  historyLimit: 100,
  showBankLogos: true,
  compactMode: false,
  animationsEnabled: true,
};

@Injectable()
export class SettingsService {
  private currentSettings: AppSettings = { ...DEFAULT_SETTINGS };

  async getSettings(): Promise<AppSettings> {
    return { ...this.currentSettings };
  }

  async updateSettings(partialSettings: Partial<AppSettings>): Promise<AppSettings> {
    this.currentSettings = {
      ...this.currentSettings,
      ...partialSettings,
    };
    return { ...this.currentSettings };
  }

  async resetSettings(): Promise<AppSettings> {
    this.currentSettings = { ...DEFAULT_SETTINGS };
    return { ...this.currentSettings };
  }
}