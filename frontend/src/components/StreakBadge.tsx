interface StreakBadgeProps {
  streak: number;
}

/**
 * A flame badge whose size/intensity grows with the streak count.
 * Larger streaks render a bigger, more vibrant flame.
 */
export default function StreakBadge({ streak }: StreakBadgeProps) {
  // Scale the flame font-size with the streak, capped so it never gets absurd.
  // Base 1.5rem, +0.15rem per streak day, capped at 4rem.
  const fontSize = Math.min(1.5 + streak * 0.15, 4);

  // Intensity: more streak = warmer, more saturated glow.
  const glow = Math.min(streak * 2, 30);
  const opacity = streak > 0 ? 1 : 0.4;

  return (
    <div className="inline-flex items-center gap-2" title={`${streak}-day streak`}>
      <span
        role="img"
        aria-label="streak flame"
        style={{
          fontSize: `${fontSize}rem`,
          lineHeight: 1,
          opacity,
          filter: `drop-shadow(0 0 ${glow}px rgba(249, 115, 22, 0.6))`,
          transition: 'font-size 0.3s ease, filter 0.3s ease',
        }}
      >
        🔥
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-3xl font-extrabold text-orange-500">{streak}</span>
        <span className="text-xs uppercase tracking-wide text-gray-500">
          {streak === 1 ? 'day streak' : 'day streak'}
        </span>
      </span>
    </div>
  );
}
