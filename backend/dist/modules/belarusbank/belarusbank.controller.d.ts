import { BelarusBankService } from './belarusbank.service';
export declare class BelarusBankController {
    private readonly belarusBankService;
    constructor(belarusBankService: BelarusBankService);
    getRates(): Promise<import("../../common/dto/bank.dto").BankRatesResponse>;
}
