export interface AppSettings {
    theme: 'light' | 'dark' | 'system';
    language: 'ru' | 'en' | 'be';
    defaultBaseCurrency: string;
    defaultTargetCurrency: string;
    decimalPlaces: number;
    numberFormat: 'standard' | 'compact';
    autoRefresh: boolean;
    refreshInterval: number;
    notifications: boolean;
    soundEnabled: boolean;
    favoriteBanks: string[];
    saveHistory: boolean;
    historyLimit: number;
    showBankLogos: boolean;
    compactMode: boolean;
    animationsEnabled: boolean;
}
export declare class SettingsService {
    private currentSettings;
    getSettings(): Promise<AppSettings>;
    updateSettings(partialSettings: Partial<AppSettings>): Promise<AppSettings>;
    resetSettings(): Promise<AppSettings>;
}
