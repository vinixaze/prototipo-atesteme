import { Competency, Level } from '../types';
import LevelsHeader from './levels/LevelsHeader';
import LevelsStatsCards from './levels/LevelsStatsCards';
import LevelCard from './levels/LevelCard';
import LevelsAnimationStyles from './levels/LevelsAnimationStyles';

interface LevelsTabProps {
  levels: Level[];
  expandedLevel: number | null;
  toggleLevel: (levelNumber: number) => void;
  handleViewResult: (comp: Competency) => void;
  currentLevel: Level;
  handleStartChallenge?: (comp: Competency) => void;
}

export default function LevelsTab({
  levels,
  expandedLevel,
  toggleLevel,
  handleViewResult,
  currentLevel: _currentLevel,
  handleStartChallenge,
}: LevelsTabProps) {
  const totalCompetencies = 16;
  const completedCompetencies = 7;
  const starsEarned = 41;
  const maxStars = 48;
  const unlockedLevels = 1;
  const totalLevels = 3;

  return (
    <div className="animate-fadeIn">
      <LevelsHeader />

      <LevelsStatsCards
        completedCompetencies={completedCompetencies}
        totalCompetencies={totalCompetencies}
        starsEarned={starsEarned}
        maxStars={maxStars}
        unlockedLevels={unlockedLevels}
        totalLevels={totalLevels}
      />

      <div className="space-y-4 sm:space-y-6">
        {levels.map((level) => (
          <LevelCard
            key={level.number}
            level={level}
            isExpanded={expandedLevel === level.number}
            onToggle={toggleLevel}
            onViewResult={handleViewResult}
            onStartChallenge={handleStartChallenge}
          />
        ))}
      </div>

      <LevelsAnimationStyles />
    </div>
  );
}
