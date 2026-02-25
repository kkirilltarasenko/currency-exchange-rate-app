# Стратегия тестирования для Currency Exchange Rate App

## Обзор

Данный документ описывает комплексную стратегию тестирования для приложения обмена валют, включающего:
- **Backend**: NestJS API с модульной архитектурой
- **Frontend**: Next.js приложение с React и feature-based архитектурой
- **Contracts**: Общие типы TypeScript

## Инструменты тестирования

### Backend
- **Jest** - Unit тесты
- **Supertest** - Integration тесты для API endpoints
- **@nestjs/testing** - Тестирование NestJS модулей

### Frontend
- **Jest** - Unit тесты для функций и хуков
- **React Testing Library** - Unit тесты для компонентов
- **Cypress** - E2E тесты для пользовательских сценариев

## Backend Testing Strategy

### 1. Unit Tests (Jest)

#### Покрытие:
- **Services**: Бизнес-логика банковских сервисов
- **Controllers**: HTTP endpoints и валидация
- **Utils**: Вспомогательные функции
- **DTOs**: Валидация данных

#### Приоритетные компоненты для тестирования:

**AlfaBankService**
```typescript
// Тесты для:
- mapRates() - корректное преобразование API ответа
- getRates() - обработка успешных и неуспешных запросов
- Обработка ошибок API
- Валидация структуры данных
```

**AppController**
```typescript
// Тесты для:
- GET /health - проверка статуса приложения
- GET /alfa-bank/rates - получение курсов валют
- Обработка ошибок HTTP
- Валидация ответов
```

**Logger Utility**
```typescript
// Тесты для:
- Форматирование сообщений
- Различные уровни логирования
- Обработка ошибок
```

#### Структура тестов:
```
backend/src/
├── modules/
│   └── alfa-bank/
│       ├── alfa-bank.service.spec.ts
│       └── alfa-bank.controller.spec.ts
├── utils/
│   └── logger.util.spec.ts
└── common/
    ├── dto/
    │   └── bank.dto.spec.ts
    └── exceptions/
        └── base.exception.spec.ts
```

### 2. Integration Tests

#### API Endpoints тестирование:
- Полный цикл запрос-ответ
- Валидация схем ответов
- Обработка ошибок сети
- Тестирование middleware

### 3. Метрики покрытия
- **Минимальное покрытие**: 80%
- **Критические компоненты**: 95%
- **Исключения**: Конфигурационные файлы, типы

## Frontend Testing Strategy

### 1. Unit Tests (Jest + React Testing Library)

#### Покрытие:

**Hooks**
```typescript
// use-currency-conversion.ts
- getBestExchangeRate() - логика выбора лучшего курса
- convertCurrency() - конвертация валют
- swapCurrencies() - обмен валют местами
- updateFromAmount/updateToAmount - обновление сумм
- Обработка состояний загрузки
```

**API Layer**
```typescript
// exchange-api.ts
- ExchangeApi.getAlfaBankRates() - HTTP запросы
- Обработка ошибок сети
- Трансформация данных
```

**Utility Functions**
```typescript
// http-client.ts
- HTTP клиент конфигурация
- Обработка ошибок
- Interceptors
```

**Components (Logic Testing)**
```typescript
// Тестирование логики без UI:
- CurrencyConverter - расчеты и валидация
- CurrencySelect - выбор валют
- BankRatesTable - сортировка и фильтрация данных
```

#### Структура unit тестов:
```
frontend/
├── features/
│   └── currency-conversion/
│       ├── hooks/
│       │   ├── use-currency-conversion.test.ts
│       │   └── use-currency-rates.query.test.ts
│       └── components/
│           ├── currency-converter.test.tsx
│           ├── currency-select.test.tsx
│           └── bank-rates-table.test.tsx
├── api/
│   ├── exchange-api.test.ts
│   └── http-client.test.ts
└── shared/
    └── hooks/
        └── use-current-route-info.test.ts
```

### 2. E2E Tests (Cypress)

#### Пользовательские сценарии:

**Основной флоу конвертации валют**
```typescript
describe('Currency Conversion Flow', () => {
  it('should convert USD to BYN successfully', () => {
    // 1. Открыть главную страницу
    // 2. Ввести сумму в USD
    // 3. Выбрать BYN как целевую валюту
    // 4. Проверить корректность расчета
    // 5. Проверить отображение курса
  });
});
```

**Навигация и UI**
```typescript
describe('Application Navigation', () => {
  it('should navigate between pages correctly', () => {
    // Тестирование sidebar навигации
    // Проверка активных состояний
    // Корректность URL
  });
});
```

