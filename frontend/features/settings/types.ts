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

export const SUPPORTED_LANGUAGES = [
  { code: 'ru', name: 'Русский', flag: '' },
  { code: 'en', name: 'English', flag: '' },
  { code: 'be', name: 'Беларуская', flag: '' },
] as const;

export const SUPPORTED_CURRENCIES = [
  { code: 'USD', name: 'Доллар США', symbol: '$' },
  { code: 'EUR', name: 'Евро', symbol: '€' },
  { code: 'BYN', name: 'Белорусский рубль', symbol: 'Br' },
  { code: 'RUB', name: 'Российский рубль', symbol: '₽' },
  { code: 'PLN', name: 'Польский злотый', symbol: 'zł' },
  { code: 'UAH', name: 'Украинская гривна', symbol: '₴' },
] as const;

export const REFRESH_INTERVALS = [
  { value: 60, label: '1 минута' },
  { value: 300, label: '5 минут' },
  { value: 600, label: '10 минут' },
  { value: 1800, label: '30 минут' },
  { value: 3600, label: '1 час' },
] as const;

export const AVAILABLE_BANKS = [
  { id: 'беларусбанк', name: 'Беларусбанк' },
  { id: 'альфа-банк', name: 'Альфа-Банк' },
  { id: 'белагропромбанк', name: 'Белагропромбанк' },
  { id: 'дабрабыт', name: 'Дабрабыт' },
] as const;