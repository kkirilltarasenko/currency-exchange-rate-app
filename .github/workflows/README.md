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

### 3. Full CI Pipeline (`full-ci.yml`)
**Triggers:**
- Push to `main` or `develop` branches (any changes)
- Pull requests to `main` or `develop` branches (any changes)

**Pipeline Steps:**
1. **Backend CI** - Complete backend pipeline
2. **Frontend CI** - Complete frontend pipeline  
3. **Integration Tests** - Runs only after both backend and frontend CI succeed
4. **Deploy Ready** - Notification step for successful completion (main branch only)

## Key Features

### Path-based Triggering
- Backend workflow only runs when backend or contracts code changes
- Frontend workflow only runs when frontend or contracts code changes
- Full pipeline runs on any changes

### Dependency Management
- Backend uses npm with `package-lock.json`
- Frontend uses pnpm with `pnpm-lock.yaml`
- Proper caching configured for faster builds

### Test Coverage
- Unit tests for both backend and frontend
- E2E tests using Jest (backend) and Cypress (frontend)
- Integration tests in the full pipeline
- Coverage reports uploaded to Codecov

### Artifact Management
- Cypress screenshots and videos uploaded on test failures
- Integration test results preserved
- Coverage reports for analysis

### Matrix Testing
- Tests run on multiple Node.js versions (18.x, 20.x)
- Ensures compatibility across different environments

## Workflow Dependencies

```
Backend CI ──┐
             ├── Integration Tests ── Deploy Ready
Frontend CI ─┘
```

The integration tests job only runs after both backend and frontend CI jobs complete successfully, ensuring the entire application works together before deployment.

## Usage

These workflows will automatically run when:
1. Code is pushed to `main` or `develop` branches
2. Pull requests are opened against `main` or `develop` branches

No manual intervention is required - the workflows are fully automated.

## Monitoring

Check the "Actions" tab in your GitHub repository to monitor workflow runs and view detailed logs for each step.