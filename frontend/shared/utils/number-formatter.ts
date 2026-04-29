import { AppSettings } from '../../features/settings/types';

/**
 * Утилита для форматирования чисел согласно настройкам пользователя
 */
export class NumberFormatter {
  private decimalPlaces: number;
  private numberFormat: 'standard' | 'compact';
  private language: string;

  constructor(settings: AppSettings) {
    this.decimalPlaces = settings.decimalPlaces;
    this.numberFormat = settings.numberFormat;
    this.language = settings.language;
  }

  /**
   * Форматирует число согласно настройкам
   */
  format(value: number): string {
    if (this.numberFormat === 'compact' && Math.abs(value) >= 1000) {
      return new Intl.NumberFormat(this.getLocale(), {
        notation: 'compact',
        maximumFractionDigits: this.decimalPlaces,
        minimumFractionDigits: 0,
      }).format(value);
    }

    return new Intl.NumberFormat(this.getLocale(), {
      minimumFractionDigits: 0,
      maximumFractionDigits: this.decimalPlaces,
    }).format(value);
  }

  /**
   * Форматирует валютное значение
   */
  formatCurrency(value: number, currency: string): string {
    return new Intl.NumberFormat(this.getLocale(), {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: this.decimalPlaces,
    }).format(value);
  }

  /**
   * Форматирует процентное значение
   */
  formatPercent(value: number): string {
    return new Intl.NumberFormat(this.getLocale(), {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value / 100);
  }

  /**
   * Получает локаль для форматирования
   */
  private getLocale(): string {
    switch (this.language) {
      case 'ru':
        return 'ru-RU';
      case 'en':
        return 'en-US';
      case 'be':
        return 'be-BY';
      default:
        return 'ru-RU';
    }
  }

  /**
   * Получает шаг для input[type="number"]
   */
  getInputStep(): string {
    if (this.decimalPlaces === 0) return '1';
    return `0.${'0'.repeat(this.decimalPlaces - 1)}1`;
  }

  /**
   * Округляет число до заданного количества знаков
   */
  round(value: number): number {
    const factor = Math.pow(10, this.decimalPlaces);
    return Math.round(value * factor) / factor;
  }
}

/**
 * Хук для получения форматтера чисел
 */
export function useNumberFormatter(settings: AppSettings): NumberFormatter {
  return new NumberFormatter(settings);
}