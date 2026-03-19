import { AbstractBank } from '../../common/decorators/abstract-bank.module';
import { BankRate } from '../../common/dto/bank.dto';
export declare class BelarusBankService extends AbstractBank {
    protected apiUrl: string;
    protected bankName: string;
    protected logoUrl: string;
    private readonly currencyCodeMap;
    protected mapRates(apiResponse: unknown): BankRate[];
    private transformRates;
}
