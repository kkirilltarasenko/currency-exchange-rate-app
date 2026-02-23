import { BankRatesResponse } from '../dto/bank.dto';

export interface Bank {
  getName(): string;
  getLogo(): string;
  getRates(): Promise<BankRatesResponse>;
}
