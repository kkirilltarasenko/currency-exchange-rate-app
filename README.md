# 💱 Currency Exchange Rate Application

Современное веб-приложение для получения и анализа актуальной информации о курсах валют, построенное на TypeScript и Next.js.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status](https://img.shields.io/badge/Status-In%20Development-blue.svg)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black.svg)](https://nextjs.org/)

## 📋 Описание

Система предоставляет пользователям удобный доступ к актуальной информации о валютных курсах, включая:
- Просмотр текущих курсов валют
- Визуализация динамики изменений
- Конвертация между валютами
- Автоматическое обновление данных

### Предварительные требования

- **Node.js 20+** - [Скачать](https://nodejs.org/)
- **pnpm 10+** - [Установка](https://pnpm.io/installation)
- **Git** - [Установка](https://git-scm.com/downloads)

### Установка

1. **Клонирование репозитория**
   ```bash
   git clone https://github.com/username/currency-exchange-rate-app.git
   cd currency-exchange-rate-app
   ```

2. **Установка зависимостей**
   
   **Frontend:**
   ```bash
   cd frontend
   pnpm install
   ```
   
   **Backend:**
   ```bash
   cd backend
   npm install
   ```

3. **Настройка переменных окружения**
   ```bash
   # Для frontend
   cp frontend/.env.example frontend/.env.local
   
   # Для backend
   cp backend/.env.example backend/.env
   ```

### Запуск приложения

#### Режим разработки

**Frontend (Next.js):**
```bash
cd frontend
pnpm dev
# Приложение будет доступно по адресу: http://localhost:3001
```

**Backend (NestJS):**
```bash
cd backend
npm run start:dev
# API будет доступно по адресу: http://localhost:3002
```

#### Быстрый запуск с Makefile

Для удобства разработки добавлен [`Makefile`](Makefile) с командами для одновременного запуска backend и frontend:

```bash
# Установка всех зависимостей
make install

# Запуск обоих сервисов одновременно
make dev
# Backend: http://localhost:3002
# Frontend: http://localhost:3001

# Запуск только backend
make dev-backend

# Запуск только frontend
make dev-frontend

# Сборка обоих проектов
make build

# Запуск тестов
make test

# Линтинг кода
make lint

# Остановка всех процессов
make stop

# Очистка зависимостей и артефактов сборки
make clean

# Показать все доступные команды
make help
```

#### Продакшен

**Frontend:**
```bash
cd frontend
pnpm build
pnpm start
```

**Backend:**
```bash
cd backend
npm run build
npm run start:prod
```

### Доступные команды

**Frontend:**
```bash
# Запуск в режиме разработки
pnpm dev

# Сборка для продакшена
pnpm build

# Запуск продакшен сборки
pnpm start

# Линтинг кода
pnpm lint

# Запуск тестов
pnpm test

# Запуск тестов в watch режиме
pnpm test:watch

# Проверка покрытия тестами
pnpm test:coverage

# E2E тесты с Cypress
pnpm cypress:open
pnpm cypress:run
```

**Backend:**
```bash
# Запуск в режиме разработки
npm run start:dev

# Запуск с отладкой
npm run start:debug

# Сборка для продакшена
npm run build

# Запуск продакшен сборки
npm run start:prod

# Линтинг кода
npm run lint

# Форматирование кода
npm run format

# Запуск тестов
npm run test

# Запуск тестов в watch режиме
npm run test:watch

# Проверка покрытия тестами
npm run test:cov

# E2E тесты
npm run test:e2e
```
## 🧪 Тестирование

### Запуск тестов

**Frontend:**
```bash
cd frontend
# Unit тесты
pnpm test

# Тесты в watch режиме
pnpm test:watch

# С покрытием кода
pnpm test:coverage

# E2E тесты с Cypress
pnpm cypress:open  # интерактивный режим
pnpm cypress:run   # headless режим
```

**Backend:**
```bash
cd backend
# Unit тесты
npm run test

# Тесты в watch режиме
npm run test:watch

# С покрытием кода
npm run test:cov

# E2E тесты
npm run test:e2e
```

### Тестовые данные

- Frontend: Тестовые данные находятся в [`frontend/cypress/fixtures/`](frontend/cypress/fixtures/)
- Backend: Моки и фикстуры в [`backend/test/`](backend/test/)

## 📈 Мониторинг и аналитика

### Метрики производительности

- **Core Web Vitals** мониторинг
- **Real User Monitoring (RUM)**
- **API response time** отслеживание

## 🚀 Деплой

### Vercel (рекомендуется)

```bash
# Установка Vercel CLI
npm i -g vercel

# Деплой
vercel

# Продакшен деплой
vercel --prod
```

### Docker

```bash
# Сборка образа
docker build -t currency-app .

# Запуск контейнера
docker run -p 3001:3001 -p 3002:3002 currency-app
```

### Docker Compose

```yaml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
    depends_on:
      - backend
      
  backend:
    build: ./backend
    ports:
      - "3002:3002"
    environment:
      - NODE_ENV=production
```

## 🛠️ Технологический стек

### Frontend
- **Next.js 16** - React фреймворк с App Router
- **TypeScript 5** - Типизированный JavaScript
- **React 19** - UI библиотека
- **Chakra UI 3** - Компонентная библиотека
- **Emotion** - CSS-in-JS решение
- **TanStack Query** - Управление состоянием сервера
- **React Icons** - Иконки
- **Next Themes** - Поддержка тем

### Backend
- **NestJS 11** - Node.js фреймворк
- **TypeScript 5** - Типизированный JavaScript
- **Express** - HTTP сервер
- **RxJS** - Реактивное программирование

### Тестирование
- **Jest** - Unit и Integration тесты
- **React Testing Library** - Тестирование React компонентов
- **Cypress** - E2E тестирование
- **Supertest** - Тестирование API

### Инструменты разработки
- **ESLint** - Линтер кода
- **Prettier** - Форматтер кода
- **TypeScript ESLint** - Линтинг TypeScript
- **pnpm** - Пакетный менеджер (frontend)
- **npm** - Пакетный менеджер (backend)

### DevOps
- **Docker** - Контейнеризация
- **GitHub Actions** - CI/CD
