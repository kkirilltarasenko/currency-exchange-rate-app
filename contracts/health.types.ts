// Health module Request and Response types

// Request types
export interface HealthCheckRequest {
  // No parameters needed
}

// Response types
export interface HealthCheckResponse {
  status: string;
  timestamp: string;
  uptime?: number;
  version?: string;
  environment?: string;
}

export interface DetailedHealthCheckResponse extends HealthCheckResponse {
  services: {
    database?: ServiceStatus;
    externalApi?: ServiceStatus;
    cache?: ServiceStatus;
  };
}

export interface ServiceStatus {
  status: 'healthy' | 'unhealthy' | 'degraded';
  responseTime?: number;
  lastCheck: string;
  error?: string;
}