import { AlfaBankService } from './alfa-bank.service';
export declare class AlfaBankController {
    private readonly alfaBankService;
    constructor(alfaBankService: AlfaBankService);
    getRates(): Promise<import("../../common/dto/bank.dto").BankRatesResponse>;
}
