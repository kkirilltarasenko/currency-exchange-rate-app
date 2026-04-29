import { Controller, Get, Put, Post, Body } from '@nestjs/common';
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

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  getSettings(): GetSettingsResponse {
    const settings = this.settingsService.getSettings();
    return {
      success: true,
      data: settings,
    };
  }

  @Put()
  updateSettings(
    @Body() request: UpdateSettingsRequest,
  ): UpdateSettingsResponse {
    const updatedSettings = this.settingsService.updateSettings(
      request.settings,
    );
    return {
      success: true,
      data: updatedSettings,
    };
  }

  @Post('reset')
  resetSettings(): ResetSettingsResponse {
    const defaultSettings = this.settingsService.resetSettings();
    return {
      success: true,
      data: defaultSettings,
    };
  }
}
