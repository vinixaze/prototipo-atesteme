import { Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getCompetencyStatus } from '../utils/competencyStorage';

interface CompetencyTimerProps {
  competencyName: string;
  onExpire?: () => void;
  className?: string;
  showIcon?: boolean;
  mockTime?: number; // Timer mockado em segundos (para visualização)
}

export function CompetencyTimer({ 
  competencyName, 
  onExpire, 
  className = '',
  showIcon = true,
  mockTime
}: CompetencyTimerProps) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    // Se mockTime está definido, usar valor mockado (sem countdown)
    if (mockTime !== undefined) {
      setElapsedTime(mockTime);
      return;
    }

    // Calcular tempo decorrido desde o início
    const updateTime = () => {
      const status = getCompetencyStatus(competencyName);
      
      if (!status || status.status !== 'in-progress' || !status.startedAt) {
        setElapsedTime(0);
        return;
      }
      
      const startedDate = new Date(status.startedAt);
      const now = new Date();
      const diffTime = now.getTime() - startedDate.getTime();
      const diffSeconds = Math.floor(diffTime / 1000);
      
      setElapsedTime(diffSeconds > 0 ? diffSeconds : 0);
      
      // Verificar se passou de 30 minutos (1800 segundos)
      if (diffSeconds >= 1800 && onExpire) {
        onExpire();
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [competencyName, onExpire, mockTime]);

  if (elapsedTime === 0) {
    return null;
  }

  // Sempre mostrar "30 min" fixo
  const timeText = '30 min';

  return (
    <div className={className}>
      {showIcon && <Clock className="w-4 h-4 text-cyan-500 flex-shrink-0" />}
      <span className="text-xs sm:text-sm font-medium">{timeText}</span>
    </div>
  );
}