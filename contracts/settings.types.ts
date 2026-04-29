// Settings API contracts

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

export const DEFAULT_SETTINGS: AppSettings = {
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