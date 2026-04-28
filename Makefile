.PHONY: help install install-backend install-frontend dev dev-backend dev-frontend build build-backend build-frontend clean test lint stop

# Default target
help:
	@echo "Available commands:"
	@echo "  make install     - Install dependencies for both backend and frontend"
	@echo "  make dev         - Run both backend and frontend in development mode"
	@echo "  make dev-backend - Run only backend in development mode"
	@echo "  make dev-frontend- Run only frontend in development mode"
	@echo "  make build       - Build both backend and frontend"
	@echo "  make test        - Run tests for both backend and frontend"
	@echo "  make lint        - Run linting for both backend and frontend"
	@echo "  make clean       - Clean node_modules and build artifacts"
	@echo "  make stop        - Stop all running processes"

# Install dependencies
install: install-backend install-frontend

install-backend:
	@echo "Installing backend dependencies..."
	cd backend && npm install

install-frontend:
	@echo "Installing frontend dependencies..."
	cd frontend && pnpm install

# Development mode - run both services concurrently
dev: install
	@echo "Starting backend (port 3002) and frontend (port 3001) in development mode..."
	@echo "Backend will be available at: http://localhost:3002"
	@echo "Frontend will be available at: http://localhost:3001"
	@echo "Press Ctrl+C to stop both services"
	@trap 'kill %1 %2 2>/dev/null; exit' INT; \
	cd backend && npm run start:dev & \
	cd frontend && pnpm dev & \
	wait

# Run only backend
dev-backend: install-backend
	@echo "Starting backend on port 3002..."
	cd backend && npm run start:dev

# Run only frontend
dev-frontend: install-frontend
	@echo "Starting frontend on port 3001..."
	cd frontend && pnpm dev

# Build both services
build: build-backend build-frontend

build-backend: install-backend
	@echo "Building backend..."
	cd backend && npm run build

build-frontend: install-frontend
	@echo "Building frontend..."
	cd frontend && pnpm build

# Run tests
test:
	@echo "Running backend tests..."
	cd backend && npm test
	@echo "Running frontend tests..."
	cd frontend && pnpm test

# Run linting
lint:
	@echo "Linting backend..."
	cd backend && npm run lint
	@echo "Linting frontend..."
	cd frontend && pnpm lint

# Clean build artifacts and dependencies
clean:
	@echo "Cleaning backend..."
	cd backend && rm -rf node_modules dist coverage
	@echo "Cleaning frontend..."
	cd frontend && rm -rf node_modules .next coverage

# Stop running processes (useful for cleanup)
stop:
	@echo "Stopping any running Node.js processes..."
	@pkill -f "nest start" || true
	@pkill -f "next dev" || true
	@lsof -ti:3002 | xargs kill -9 2>/dev/null || true
	@lsof -ti:3001 | xargs kill -9 2>/dev/null || true
	@sleep 1
	@echo "Processes stopped"

# Production targets
start-prod: build
	@echo "Starting services in production mode..."
	@trap 'kill %1 %2 2>/dev/null; exit' INT; \
	cd backend && npm run start:prod & \
	cd frontend && pnpm start & \
	wait

# Quick development setup (install + dev)
setup: install dev

# Health check
health:
	@echo "Checking if services are running..."
	@curl -s http://localhost:3002 > /dev/null && echo "✓ Backend is running on port 3002" || echo "✗ Backend is not responding"
	@curl -s http://localhost:3001 > /dev/null && echo "✓ Frontend is running on port 3001" || echo "✗ Frontend is not responding"