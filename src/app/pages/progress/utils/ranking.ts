import { RankingData, RankingUser } from '../types';

export function shortenName(name: string) {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length <= 2) return parts.join(' ');
  return `${parts[0]} ${parts[parts.length - 1]}`;
}

export function normalizeRankingData(rankingData: RankingData) {
  const byName = new Map<string, RankingUser>();

  const keyOf = (user: RankingUser) => (user.name || '').trim().toLowerCase();
  const putIfMissing = (user: RankingUser) => {
    const key = keyOf(user);
    if (!key) return;
    if (!byName.has(key)) byName.set(key, user);
  };

  (rankingData.turma || []).forEach(putIfMissing);
  (rankingData.escola || []).forEach(putIfMissing);
  (rankingData.rede || []).forEach(putIfMissing);

  const hydrate = (users: RankingUser[]) =>
    (users || []).map((user) => {
      const base = byName.get(keyOf(user));
      if (!base) return user;
      return {
        ...user,
        points: base.points,
        digcoins: base.digcoins,
        medals: base.medals,
        level: base.level,
        levelProgress: base.levelProgress,
        avgTime: base.avgTime,
      };
    });

  const normalize = (users: RankingUser[]) => {
    const copy = [...(users || [])];
    copy.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.digcoins !== a.digcoins) return b.digcoins - a.digcoins;
      if (b.medals !== a.medals) return b.medals - a.medals;
      return (a.name || '').localeCompare(b.name || '');
    });
    return copy.map((user, index) => ({ ...user, position: index + 1 }));
  };

  return {
    turma: normalize(hydrate(rankingData.turma || [])),
    escola: normalize(hydrate(rankingData.escola || [])),
    rede: normalize(hydrate(rankingData.rede || [])),
  };
}
