

interface TimeSlotStats {
  timeSlot: string;
  confirmedVisitors: number;
  trend: 'up' | 'down' | 'stable';
}

interface RealTimeVisitorStatsProps {
  data: TimeSlotStats[];
  lastUpdated: string;
}

export default function RealTimeVisitorStats({
  data,
  lastUpdated
}: RealTimeVisitorStatsProps) {
  const getTrendEmoji = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
    }
  };

  return (
    <div className="visitor-stats-card">
      <h3 className="card-title">👥 Visitor Intent by Time</h3>

      <div className="stats-table">
        <div className="table-header">
          <div className="header-cell">Time</div>
          <div className="header-cell">Expected Visitors</div>
          <div className="header-cell">Trend</div>
        </div>

        <div className="table-body">
          {data.map((slot, idx) => (
            <div key={idx} className="table-row">
              <div className="cell">{slot.timeSlot}</div>
              <div className="cell">{slot.confirmedVisitors}</div>
              <div className="cell">
                <span className="trend-indicator">
                  {getTrendEmoji(slot.trend)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="stats-footer">
        <small>Last updated: {lastUpdated}</small>
      </div>
    </div>
  );
}
