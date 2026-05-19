/**
 * Data service endpoints for all admin modules
 * Centralized definitions for API endpoints consumed by frontend
 */

import type { ApiResponse } from './api-client';
import { apiClient } from './api-client';

// ==================== Type Definitions ====================

export interface AnalyticsData {
  comparisonData: ModelComparison[];
  performanceMetrics: PerformanceMetric[];
  chartData: HourlyChart[];
}

export interface ModelComparison {
  model: string;
  mae: number;
  rmse: number;
  r2: number;
  category: 'Best' | 'Baseline' | 'Alternative';
}

export interface PerformanceMetric {
  model: string;
  metricType: string;
  mae: number;
  maeUnit: string;
  accuracy: string;
  status: string;
  color: string;
}

export interface HourlyChart {
  hour: string;
  actual: number;
  predicted: number;
  gb: number;
}

export interface HistoricalAnalyticsData {
  dailyData: DailyAnalytics[];
  hourlyData: HourlyAnalytics[];
  heatmapData: HeatmapAnalytics[];
  insights: Insight[];
}

export interface DailyAnalytics {
  day: string;
  avgWait: number;
  trend: string;
  busiest: boolean;
}

export interface HourlyAnalytics {
  hour: string;
  wait: number;
}

export interface HeatmapAnalytics {
  day: string;
  morning: number;
  afternoon: number;
  evening: number;
}

export interface Insight {
  title: string;
  desc: string;
  value: string;
}

export interface PredictiveAnalyticsData {
  morning: TimeSlot;
  afternoon: TimeSlot;
  evening: TimeSlot;
}

export interface TimeSlot {
  waitTime: string;
  congestion: string;
  confidence: number;
  recommendation: string;
  color: string;
}

export interface FeatureImportanceData {
  importanceData: FeatureImportance[];
  topInsights: FeatureInsight[];
}

export interface FeatureImportance {
  feature: string;
  importance: number;
  color: string;
}

export interface FeatureInsight {
  icon: string;
  title: string;
  description: string;
}

export interface HealthStatus {
  status: string;
  model_loaded: boolean;
  data_loaded: boolean;
  timestamp: string;
}

// ==================== Analytics Service ====================

export const analyticsService = {
  /**
   * Fetch model performance metrics and comparison data
   */
  getModelPerformance(): Promise<ApiResponse<AnalyticsData>> {
    return apiClient.get<AnalyticsData>('/api/model-performance');
  },

  /**
   * Fetch historical analytics data for charts
   */
  getHistoricalAnalytics(): Promise<ApiResponse<HistoricalAnalyticsData>> {
    return apiClient.get<HistoricalAnalyticsData>('/api/historical-analytics');
  },

  /**
   * Fetch feature importance data
   */
  getFeatureImportance(): Promise<ApiResponse<FeatureImportanceData>> {
    return apiClient.get<FeatureImportanceData>('/api/feature-importance');
  },

  /**
   * Fetch predictive analytics data (time slots with forecasts)
   */
  getPredictiveAnalytics(): Promise<ApiResponse<PredictiveAnalyticsData>> {
    return apiClient.get<PredictiveAnalyticsData>('/api/predictive-analytics');
  },
};

// ==================== Forecast Service ====================

export interface PredictionInput {
  date: string;
  hour: number;
  day_of_week: string;
  queue_length_at_arrival: number;
}

export interface PredictionResult {
  success: boolean;
  prediction: number;
  confidence: number;
  range?: {
    p10: number;
    p50: number;
    p90: number;
  };
  congestion: string;
  recommendation: string;
  unit: string;
  method: string;
  timestamp: string;
}

export const forecastService = {
  /**
   * Get single prediction for a specific time slot
   */
  predict(input: PredictionInput): Promise<ApiResponse<PredictionResult>> {
    return apiClient.post<PredictionResult>('/predict', input);
  },

  /**
   * Get batch predictions for multiple time slots
   */
  batchPredict(predictions: PredictionInput[]): Promise<ApiResponse<any>> {
    return apiClient.post<any>('/batch-predict', { predictions });
  },
};

// ==================== System Service ====================

export const systemService = {
  /**
   * Get system health status
   */
  getHealth(): Promise<ApiResponse<HealthStatus>> {
    return apiClient.get<HealthStatus>('/health');
  },

  /**
   * Get service information
   */
  getInfo(): Promise<ApiResponse<any>> {
    return apiClient.get<any>('/info');
  },
};

// ==================== Mock Data Service (Fallback) ====================
/**
 * Provides fallback mock data when backend is unavailable
 * Used for development and demo purposes only
 */

export const mockDataService = {
  getAnalyticsData(): AnalyticsData {
    return {
      comparisonData: [
        { model: 'Gradient Boosting', mae: 6.2, rmse: 8.1, r2: 0.8947, category: 'Best' },
        { model: 'Random Forest', mae: 6.5, rmse: 8.4, r2: 0.8834, category: 'Alternative' },
        { model: 'Linear Regression', mae: 9.8, rmse: 11.2, r2: 0.7123, category: 'Baseline' },
      ],
      performanceMetrics: [
        {
          model: 'Gradient Boosting',
          metricType: 'Waiting Time',
          mae: 6.2,
          maeUnit: 'mins',
          accuracy: '89%',
          status: 'Best performer',
          color: 'from-orange-600 to-orange-900',
        },
      ],
      chartData: [
        { hour: '8am', actual: 12.5, predicted: 14.2, gb: 13.8 },
        { hour: '9am', actual: 28.3, predicted: 27.5, gb: 28.1 },
        { hour: '10am', actual: 42.1, predicted: 40.8, gb: 41.2 },
      ],
    };
  },

  getHistoricalAnalyticsData(): HistoricalAnalyticsData {
    return {
      dailyData: [
        { day: 'Mon', avgWait: 38.2, trend: 'High', busiest: true },
        { day: 'Tue', avgWait: 22.5, trend: 'Medium', busiest: false },
        { day: 'Wed', avgWait: 18.7, trend: 'Low', busiest: false },
      ],
      hourlyData: [
        { hour: '8am', wait: 8.2 },
        { hour: '9am', wait: 22.5 },
        { hour: '10am', wait: 41.8 },
      ],
      heatmapData: [
        { day: 'Mon', morning: 35.2, afternoon: 28.5, evening: 15.2 },
        { day: 'Tue', morning: 18.2, afternoon: 22.5, evening: 12.1 },
      ],
      insights: [
        { title: 'Mondays vs mid-week', desc: 'Monday average (+68%)', value: '38 mins' },
        { title: 'Late morning peak', desc: 'Average wait 10-11am window', value: '42 mins' },
      ],
    };
  },

  getPredictiveAnalyticsData(): PredictiveAnalyticsData {
    return {
      morning: {
        waitTime: '25-38',
        congestion: 'Medium',
        confidence: 85,
        recommendation: 'Arrive 9:30 AM for lower wait',
        color: 'from-blue-500 to-blue-600',
      },
      afternoon: {
        waitTime: '18-32',
        congestion: 'Low',
        confidence: 92,
        recommendation: 'Best time to visit',
        color: 'from-green-500 to-green-600',
      },
      evening: {
        waitTime: '12-25',
        congestion: 'Low',
        confidence: 88,
        recommendation: 'Late afternoon is quietest',
        color: 'from-emerald-500 to-emerald-600',
      },
    };
  },
};
