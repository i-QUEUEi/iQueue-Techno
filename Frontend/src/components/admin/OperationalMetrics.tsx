

interface OperationalMetric {
  name: string;
  current: string | number;
  target: string | number;
  status: 'good' | 'warning' | 'alert';
}

export default function OperationalMetrics() {
  const metrics: OperationalMetric[] = [
    {
      name: 'API Response Time',
      current: '145ms',
      target: '< 200ms',
      status: 'good'
    },
    {
      name: 'Database Query Time',
      current: '89ms',
      target: '< 100ms',
      status: 'good'
    },
    {
      name: 'System Uptime',
      current: '99.8%',
      target: '> 99.5%',
      status: 'good'
    },
    {
      name: 'Cache Hit Rate',
      current: '87%',
      target: '> 85%',
      status: 'good'
    },
    {
      name: 'Active Users',
      current: '342',
      target: 'Monitor',
      status: 'good'
    }
  ];

  return (
    <div className="operational-metrics">
      <h2>Operational Metrics</h2>
      <div className="metrics-table">
        <div className="table-header">
          <div>Metric</div>
          <div>Current</div>
          <div>Target</div>
          <div>Status</div>
        </div>
        {metrics.map((metric, idx) => (
          <div key={idx} className={`table-row status-${metric.status}`}>
            <div>{metric.name}</div>
            <div>{metric.current}</div>
            <div>{metric.target}</div>
            <div className="status-badge">{metric.status.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
