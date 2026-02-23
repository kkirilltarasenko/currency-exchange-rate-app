import { AbstractBank } from '../../common/decorators/abstract-bank.module';
import { BankRate } from '../../common/dto/bank.dto';
export declare class AlfaBankService extends AbstractBank {
    protected apiUrl: string;
    protected bankName: string;
    protected logoUrl: string;
    protected mapRates(apiResponse: unknown): BankRate[];
}
