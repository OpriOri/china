import { useEffect, useRef, useState } from "react";

export function AnimatedStat({
  value,
  prefix = "",
  suffix = "",
  label,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      setDisplayValue(value);
      return;
    }

    let animationFrame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const duration = 950;
        const startedAt = performance.now();

        const animate = (time: number) => {
          const progress = Math.min(1, (time - startedAt) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(Math.round(value * eased));
          if (progress < 1) animationFrame = window.requestAnimationFrame(animate);
        };

        animationFrame = window.requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  return (
    <span ref={ref}>
      <strong>
        {prefix}
        {displayValue}
        {suffix}
      </strong>
      {label}
    </span>
  );
}
