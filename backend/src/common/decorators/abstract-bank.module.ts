import { Bank } from '../types/base-bank.types';
import { BankRate, BankRatesResponse } from '../dto/bank.dto';
import * as xml2js from 'xml2js';

export abstract class AbstractBank implements Bank {
  protected abstract apiUrl: string;
  protected abstract bankName: string;
  protected abstract logoUrl: string;
  protected responseType: 'json' | 'xml' = 'json';

  getName(): string {
    return this.bankName;
  }

  getLogo(): string {
    return this.logoUrl;
  }

  protected buildApiUrl(): string {
    return this.apiUrl;
  }

  async getRates(): Promise<BankRatesResponse> {
    try {
      const response = await fetch(this.buildApiUrl());

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data: unknown;

      if (this.responseType === 'xml') {
        const xmlText = await response.text();
        const parser = new xml2js.Parser({ explicitArray: false });
        data = await parser.parseStringPromise(xmlText);
      } else {
        data = await response.json();
      }

      const rates = this.mapRates(data);
      console.log(
        `[${this.bankName}] Successfully fetched ${rates.length} rates`,
      );

      return {
        bankName: this.bankName,
        logoUrl: this.logoUrl,
        rates,
      };
    } catch (error) {
      console.error(`[${this.bankName}] Error fetching rates:`, error);
      throw error;
    }
  }

  protected abstract mapRates(apiResponse: unknown): BankRate[];
}
