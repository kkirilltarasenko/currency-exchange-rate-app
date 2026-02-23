export interface BankRate {
  sellRate: number;
  sellIso: string;
  sellCode: number;
  buyRate: number;
  buyIso: string;
  buyCode: number;
  quantity: number;
  name: string;
  date: string;
}

export interface BankRatesResponse {
  bankName: string;
  logoUrl: string;
  rates: BankRate[];
}
