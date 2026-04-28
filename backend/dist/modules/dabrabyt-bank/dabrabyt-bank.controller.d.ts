import { DabrabytBankService } from './dabrabyt-bank.service';
export declare class DabrabytBankController {
    private readonly dabrabytBankService;
    constructor(dabrabytBankService: DabrabytBankService);
    getRates(): Promise<import("../../common/dto/bank.dto").BankRatesResponse>;
}
