export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002",
} as const;

export const API_ENDPOINTS = {
  HELLO: "/hello/world",
} as const;

export const QUERY_KEYS = {
  HELLO: "/hello/world",
} as const;
