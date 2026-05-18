

interface OfficeInfo {
  name: string;
  branch: string;
  location: string;
  openTime: string;
  closeTime: string;
  today: string;
  currentTime: string;
  isOpen: boolean;
}

interface OfficeInfoCardProps {
  officeInfo: OfficeInfo;
}

export default function OfficeInfoCard({ officeInfo }: OfficeInfoCardProps) {
  return (
    <div className="office-info-card">
      <div className="office-info-header">
        <h2 className="office-name">{officeInfo.name}</h2>
        <span className={`office-status ${officeInfo.isOpen ? 'open' : 'closed'}`}>
          {officeInfo.isOpen ? '✅ Open' : '🔴 Closed'}
        </span>
      </div>

      <div className="office-details">
        <div className="detail-row">
          <span className="detail-label">Branch:</span>
          <span className="detail-value">{officeInfo.branch}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Location:</span>
          <span className="detail-value">{officeInfo.location}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Hours:</span>
          <span className="detail-value">{officeInfo.openTime} – {officeInfo.closeTime}</span>
        </div>
      </div>

      <div className="office-datetime">
        <div className="date">{officeInfo.today}</div>
        <div className="time">{officeInfo.currentTime}</div>
      </div>
    </div>
  );
}
