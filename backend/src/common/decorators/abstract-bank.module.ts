import { Bank } from '../types/base-bank.types';
import { BankRate, BankRatesResponse } from '../dto/bank.dto';

export abstract class AbstractBank implements Bank {
  protected abstract apiUrl: string;
  protected abstract bankName: string;
  protected abstract logoUrl: string;

  getName(): string {
    return this.bankName;
  }

  getLogo(): string {
    return this.logoUrl;
  }

  async getRates(): Promise<BankRatesResponse> {
    const response = await fetch(this.apiUrl);
    const data: unknown = await response.json();

    return {
      bankName: this.bankName,
      logoUrl: this.logoUrl,
      rates: this.mapRates(data),
    };
  }

  protected abstract mapRates(apiResponse: unknown): BankRate[];
}
