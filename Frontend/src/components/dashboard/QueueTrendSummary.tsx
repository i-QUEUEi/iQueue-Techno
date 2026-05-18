

interface DayPattern {
  day: string;
  trend: string;
}

interface QueueTrendSummaryProps {
  patterns: DayPattern[];
}

export default function QueueTrendSummary({
  patterns
}: QueueTrendSummaryProps) {
  return (
    <div className="queue-trend-card">
      <h3 className="card-title">📈 Queue Patterns This Week</h3>
      <p className="card-subtitle">Historical trends to help you plan ahead</p>

      <div className="trends-list">
        {patterns.map((pattern, idx) => (
          <div key={idx} className="trend-item">
            <span className="trend-day">{pattern.day}</span>
            <span className="trend-description">{pattern.trend}</span>
          </div>
        ))}
      </div>

      <div className="trend-note">
        <p>💡 Tip: Weekdays are usually busier than weekends</p>
      </div>
    </div>
  );
}
