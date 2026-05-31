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
3. **Testing** - Unit tests

**Matrix Strategy:** Node.js 20.x

### 2. Frontend CI (`frontend.yml`)
**Triggers:**
- Push to `main` or `develop` branches with changes in `frontend/` or `contracts/`
- Pull requests to `main` or `develop` branches with changes in `frontend/` or `contracts/`

**Pipeline Steps:**
1. **Linting** - ESLint code quality checks
2. **Building** - Next.js application build
3. **Testing** - Jest unit tests and Cypress E2E tests

**Matrix Strategy:** Node.js 20.x  
**Package Manager:** pnpm as specified in `frontend/package.json`

### 3. Build Backend Docker Image (`nestjs.yml`)
**Triggers:**
- `workflow_run` after **Backend CI** and **Frontend CI** complete successfully

**Pipeline Steps:**
- Build and push Docker image to **GitHub Container Registry (GHCR)**

**Image Tags:**
- `sha-<commit>` for every run
- `latest` for `main` branch

### 4. Deploy Backend (`deploy.yml`)
**Triggers:**
- `workflow_run` after **Build Backend Docker Image** succeeds

**Pipeline Steps:**
- Trigger Render deploy hook using `RENDER_DEPLOY_HOOK_URL` secret

### 5. Deploy Frontend to GitHub Pages (`nextjs.yml`)
**Triggers:**
- `workflow_run` after **Deploy Backend** succeeds

**Pipeline Steps:**
- Build Next.js static export
- Deploy to GitHub Pages

### Flow Summary
1. **Backend CI** + **Frontend CI** run in parallel (path-based)
2. **Build Backend Docker Image** (`nestjs.yml`)
3. **Deploy Backend** (`deploy.yml`)
4. **Deploy Frontend** (`nextjs.yml`)

### Path-based Triggering
- Backend workflow only runs when backend or contracts code changes
- Frontend workflow only runs when frontend or contracts code changes

### Dependency Management
- Backend uses npm with `package-lock.json`
- Frontend uses pnpm with `pnpm-lock.yaml`

### Test Coverage
- Unit tests for both backend and frontend
- E2E tests: Jest (backend), Cypress (frontend)
- Coverage reports uploaded to Codecov