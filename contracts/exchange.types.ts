// Exchange module Request and Response types

// Base types
export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  timestamp: string;
}

export interface HistoricalDataPoint {
  date: string;
  rate: number;
}

// Request types
export interface ConversionRequest {
  amount: number;
  from: string;
  to: string;
}

export interface HistoricalDataRequest {
  from: string;
  to: string;
  startDate: string;
  endDate: string;
}

export interface GetCurrentRatesRequest {
  baseCurrency?: string;
}

export interface GetSupportedCurrenciesRequest {
  // No parameters needed
}

export interface GetBankRatesRequest {
  // No parameters needed
}

// Response types
export interface ConversionResponse {
  originalAmount: number;
  convertedAmount: number;
  rate: number;
  from: string;
  to: string;
  timestamp: string;
}

export interface HistoricalDataResponse {
  from: string;
  to: string;
  data: HistoricalDataPoint[];
}

export interface GetCurrentRatesResponse {
  rates: ExchangeRate[];
  baseCurrency: string;
  timestamp: string;
}

export interface GetSupportedCurrenciesResponse {
  currencies: string[];
}

export interface GetBankRatesResponse {
  rates: ExchangeRate[];
  source: string;
  timestamp: string;
}