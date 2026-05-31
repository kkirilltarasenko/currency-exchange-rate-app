import { SettingsService, AppSettings } from './settings.service';
interface GetSettingsResponse {
    success: true;
    data: AppSettings;
}
interface UpdateSettingsRequest {
    settings: Partial<AppSettings>;
}
interface UpdateSettingsResponse {
    success: true;
    data: AppSettings;
}
interface ResetSettingsResponse {
    success: true;
    data: AppSettings;
}
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    getSettings(): GetSettingsResponse;
    updateSettings(request: UpdateSettingsRequest): UpdateSettingsResponse;
    resetSettings(): ResetSettingsResponse;
}
export {};
