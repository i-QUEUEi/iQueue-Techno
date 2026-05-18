

interface TimeSlot {
  time: string;
  visitors: number;
}

interface PeakHoursChartProps {
  data: TimeSlot[];
  busiestHours: string;
  quietestHours: string;
}

export default function PeakHoursChart({
  data,
  busiestHours,
  quietestHours
}: PeakHoursChartProps) {
  const maxVisitors = Math.max(...data.map(d => d.visitors));

  return (
    <div className="peak-hours-card">
      <h3 className="card-title">📊 Today's Hourly Traffic</h3>

      <div className="hours-summary">
        <div className="summary-item">
          <span className="summary-label">Busiest:</span>
          <span className="summary-value">{busiestHours}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Quietest:</span>
          <span className="summary-value">{quietestHours}</span>
        </div>
      </div>

      <div className="chart-container">
        <div className="bar-chart">
          {data.map((slot, idx) => (
            <div key={idx} className="chart-bar-container">
              <div className="chart-bar">
                <div
                  className="bar-fill"
                  style={{
                    height: `${(slot.visitors / maxVisitors) * 100}%`
                  }}
                  title={`${slot.visitors} visitors`}
                ></div>
              </div>
              <div className="bar-label">{slot.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
