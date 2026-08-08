import React from 'react';
import { Star } from 'lucide-react';

interface SkillLevelSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export const SkillLevelSelector: React.FC<SkillLevelSelectorProps> = ({ value, onChange }) => {
  const levels = [
    { value: 1, label: 'Poor' },
    { value: 2, label: 'Fair' },
    { value: 3, label: 'Average' },
    { value: 4, label: 'Good' },
    { value: 5, label: 'Excellent' }
  ];

  return (
    <div className="skill-selector">
      <div className="stars-container">
        {levels.map((level) => (
          <button
            key={level.value}
            className={`star-btn ${value >= level.value ? 'active' : ''}`}
            onClick={() => onChange(level.value)}
          >
            <Star 
              size={32}
              fill={value >= level.value ? '#f59e0b' : 'none'}
              color={value >= level.value ? '#f59e0b' : '#d1d5db'}
            />
            <span className="star-label">{level.label}</span>
          </button>
        ))}
      </div>
      <div className="skill-level-indicator">
        <span>{value > 0 ? levels[value - 1].label : 'Click a star to rate'}</span>
      </div>
    </div>
  );
};