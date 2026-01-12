export interface CompetencyColorStyles {
  badgeBg: string;
  iconBgClass: string;
  buttonGradient: string;
}

export const getCompetencyColors = (color: string): CompetencyColorStyles => {
  if (color === '#FFD700') {
    return {
      badgeBg: '#FFD700',
      iconBgClass: 'bg-[#FFF9E6] dark:bg-yellow-900/30',
      buttonGradient: 'linear-gradient(135deg, #FFE57F 0%, #FF9800 100%)',
    };
  } else if (color === '#00BCD4') {
    return {
      badgeBg: '#00BCD4',
      iconBgClass: 'bg-[#E0F7FA] dark:bg-cyan-900/30',
      buttonGradient: 'linear-gradient(135deg, #4DD0E1 0%, #0288D1 100%)',
    };
  } else if (color === '#FF9800') {
    return {
      badgeBg: '#FF9800',
      iconBgClass: 'bg-[#FFF3E0] dark:bg-orange-900/30',
      buttonGradient: 'linear-gradient(135deg, #FFB74D 0%, #E65100 100%)',
    };
  } else if (color === '#4CAF50') {
    return {
      badgeBg: '#4CAF50',
      iconBgClass: 'bg-[#E8F5E9] dark:bg-green-900/30',
      buttonGradient: 'linear-gradient(135deg, #81C784 0%, #2E7D32 100%)',
    };
  } else if (color === '#E91E63') {
    return {
      badgeBg: '#E91E63',
      iconBgClass: 'bg-[#FCE4EC] dark:bg-pink-900/30',
      buttonGradient: 'linear-gradient(135deg, #F48FB1 0%, #AD1457 100%)',
    };
  }
  return {
    badgeBg: '#8B27FF',
    iconBgClass: 'bg-purple-50 dark:bg-purple-900/30',
    buttonGradient: 'linear-gradient(135deg, #8B27FF 0%, #A855F7 100%)',
  };
};

