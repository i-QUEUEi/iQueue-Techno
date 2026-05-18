

interface BestTimeToVisitProps {
  recommendedTime: string;
  reason: string;
  expectedWaitTime: number;
}

export default function BestTimeToVisit({
  recommendedTime,
  reason,
  expectedWaitTime
}: BestTimeToVisitProps) {
  return (
    <div className="best-time-card">
      <h3 className="card-title">✨ Best Time to Visit</h3>
      
      <div className="recommended-time">
        <div className="time-display">{recommendedTime}</div>
        <p className="time-subtext">Recommended visiting hours</p>
      </div>

      <div className="recommendation-details">
        <div className="reason-section">
          <p className="reason-label">Why?</p>
          <p className="reason-text">{reason}</p>
        </div>
        
        <div className="expected-wait">
          <p className="wait-label">Expected Wait Time</p>
          <p className="wait-value">~{expectedWaitTime} minutes</p>
        </div>
      </div>

      <button className="cta-button">Plan Your Visit</button>
    </div>
  );
}
