

type AlertType = 'info' | 'warning' | 'urgent';

interface Alert {
  id: string;
  type: AlertType;
  message: string;
  time: string;
}

interface NotificationsAlertsProps {
  alerts: Alert[];
}

export default function NotificationsAlerts({
  alerts
}: NotificationsAlertsProps) {
  const getAlertEmoji = (type: AlertType) => {
    switch (type) {
      case 'info': return 'ℹ️';
      case 'warning': return '⚠️';
      case 'urgent': return '🚨';
    }
  };

  return (
    <div className="notifications-alerts-card">
      <h3 className="card-title">🔔 Notifications & Alerts</h3>

      <div className="alerts-list">
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <div key={alert.id} className={`alert-item alert-${alert.type}`}>
              <span className="alert-emoji">{getAlertEmoji(alert.type)}</span>
              <div className="alert-content">
                <p className="alert-message">{alert.message}</p>
                <small className="alert-time">{alert.time}</small>
              </div>
            </div>
          ))
        ) : (
          <p className="no-alerts">No active alerts. Everything looks good!</p>
        )}
      </div>
    </div>
  );
}
