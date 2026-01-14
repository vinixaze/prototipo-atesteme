import { useMemo, useState } from 'react';
import RankingHeader from './ranking/RankingHeader';
import RankingInfoModal from './ranking/RankingInfoModal';
import RankingUserModal from './ranking/RankingUserModal';
import RankingCategorySelector from './ranking/RankingCategorySelector';
import RankingPodium from './ranking/RankingPodium';
import RankingList from './ranking/RankingList';
import RankingAnimationStyles from './ranking/RankingAnimationStyles';
import { normalizeRankingData } from '../utils/ranking';
import { RankingData, RankingUser } from '../types';

interface RankingTabProps {
  rankingCategory: 'escola' | 'turma' | 'rede';
  setRankingCategory: (category: 'escola' | 'turma' | 'rede') => void;
  rankingData: RankingData;
}

export default function RankingTab({
  rankingCategory,
  setRankingCategory,
  rankingData,
}: RankingTabProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [selectedUser, setSelectedUser] = useState<RankingUser | null>(null);

  const normalizedRankingData = useMemo(() => {
    return normalizeRankingData(rankingData);
  }, [rankingData]);

  const currentList = normalizedRankingData[rankingCategory] || [];
  const podium = currentList.slice(0, 3);

  return (
    <div className="animate-fadeIn overflow-x-visible">
      <RankingHeader />

      <RankingInfoModal
        isOpen={showInfo}
        rankingCategory={rankingCategory}
        onClose={() => setShowInfo(false)}
      />

      <RankingUserModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />

      <RankingCategorySelector
        rankingCategory={rankingCategory}
        onChange={setRankingCategory}
        normalizedRankingData={normalizedRankingData}
      />

      <RankingPodium podium={podium} />

      <RankingList
        users={currentList}
        rankingCategory={rankingCategory}
        onSelectUser={setSelectedUser}
      />

      <RankingAnimationStyles />
    </div>
  );
}
