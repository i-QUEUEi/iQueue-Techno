/**
 * Centralized API client for backend service communication
 * Handles all HTTP requests, error handling, and response transformation
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp?: string;
}

export interface RequestOptions {
  timeout?: number;
  headers?: Record<string, string>;
}

class ApiClient {
  private baseUrl: string;
  private defaultTimeout: number = 30000;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async request<T>(
    endpoint: string,
    options: RequestOptions & { method?: string; body?: any } = {}
  ): Promise<ApiResponse<T>> {
    const { method = 'GET', headers = {}, body, timeout = this.defaultTimeout } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.error || `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      const data = await response.json();
      return {
        success: true,
        data: data as T,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return {
            success: false,
            error: `Request timeout after ${timeout}ms`,
          };
        }
        return {
          success: false,
          error: error.message || 'Unknown error occurred',
        };
      }

      return {
        success: false,
        error: 'Unknown error occurred',
      };
    }
  }

  get<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T>(endpoint: string, body: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  }
}

export const apiClient = new ApiClient();
