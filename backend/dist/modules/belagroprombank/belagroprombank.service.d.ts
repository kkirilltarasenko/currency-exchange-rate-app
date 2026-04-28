import { AbstractBank } from '../../common/decorators/abstract-bank.module';
import { BankRate } from '../../common/dto/bank.dto';
export declare class BelagropromBankService extends AbstractBank {
    protected apiUrl: string;
    protected bankName: string;
    protected logoUrl: string;
    protected responseType: 'json' | 'xml';
    private readonly currencyCodeMap;
    protected buildApiUrl(): string;
    protected mapRates(apiResponse: unknown): BankRate[];
    private getCurrencyName;
}
