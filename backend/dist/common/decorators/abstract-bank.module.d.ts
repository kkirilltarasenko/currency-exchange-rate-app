import { Bank } from '../types/base-bank.types';
import { BankRate, BankRatesResponse } from '../dto/bank.dto';
export declare abstract class AbstractBank implements Bank {
    protected abstract apiUrl: string;
    protected abstract bankName: string;
    protected abstract logoUrl: string;
    protected responseType: 'json' | 'xml';
    getName(): string;
    getLogo(): string;
    protected buildApiUrl(): string;
    getRates(): Promise<BankRatesResponse>;
    protected abstract mapRates(apiResponse: unknown): BankRate[];
}