**Обработка ошибок**
```typescript
describe('Error Handling', () => {
  it('should handle API errors gracefully', () => {
    // Имитация сетевых ошибок
    // Проверка fallback состояний
    // Отображение ошибок пользователю
  });
});
```

**Responsive Design**
```typescript
describe('Responsive Design', () => {
  it('should work on mobile devices', () => {
    // Тестирование на разных разрешениях
    // Проверка адаптивности компонентов
  });
});
```

#### Структура E2E тестов:
```
cypress/
├── e2e/
│   ├── currency-conversion.cy.ts
│   ├── navigation.cy.ts
│   ├── error-handling.cy.ts
│   └── responsive.cy.ts
├── fixtures/
│   ├── bank-rates.json
│   └── api-responses.json
└── support/
    ├── commands.ts
    └── page-objects/
        ├── currency-converter.po.ts
        └── navigation.po.ts
```

## Конфигурация тестирования

### Backend Jest Configuration
```json
{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": "src",
  "testRegex": ".*\\.spec\\.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "collectCoverageFrom": [
    "**/*.(t|j)s",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/*.interface.ts"
  ],
  "coverageDirectory": "../coverage",
  "testEnvironment": "node",
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  }
}
```

### Frontend Jest Configuration
```json
{
  "testEnvironment": "jsdom",
  "setupFilesAfterEnv": ["<rootDir>/jest.setup.js"],
  "moduleNameMapping": {
    "^@/(.*)$": "<rootDir>/$1",
    "^@contracts/(.*)$": "<rootDir>/../contracts/$1"
  },
  "collectCoverageFrom": [
    "**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 75,
      "functions": 75,
      "lines": 75,
      "statements": 75
    }
  }
}
```

### Cypress Configuration
```json
{
  "baseUrl": "http://localhost:3001",
  "viewportWidth": 1280,
  "viewportHeight": 720,
  "video": true,
  "screenshotOnRunFailure": true,
  "defaultCommandTimeout": 10000,
  "requestTimeout": 10000,
  "responseTimeout": 10000
}
```

## Моки и фикстуры

### Backend Mocks
```typescript
// Мок для внешних API
const mockAlfaBankResponse = {
  rates: [
    {
      sellRate: 3.2,
      sellIso: "USD",
      buyRate: 3.1,
      buyIso: "BYN",
      quantity: 1,
      name: "USD/BYN",
      date: "2024-01-01T00:00:00Z"
    }
  ]
};
```

### Frontend Mocks
```typescript
// Мок для React Query
const mockQueryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false }
  }
});

// Мок для API вызовов
jest.mock('../api/exchange-api', () => ({
  ExchangeApi: {
    getAlfaBankRates: jest.fn()
  }
}));
```

## CI/CD Integration

### GitHub Actions Workflow
```yaml
name: Tests
on: [push, pull_request]

jobs:
  backend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:cov
      - run: npm run test:e2e

  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:coverage
      - run: npm run cypress:run
```

## Метрики и отчетность

### Покрытие кода
- **Backend**: Минимум 80% для всех метрик
- **Frontend**: Минимум 75% для всех метрик
- **Критические функции**: 95% покрытие

### Производительность тестов
- **Unit тесты**: < 30 секунд
- **E2E тесты**: < 5 минут
- **Полный набор**: < 10 минут

### Отчеты
- HTML отчеты покрытия
- JUnit XML для CI/CD
- Скриншоты и видео для E2E тестов

## Этапы внедрения

### Фаза 1: Backend Unit Tests
1. Настройка Jest конфигурации
2. Тесты для AlfaBankService
3. Тесты для контроллеров
4. Тесты для утилит

### Фаза 2: Frontend Unit Tests
1. Настройка Jest + RTL
2. Тесты для хуков
3. Тесты для API слоя
4. Тесты для компонентов

### Фаза 3: E2E Tests
1. Настройка Cypress
2. Основные пользовательские сценарии
3. Тесты обработки ошибок
4. Responsive тесты

### Фаза 4: CI/CD Integration
1. GitHub Actions настройка
2. Автоматические отчеты
3. Quality gates
4. Performance monitoring

## Поддержка и развитие

### Code Review Guidelines
- Все новые функции должны иметь тесты
- Покрытие не должно снижаться
- Тесты должны быть читаемыми и поддерживаемыми

### Обновление тестов
- Регулярный рефакторинг тестов
- Обновление моков при изменении API
- Добавление новых тест-кейсов для багов

### Документация
- Комментарии в сложных тестах
- README для каждого типа тестов
- Примеры написания тестов