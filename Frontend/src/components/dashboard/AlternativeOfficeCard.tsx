

interface AlternativeOffice {
  name: string;
  distance: string;
  waitTime: number;
  congestion: 'low' | 'moderate' | 'high';
  address: string;
}

interface AlternativeOfficeCardProps {
  office: AlternativeOffice;
}

export default function AlternativeOfficeCard({
  office
}: AlternativeOfficeCardProps) {
  const congestionEmoji = {
    low: '🟢',
    moderate: '🟡',
    high: '🔴'
  };

  return (
    <div className="alternative-office-card">
      <h3 className="card-title">🏢 Nearby Alternatives</h3>

      <div className="office-option">
        <div className="office-header">
          <h4 className="office-name">{office.name}</h4>
          <span className="congestion-badge">
            {congestionEmoji[office.congestion]} {office.congestion}
          </span>
        </div>

        <div className="office-details">
          <div className="detail">
            <span className="label">📍 Distance:</span>
            <span className="value">{office.distance}</span>
          </div>
          <div className="detail">
            <span className="label">⏱️ Wait Time:</span>
            <span className="value">~{office.waitTime} min</span>
          </div>
          <div className="detail">
            <span className="label">📍 Address:</span>
            <span className="value">{office.address}</span>
          </div>
        </div>

        <button className="visit-btn">Visit This Branch →</button>
      </div>
    </div>
  );
}
