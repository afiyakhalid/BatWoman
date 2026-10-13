import { useEffect, useRef, useState, type RefObject } from "react";

export const clamp = (n: number) => Math.min(1, Math.max(0, n));

export const mix = (a: number[], b: number[], p: number) =>
  `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * p)).join(",")})`;

export function useScrub(mode: "sticky" | "pass"): [RefObject<HTMLDivElement | null>, number] {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let cur = 0;
    let raf = 0;

    const target = () => {
      const el = ref.current;
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      return mode === "sticky"
        ? clamp(-r.top / Math.max(1, r.height - vh))
        : clamp((vh - r.top) / (vh + r.height));
    };

    const tick = () => {
      const t = target();
      cur += (t - cur) * 0.12;
      if (Math.abs(t - cur) < 0.0004) cur = t;
      setP(cur);
      if (cur !== t) raf = requestAnimationFrame(tick);
      else raf = 0;
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    cur = target();
    setP(cur);

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);

    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      cancelAnimationFrame(raf);
    };
  }, [mode]);

  return [ref, p];
}