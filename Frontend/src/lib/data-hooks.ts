/**
 * Custom React hooks for data fetching across admin modules
 * Handles loading, error, and empty states with proper TypeScript typing
 */

import { useEffect, useState, useCallback } from 'react';
import type { ApiResponse } from './api-client';

interface MultiDataCacheEntry {
  data: Record<string, any>;
  timestamp: number;
}

const multiDataMemoryCache = new Map<string, MultiDataCacheEntry>();

export interface UseDataState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Generic hook for fetching data from any endpoint
 * Handles loading, error states, and automatic retries
 */
export function useData<T>(
  fetchFn: () => Promise<ApiResponse<T>>,
  dependencies: any[] = [],
  options: {
    retryCount?: number;
    retryDelay?: number;
    useMockFallback?: boolean;
    mockDataFn?: () => T;
  } = {}
): UseDataState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const {
    retryCount: maxRetries = 2,
    retryDelay = 1000,
    useMockFallback = true,
    mockDataFn,
  } = options;

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchFn();

      if (response.success && response.data) {
        setData(response.data);
        setError(null);
        setRetryCount(0);
      } else if (response.error) {
        if (retryCount < maxRetries) {
          setRetryCount((prev) => prev + 1);
          setTimeout(() => refetch(), retryDelay);
          return;
        }

        if (useMockFallback && mockDataFn) {
          console.warn(`Failed to fetch data: ${response.error}. Using mock data.`);
          setData(mockDataFn());
          setError(null);
        } else {
          setError(response.error);
          setData(null);
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';

      if (retryCount < maxRetries) {
        setRetryCount((prev) => prev + 1);
        setTimeout(() => refetch(), retryDelay);
        return;
      }

      if (useMockFallback && mockDataFn) {
        console.warn(`Failed to fetch data: ${errorMessage}. Using mock data.`);
        setData(mockDataFn());
        setError(null);
      } else {
        setError(errorMessage);
        setData(null);
      }
    } finally {
      setLoading(false);
    }
  }, [fetchFn, retryCount, maxRetries, retryDelay, useMockFallback, mockDataFn]);

  useEffect(() => {
    refetch();
  }, dependencies);

  return { data, loading, error, refetch };
}

/**
 * Hook for fetching multiple data sources in parallel
 * Returns combined state for all data sources
 */
export function useMultipleData<T extends Record<string, any>>(
  fetchFns: Record<keyof T, () => Promise<ApiResponse<T[keyof T]>>>,
  dependencies: any[] = [],
  options?: Parameters<typeof useData>[2] & {
    enableMemoryCache?: boolean;
    cacheKey?: string;
    cacheTtlMs?: number;
  }
): Omit<UseDataState<T>, 'data'> & { data: Partial<T>; allLoaded: boolean } {
  const [data, setData] = useState<Partial<T>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    enableMemoryCache = true,
    cacheKey,
    cacheTtlMs = Infinity,
  } = options || {};

  const resolvedCacheKey =
    cacheKey || `useMultipleData:${Object.keys(fetchFns).sort().join('|')}`;

  const isCacheFresh = (entry: MultiDataCacheEntry): boolean => {
    if (cacheTtlMs === Infinity) return true;
    return Date.now() - entry.timestamp <= cacheTtlMs;
  };

  const loadData = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    if (!forceRefresh && enableMemoryCache) {
      const cached = multiDataMemoryCache.get(resolvedCacheKey);
      if (cached && isCacheFresh(cached)) {
        setData(cached.data as Partial<T>);
        setLoading(false);
        return;
      }
    }

    try {
      const responses = await Promise.all(
        Object.entries(fetchFns).map(async ([key, fn]) => ({
          key,
          response: await fn(),
        }))
      );

      const newData: Partial<T> = {};
      let hasError = false;

      for (const { key, response } of responses) {
        if (response.success && response.data) {
          newData[key as keyof T] = response.data;
        } else if (response.error) {
          hasError = true;
        }
      }

      if (hasError && Object.keys(newData).length === 0) {
        setError('Failed to fetch all required data');
        setData({});
      } else {
        setData(newData);
        if (enableMemoryCache) {
          multiDataMemoryCache.set(resolvedCacheKey, {
            data: newData,
            timestamp: Date.now(),
          });
        }
        setError(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setData({});
    } finally {
      setLoading(false);
    }
  }, [enableMemoryCache, fetchFns, resolvedCacheKey, cacheTtlMs]);

  const refetch = useCallback(async () => {
    if (enableMemoryCache) {
      multiDataMemoryCache.delete(resolvedCacheKey);
    }
    await loadData(true);
  }, [enableMemoryCache, loadData, resolvedCacheKey]);

  useEffect(() => {
    loadData(false);
  }, dependencies);

  const allLoaded = Object.keys(data).length === Object.keys(fetchFns).length;

  return { data, loading, error, refetch, allLoaded };
}

/**
 * Hook for polling data at regular intervals
 * Useful for real-time dashboards
 */
export function usePollingData<T>(
  fetchFn: () => Promise<ApiResponse<T>>,
  intervalMs: number = 5000,
  enabled: boolean = true,
  options?: Parameters<typeof useData>[2]
): UseDataState<T> {
  const { data, loading, error, refetch } = useData(fetchFn, [], options);

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      refetch();
    }, intervalMs);

    return () => clearInterval(interval);
  }, [enabled, intervalMs, refetch]);

  return { data: (data as T | null), loading, error, refetch };
}
