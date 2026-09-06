import prisma from '../config/database';

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  profilePicture: string | null;
  totalScore: number;
}

export async function getGlobalLeaderboard(): Promise<LeaderboardEntry[]> {
  const results = await prisma.bestScore.groupBy({
    by: ['userId'],
    _sum: { score: true },
    orderBy: { _sum: { score: 'desc' } },
    take: 10,
  });

  const userIds = results.map((r) => r.userId);
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, username: true, profilePicture: true },
  });

  const userMap = new Map(users.map((u) => [u.id, u]));

  return results.map((r, index) => {
    const user = userMap.get(r.userId);
    return {
      rank: index + 1,
      userId: r.userId,
      username: user?.username ?? '',
      profilePicture: user?.profilePicture ?? null,
      totalScore: r._sum.score ?? 0,
    };
  });
}

export async function getCategoryLeaderboard(category: string): Promise<LeaderboardEntry[]> {
  const results = await prisma.bestScore.groupBy({
    by: ['userId'],
    where: {
      trivia: { category },
    },
    _sum: { score: true },
    orderBy: { _sum: { score: 'desc' } },
    take: 10,
  });

  const userIds = results.map((r) => r.userId);
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, username: true, profilePicture: true },
  });

  const userMap = new Map(users.map((u) => [u.id, u]));

  return results.map((r, index) => {
    const user = userMap.get(r.userId);
    return {
      rank: index + 1,
      userId: r.userId,
      username: user?.username ?? '',
      profilePicture: user?.profilePicture ?? null,
      totalScore: r._sum.score ?? 0,
    };
  });
}
