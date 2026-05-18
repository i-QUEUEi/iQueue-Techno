

interface WaitingTimeCardProps {
  estimatedMin: number;
  estimatedMax: number;
  confidence: number;
  lastUpdated: string;
}

export default function WaitingTimeCard({
  estimatedMin,
  estimatedMax,
  confidence,
  lastUpdated
}: WaitingTimeCardProps) {
  return (
    <div className="waiting-time-card main-feature">
      <h3 className="card-title">Estimated Waiting Time</h3>
      
      <div className="waiting-time-display">
        <div className="time-range">
          <span className="time-number">{estimatedMin}–{estimatedMax}</span>
          <span className="time-unit">Minutes</span>
        </div>
      </div>

      <div className="confidence-indicator">
        <div className="confidence-label">Confidence Level</div>
        <div className="confidence-value">{confidence}%</div>
        <div className="confidence-bar">
          <div 
            className="confidence-fill" 
            style={{ width: `${confidence}%` }}
          ></div>
        </div>
      </div>

      <div className="last-updated">
        Updated {lastUpdated}
      </div>
    </div>
  );
}
