import { AbstractBank } from '../../common/decorators/abstract-bank.module';
import { BankRate } from '../../common/dto/bank.dto';
export declare class DabrabytBankService extends AbstractBank {
    protected apiUrl: string;
    protected bankName: string;
    protected logoUrl: string;
    protected responseType: "xml";
    private readonly currencyCodeMap;
    private readonly currencyNameMap;
    protected mapRates(apiResponse: unknown): BankRate[];
}
