# Contracts

This folder contains shared TypeScript type definitions for Request and Response types used by both backend and frontend applications.

## Structure

- [`common.types.ts`](./common.types.ts) - Common types used across all modules (ApiResponse, pagination, errors, etc.)
- [`hello.types.ts`](./hello.types.ts) - Types for the Hello module
- [`exchange.types.ts`](./exchange.types.ts) - Types for the Exchange/Currency module
- [`health.types.ts`](./health.types.ts) - Types for the Health check module
- [`index.ts`](./index.ts) - Main export file for all types

## Usage

### In Backend (NestJS)

```typescript
// Import specific types
import { ConversionRequest, ConversionResponse } from '../../../contracts/exchange.types';
import { ApiResponse } from '../../../contracts/common.types';

// Or import from main index
import { ConversionRequest, ConversionResponse, ApiResponse } from '../../../contracts';

@Controller('exchange')
export class ExchangeController {
  @Post('convert')
  async convertCurrency(@Body() request: ConversionRequest): Promise<ApiResponse<ConversionResponse>> {
    // Implementation
  }
}
```

### In Frontend (Next.js)

```typescript
// Import specific types
import { ConversionRequest, ConversionResponse } from '../../contracts/exchange.types';
import { ApiResponse } from '../../contracts/common.types';

// Or import from main index
import { ConversionRequest, ConversionResponse, ApiResponse } from '../../contracts';

export class ExchangeApi {
  static async convertCurrency(request: ConversionRequest): Promise<ConversionResponse> {
    return httpClient.post<ConversionResponse>('/exchange/convert', request);
  }
}
```

## Benefits

1. **Type Safety** - Ensures both backend and frontend use the same type definitions
2. **Single Source of Truth** - All API contracts are defined in one place
3. **Easy Maintenance** - Changes to API contracts only need to be made in one location
4. **Better Developer Experience** - IDE autocompletion and type checking across both applications
5. **Documentation** - Types serve as documentation for API contracts

## Adding New Modules

When adding a new module, create a new file following the pattern `moduleName.types.ts`:

```typescript
// newModule.types.ts

// Request types
export interface NewModuleRequest {
  // Define request properties
}

// Response types
export interface NewModuleResponse {
  // Define response properties
}
```

Then export the new types in [`index.ts`](./index.ts):

```typescript
export * from './newModule.types';
```

## Type Naming Conventions

- **Request types**: `{Action}Request` (e.g., `ConversionRequest`, `HistoricalDataRequest`)
- **Response types**: `{Action}Response` (e.g., `ConversionResponse`, `HistoricalDataResponse`)
- **Data types**: Descriptive names (e.g., `ExchangeRate`, `HistoricalDataPoint`)
- **Common types**: Prefixed with purpose (e.g., `ApiResponse`, `ValidationError`)