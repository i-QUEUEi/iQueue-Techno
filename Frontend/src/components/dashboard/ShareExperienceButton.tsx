import { useState } from 'react';

interface ShareExperienceButtonProps {
  onOpenForm: () => void;
}

export default function ShareExperienceButton({
  onOpenForm
}: ShareExperienceButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`share-experience-btn ${isHovered ? 'hovered' : ''}`}
      onClick={onOpenForm}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="btn-emoji">💭</span>
      <span className="btn-text">Share Your Experience</span>
      <span className="btn-subtext">Help improve queue times</span>
    </button>
  );
}
