import { useEffect, useState } from "react";

export function useCountdown(targetDate: string) {
  const getRemaining = () => {
    const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
    const day = 1000 * 60 * 60 * 24;
    const hour = 1000 * 60 * 60;
    const minute = 1000 * 60;

    return {
      days: Math.floor(diff / day),
      hours: Math.floor((diff % day) / hour),
      minutes: Math.floor((diff % hour) / minute),
    };
  };

  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getRemaining()), 60_000);
    return () => window.clearInterval(timer);
  }, [targetDate]);

  return remaining;
}
