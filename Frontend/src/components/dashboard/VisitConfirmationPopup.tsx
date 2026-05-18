import { useState, useEffect } from 'react';

interface VisitConfirmationPopupProps {
  isOpen: boolean;
  onConfirm: (visiting: boolean) => void;
  officeHours: string;
}

export default function VisitConfirmationPopup({
  isOpen,
  onConfirm,
  officeHours
}: VisitConfirmationPopupProps) {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  if (!isVisible) return null;

  const handleResponse = (visiting: boolean) => {
    setIsVisible(false);
    onConfirm(visiting);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-content">
          <h2 className="popup-title">Are you planning to visit today?</h2>
          <p className="popup-subtitle">
            Your response helps us better estimate waiting times
          </p>

          <div className="popup-info">
            <p>Office Hours: {officeHours}</p>
          </div>

          <div className="popup-buttons">
            <button
              className="btn btn-primary"
              onClick={() => handleResponse(true)}
            >
              ✅ Yes, I'm visiting
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleResponse(false)}
            >
              ❌ No, just checking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
