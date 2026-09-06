interface TimerProps {
  timeLeft: number;
  duration: number;
}

export default function Timer({ timeLeft, duration }: TimerProps) {
  const percentage = (timeLeft / duration) * 100;

  const getColor = () => {
    if (timeLeft <= 2) return 'text-red-500';
    if (timeLeft <= 4) return 'text-orange-400';
    return 'text-emerald-500';
  };

  const getTrackColor = () => {
    if (timeLeft <= 2) return 'stroke-red-500';
    if (timeLeft <= 4) return 'stroke-orange-400';
    return 'stroke-emerald-500';
  };

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24">
      <svg className="w-20 h-20 sm:w-24 sm:h-24 -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          className={`${getTrackColor()} transition-all duration-1000 ease-linear`}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <span className={`absolute text-2xl sm:text-3xl font-bold ${getColor()}`}>
        {timeLeft}
      </span>
    </div>
  );
}
