# GitHub Workflows Documentation

This directory contains GitHub Actions workflows for the Currency Exchange Rate App CI/CD pipeline.

## Workflows Overview

### 1. Backend CI (`backend.yml`)
**Triggers:**
- Push to `main` or `develop` branches with changes in `backend/` or `contracts/`
- Pull requests to `main` or `develop` branches with changes in `backend/` or `contracts/`

**Pipeline Steps:**
1. **Linting** - ESLint code quality checks
2. **Building** - NestJS application build
3. **Testing** - Unit tests and E2E tests

**Matrix Strategy:** Tests on Node.js 18.x and 20.x

### 2. Frontend CI (`frontend.yml`)
**Triggers:**
- Push to `main` or `develop` branches with changes in `frontend/` or `contracts/`
- Pull requests to `main` or `develop` branches with changes in `frontend/` or `contracts/`

**Pipeline Steps:**
1. **Linting** - ESLint code quality checks
2. **Building** - Next.js application build
3. **Testing** - Jest unit tests and Cypress E2E tests

**Matrix Strategy:** Tests on Node.js 18.x and 20.x
**Package Manager:** Uses pnpm as specified in package.json

### Path-based Triggering
- Backend workflow only runs when backend or contracts code changes
- Frontend workflow only runs when frontend or contracts code changes

### Dependency Management
- Backend uses npm with `package-lock.json`
- Frontend uses pnpm with `pnpm-lock.yaml`

### Test Coverage
- Unit tests for both backend and frontend
- E2E tests using Jest (backend) and Cypress (frontend)
- Integration tests in the full pipeline
- Coverage reports uploaded to Codecov