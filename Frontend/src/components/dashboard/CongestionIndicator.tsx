

type CongestionLevel = 'low' | 'moderate' | 'high';

interface CongestionIndicatorProps {
  level: CongestionLevel;
  description: string;
}

export default function CongestionIndicator({ 
  level, 
  description 
}: CongestionIndicatorProps) {
  const levelConfig = {
    low: { emoji: '🟢', label: 'Low', color: 'green' },
    moderate: { emoji: '🟡', label: 'Moderate', color: 'yellow' },
    high: { emoji: '🔴', label: 'High', color: 'red' }
  };

  const config = levelConfig[level];

  return (
    <div className={`congestion-indicator level-${level}`}>
      <div className="congestion-content">
        <div className="congestion-header">
          <span className="congestion-emoji">{config.emoji}</span>
          <h3 className="congestion-label">Current Congestion</h3>
        </div>
        
        <div className="congestion-level">{config.label}</div>
        <p className="congestion-description">{description}</p>
      </div>
    </div>
  );
}
