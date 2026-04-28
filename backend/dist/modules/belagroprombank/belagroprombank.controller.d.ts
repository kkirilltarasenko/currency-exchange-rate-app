import { BelagropromBankService } from './belagroprombank.service';
export declare class BelagropromBankController {
    private readonly belagropromBankService;
    constructor(belagropromBankService: BelagropromBankService);
    getRates(): Promise<import("../../common/dto/bank.dto").BankRatesResponse>;
}
