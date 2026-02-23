export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  timestamp: Date;
}


export interface ConversionResult {
  amount: number;
  fromCurrency: Currency;
  toCurrency: Currency;
  convertedAmount: number;
  rate: number;
}