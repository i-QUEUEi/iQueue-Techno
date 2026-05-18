

interface SmartRecommendationBoxProps {
  recommendation: string;
  reason: string;
  confidence: number;
}

export default function SmartRecommendationBox({
  recommendation,
  reason,
  confidence
}: SmartRecommendationBoxProps) {
  return (
    <div className="smart-recommendation-box">
      <div className="recommendation-header">
        <span className="icon">🎯</span>
        <h3>Smart Recommendation</h3>
      </div>

      <div className="recommendation-text">
        <p className="main-message">{recommendation}</p>
        <p className="reason-text">{reason}</p>
      </div>

      <div className="confidence-badge">
        Based on {confidence}% historical accuracy
      </div>
    </div>
  );
}
