import { ModuleColors } from '../types';

export const getModuleColors = (activeModule?: 'atesteme' | 'prosaeb'): ModuleColors => {
  if (activeModule === 'prosaeb') {
    return {
      primary: 'from-blue-500 via-blue-600 to-blue-700',
      button: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      icon: 'from-blue-500 to-blue-600',
      textGradient: 'from-blue-500 to-blue-700',
    };
  }
  return {
    primary: 'from-[#8B27FF] via-[#9D3FFF] to-[#A855F7]',
    button: 'from-[#8B27FF] to-[#A855F7] hover:from-[#7B1FE8] hover:to-[#9333EA]',
    icon: 'from-[#8B27FF] to-[#A855F7]',
    textGradient: 'from-[#8B27FF] to-[#A855F7]',
  };
};

