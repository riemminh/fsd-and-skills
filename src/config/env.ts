/**
 * Environment variables configuration
 * Centralized environment variable access with type safety
 */

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const env = {
  // API Configuration
  apiUrl: getEnvVar("NEXT_PUBLIC_API_URL", "http://localhost:3000/api"),

  // App Configuration
  nodeEnv: getEnvVar("NODE_ENV", "development"),
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",

  // Feature Flags
  enableDevTools: process.env.NEXT_PUBLIC_ENABLE_DEV_TOOLS === "true",
  enableMockData: process.env.NEXT_PUBLIC_ENABLE_MOCK_DATA === "true",
} as const;
