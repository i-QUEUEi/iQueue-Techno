

type SystemStatus = 'operational' | 'slow' | 'down';

interface SystemStatusMonitorProps {
  status: SystemStatus;
  message: string;
  lastChecked: string;
}

export default function SystemStatusMonitor({
  status,
  message,
  lastChecked
}: SystemStatusMonitorProps) {
  const statusConfig = {
    operational: { emoji: '✅', label: 'Operational', color: 'green' },
    slow: { emoji: '⚠️', label: 'Running Slow', color: 'yellow' },
    down: { emoji: '❌', label: 'System Down', color: 'red' }
  };

  const config = statusConfig[status];

  return (
    <div className={`system-status-monitor status-${status}`}>
      <div className="status-header">
        <span className="status-emoji">{config.emoji}</span>
        <h3 className="status-label">System Status</h3>
      </div>

      <div className="status-display">
        <div className="status-main">{config.label}</div>
        <p className="status-message">{message}</p>
      </div>

      <div className="status-footer">
        <small>Last checked: {lastChecked}</small>
      </div>
    </div>
  );
}
