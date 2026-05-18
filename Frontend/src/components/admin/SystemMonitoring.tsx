
import { useState } from 'react';

interface SystemAlert {
  id: string;
  timestamp: string;
  component: string;
  level: 'info' | 'warning' | 'error';
  message: string;
}

export default function SystemMonitoring() {
  const [alerts] = useState<SystemAlert[]>([
    {
      id: '1',
      timestamp: '2026-05-18 14:32',
      component: 'Prediction Engine',
      level: 'info',
      message: 'Batch prediction job completed successfully'
    },
    {
      id: '2',
      timestamp: '2026-05-18 14:15',
      component: 'Database',
      level: 'info',
      message: 'Backup completed'
    },
    {
      id: '3',
      timestamp: '2026-05-18 13:45',
      component: 'API Gateway',
      level: 'warning',
      message: 'Response time exceeded 200ms threshold'
    }
  ]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'info': return 'info';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'info';
    }
  };

  return (
    <div className="system-monitoring">
      <h2>System Monitoring & Logs</h2>
      <div className="alerts-log">
        {alerts.map((alert) => (
          <div key={alert.id} className={`log-entry level-${getLevelColor(alert.level)}`}>
            <span className="timestamp">{alert.timestamp}</span>
            <span className="component">[{alert.component}]</span>
            <span className="level-badge">{alert.level.toUpperCase()}</span>
            <span className="message">{alert.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
