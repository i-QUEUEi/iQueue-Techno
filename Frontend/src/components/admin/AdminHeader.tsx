import { useState, useEffect } from 'react';

interface AdminHeaderProps {
  title: string;
  showActions?: boolean;
  onRefresh?: () => void;
  onExport?: () => void;
}

export default function AdminHeader({ title, showActions = true, onRefresh, onExport }: AdminHeaderProps) {
  const [dateTime, setDateTime] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) + ' • ' + now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setDateTime(formatted);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">{title}</h1>
          <p className="text-sm text-gray-600">{dateTime} • Main Branch</p>
        </div>

        {showActions && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 border border-green-200">
              <span className="inline-flex w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-xs font-medium text-green-700">All systems operational</span>
            </div>
            <button
              onClick={onRefresh}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors duration-200 border border-gray-300"
            >
              Refresh
            </button>
            <button
              onClick={onExport}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              Export
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
