import { useState, useEffect, useCallback } from 'react';

export function useTimer(duration: number = 7) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const start = useCallback(() => { setTimeLeft(duration); setIsRunning(true); }, [duration]);
  const stop = useCallback(() => { setIsRunning(false); }, []);
  const reset = useCallback(() => { setTimeLeft(duration); setIsRunning(false); }, [duration]);

  return { timeLeft, isRunning, start, stop, reset };
}
