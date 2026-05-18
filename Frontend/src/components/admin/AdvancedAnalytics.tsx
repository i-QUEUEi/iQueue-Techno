

interface AdvancedMetric {
  label: string;
  value: string | number;
  description: string;
}

export default function AdvancedAnalytics() {
  const metrics: AdvancedMetric[] = [
    {
      label: 'Model Accuracy',
      value: '92.5%',
      description: 'Prediction accuracy of the machine learning model'
    },
    {
      label: 'RMSE',
      value: '8.3 minutes',
      description: 'Root Mean Square Error on test dataset'
    },
    {
      label: 'Feature Importance (Top)',
      value: 'Day of Week',
      description: 'Most influential factor in queue predictions'
    },
    {
      label: 'Data Points Processed',
      value: '125,432',
      description: 'Total historical records in training dataset'
    },
    {
      label: 'Prediction Confidence',
      value: '85.2%',
      description: 'Average confidence score across all predictions'
    }
  ];

  return (
    <div className="advanced-analytics">
      <h2>Advanced Analytics</h2>
      <div className="metrics-grid">
        {metrics.map((metric, idx) => (
          <div key={idx} className="metric-card">
            <h3>{metric.label}</h3>
            <p className="metric-value">{metric.value}</p>
            <p className="metric-description">{metric.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
