import prisma from '../config/database';

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getTime() === b.getTime();
}

export async function updateStreak(userId: string): Promise<{ streakUpdated: boolean; currentStreak: number }> {
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });

  const today = startOfDay(new Date());
  const lastPlayed = user.lastPlayedDate ? startOfDay(user.lastPlayedDate) : null;

  if (lastPlayed && isSameDay(today, lastPlayed)) {
    // Already played today, no streak update
    return { streakUpdated: false, currentStreak: user.currentStreak };
  }

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  let newStreak: number;

  if (lastPlayed && isSameDay(yesterday, lastPlayed)) {
    // Played yesterday, increment streak
    newStreak = user.currentStreak + 1;
  } else {
    // Broke the streak or first time, start at 1
    newStreak = 1;
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      currentStreak: newStreak,
      lastPlayedDate: new Date(),
    },
  });

  return { streakUpdated: true, currentStreak: newStreak };
}
