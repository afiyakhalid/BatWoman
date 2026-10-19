import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

export const clamp = (n: number) =>
    Math.min(1, Math.max(0, n));

export const mix = (
    a: number[],
    b: number[],
    p: number
) =>
    `rgb(${a
        .map((v, i) =>
            Math.round(v + (b[i] - v) * p)
        )
        .join(",")})`;

export function useScrub(
    mode: "sticky" | "pass"
): [RefObject<HTMLDivElement | null>, number] {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let rafId = 0;
    let previousProgress = -1;

    const calculateProgress = () => {
      const element = ref.current;

      if (!element) {
        return 0;
      }

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (mode === "sticky") {
        return clamp(
            -rect.top /
            Math.max(1, rect.height - viewportHeight)
        );
      }

      return clamp(
          (viewportHeight - rect.top) /
          (viewportHeight + rect.height)
      );
    };

    const updateProgress = () => {
      rafId = 0;

      const nextProgress = calculateProgress();

      // Avoid unnecessary React renders when progress
      // has not meaningfully changed.
      if (
          Math.abs(nextProgress - previousProgress) >= 0.001 ||
          nextProgress === 0 ||
          nextProgress === 1
      ) {
        previousProgress = nextProgress;
        setP(nextProgress);
      }
    };

    const scheduleUpdate = () => {
      if (rafId !== 0) {
        return;
      }

      rafId = window.requestAnimationFrame(updateProgress);
    };

    // Set the initial position immediately.
    previousProgress = calculateProgress();
    setP(previousProgress);

    window.addEventListener("scroll", scheduleUpdate, {
      passive: true,
    });

    window.addEventListener("resize", scheduleUpdate, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [mode]);

  return [ref, p];
}