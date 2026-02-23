// Main contracts export file
// This file exports all types from all modules for easy importing

// Common types
export * from './common.types';

// Module-specific types
export * from './hello.types';
export * from './exchange.types';
export * from './health.types';

// Re-export commonly used types for convenience
export type {
  ApiResponse,
  SuccessResponse,
  ErrorResponse,
  ApiError,
  ValidationError,
  PaginationRequest,
  PaginationResponse,
} from './common.types';

export type {
  HelloResponse,
  HelloWorldResponse,
} from './hello.types';

export type {
  ExchangeRate,
  ConversionRequest,
  ConversionResponse,
  HistoricalDataRequest,
  HistoricalDataResponse,
  GetCurrentRatesResponse,
  GetSupportedCurrenciesResponse,
  GetBankRatesResponse,
} from './exchange.types';

export type {
  HealthCheckResponse,
  DetailedHealthCheckResponse,
  ServiceStatus,
} from './health.types';