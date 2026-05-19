import { useMultipleData } from '@/lib/data-hooks';
import AdminHeader from '@/components/admin/AdminHeader';
import { TrendingUp, TrendingDown, AlertCircle, Loader } from 'lucide-react';
import { analyticsService, mockDataService, type AnalyticsData, type HistoricalAnalyticsData, type PredictiveAnalyticsData } from '@/lib/data-services';

export default function AdminDashboard() {
  // Fetch all dashboard data in parallel
  const { data: allData, loading, error: dataError, refetch } = useMultipleData(
    {
      analytics: () => analyticsService.getModelPerformance(),
      historical: () => analyticsService.getHistoricalAnalytics(),
      predictive: () => analyticsService.getPredictiveAnalytics(),
    },
    [],
    {
      useMockFallback: true,
      mockDataFn: () => ({
        analytics: mockDataService.getAnalyticsData(),
        historical: mockDataService.getHistoricalAnalyticsData(),
        predictive: mockDataService.getPredictiveAnalyticsData(),
      }),
    }
  );

  const analyticsData = allData.analytics as AnalyticsData | undefined;
  const historicalData = allData.historical as HistoricalAnalyticsData | undefined;
  const predictiveData = allData.predictive as PredictiveAnalyticsData | undefined;

  const handleRefresh = () => {
    refetch();
  };

  if (dataError && !allData.analytics) {
    return (
      <>
        <AdminHeader title="Dashboard" showActions={false} />
        <div className="border-b border-gray-200" />
        <div className="flex-1 flex items-center justify-center px-8 py-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 max-w-md">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900">Unable to Load Dashboard</h3>
                <p className="text-sm text-red-700 mt-1">{dataError}</p>
                <button
                  onClick={handleRefresh}
                  className="mt-4 px-4 py-2 rounded-lg bg-red-200 hover:bg-red-300 text-red-700 font-medium transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminHeader title="Dashboard" showActions={false} />
      
      {/* Header / Content Divider */}
      <div className="border-b border-gray-200" />

      <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 pb-8">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
              <p className="text-sm text-gray-600">Loading dashboard data...</p>
            </div>
          </div>
        )}

        {/* TODAY AT A GLANCE */}
        {analyticsData && !loading && (
          <section>
            <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">Today at a Glance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total visitors', value: '1,247', trend: 'up', change: '+14% vs yesterday' },
                { label: 'Current congestion', value: 'Moderate', trend: 'stable', change: 'Within normal range' },
                { label: 'Avg waiting time', value: '18 min', trend: 'down', change: '-2 min improvement' },
                { label: 'Confirmed visits', value: '342', trend: 'up', change: '27% pre-registered' }
              ].map((card, idx) => (
                <div key={idx} className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 p-6">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">{card.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-2">{card.value}</p>
                  <div className="flex items-center gap-2">
                    {card.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : card.trend === 'down' ? (
                      <TrendingDown className="w-4 h-4 text-green-600" />
                    ) : (
                      <div className="w-4 h-4" />
                    )}
                    <p className="text-xs text-gray-600">{card.change}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ANALYTICS PREVIEW */}
        {analyticsData && !loading && (
          <section>
            <div className="rounded-2xl border border-blue-200 bg-white shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Model Performance</h3>
                <a href="#analytics" className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  View Full Analytics →
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {analyticsData.performanceMetrics.slice(0, 3).map((metric, idx) => (
                  <div key={idx} className={`rounded-xl bg-gradient-to-br ${metric.color} p-6 text-white`}>
                    <p className="text-xs font-semibold opacity-90 mb-2">{metric.model}</p>
                    <p className="text-2xl font-bold mb-1">{metric.mae} {metric.maeUnit}</p>
                    <p className="text-xs opacity-80">Accuracy: {metric.accuracy}</p>
                    <p className="text-xs font-semibold mt-3 opacity-90">{metric.status}</p>
                  </div>
                ))}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Model</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">MAE</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">RMSE</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">R² Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {analyticsData.comparisonData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-medium text-gray-900">{row.model}</td>
                        <td className="py-3 px-4 text-right text-gray-600">{row.mae}</td>
                        <td className="py-3 px-4 text-right text-gray-600">{row.rmse}</td>
                        <td className="py-3 px-4 text-right font-semibold text-gray-900">{row.r2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* FORECAST & PATTERNS */}
        {historicalData && predictiveData && !loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <section>
              <div className="rounded-2xl border border-yellow-200 bg-white shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Historical Insights</h3>
                <div className="space-y-3">
                  {historicalData.insights.slice(0, 3).map((insight, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                      <p className="font-semibold text-gray-900 text-sm">{insight.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{insight.desc}</p>
                      <p className="text-sm font-bold text-yellow-700 mt-2">{insight.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <div className="rounded-2xl border border-green-200 bg-white shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Best Times to Visit</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Morning', slot: predictiveData.morning },
                    { label: 'Afternoon', slot: predictiveData.afternoon },
                    { label: 'Evening', slot: predictiveData.evening }
                  ].map((item, idx) => (
                    <div key={idx} className={`p-4 rounded-lg bg-gradient-to-br ${item.slot.color} text-white`}>
                      <p className="font-semibold text-sm mb-1">{item.label}</p>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs opacity-90">Wait: {item.slot.waitTime} mins</p>
                          <p className="text-xs opacity-90 mt-1">Confidence: {item.slot.confidence}%</p>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${
                          item.slot.congestion === 'Low' ? 'bg-green-600' :
                          item.slot.congestion === 'Medium' ? 'bg-yellow-600' :
                          'bg-red-600'
                        }`}>
                          {item.slot.congestion}
                        </span>
                      </div>
                      <p className="text-xs mt-2 opacity-90 italic">{item.slot.recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TRAFFIC DISTRIBUTION */}
        {historicalData && !loading && (
          <section>
            <div className="rounded-2xl border border-orange-200 bg-white shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Traffic Distribution</h3>
              <div className="h-48 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200 flex items-end justify-around p-6 gap-2">
                {historicalData.dailyData.map((day, idx) => {
                  const maxWait = Math.max(...historicalData.dailyData.map(d => d.avgWait));
                  const percentage = (day.avgWait / maxWait) * 100;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg transition-all duration-300 hover:from-orange-600 hover:to-orange-500"
                        style={{ height: `${(percentage / 100) * 160}px` }}
                      />
                      <p className="text-xs text-gray-700 font-medium mt-3">{day.day}</p>
                      <p className="text-xs font-bold text-gray-900">{day.avgWait.toFixed(0)}m</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* QUICK ACTIONS */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'View Full Analytics', href: '#analytics' },
              { label: 'Check Forecast', href: '#forecast' },
              { label: 'Recent Activity', href: '#reports' }
            ].map((action, idx) => (
              <a
                key={idx}
                href={action.href}
                className="rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 shadow-sm hover:shadow-lg transition-all duration-300 p-6 text-center cursor-pointer"
              >
                <p className="font-semibold text-gray-900">{action.label}</p>
                <p className="text-xs text-gray-600 mt-2">Detailed insights</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}