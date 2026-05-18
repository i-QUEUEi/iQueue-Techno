

interface CommunityReport {
  time: string;
  report: string;
  author: string;
  helpful: number;
}

interface CommunityReportsSectionProps {
  reports: CommunityReport[];
}

export default function CommunityReportsSection({
  reports
}: CommunityReportsSectionProps) {
  return (
    <div className="community-reports-card">
      <h3 className="card-title">💬 Community Reports</h3>
      <p className="card-subtitle">Real experiences from visitors today</p>

      <div className="reports-list">
        {reports.length > 0 ? (
          reports.map((report, idx) => (
            <div key={idx} className="report-item">
              <div className="report-header">
                <span className="report-time">{report.time}</span>
                <span className="report-author">by {report.author}</span>
              </div>
              <p className="report-text">{report.report}</p>
              <div className="report-footer">
                <button className="helpful-btn">👍 Helpful ({report.helpful})</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-reports">No reports yet. Be the first to share!</p>
        )}
      </div>
    </div>
  );
}
