"use client";

const tickerPhrases = [
  "Designed for understated elegance",
  "Where modesty meets modernity",
  "Timeless silhouettes. Considered details.",
  "Less, but more meaningful.",
  "Made for your moments",
  "An expression of effortless grace",
  "Everyday elegance, reimagined",
  "The beauty of simplicity",
  "Your style, beautifully understated",
  "A wardrobe that transcends seasons",
];

export default function EditorialTicker() {
  const text = tickerPhrases.join("  •  ") + "  •  ";

  return (
    <section className="overflow-hidden bg-black py-[18px] text-white" aria-label="Brand phrases">
      <div className="marquee-track flex w-max whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.35em]">
        {[0, 1].map((k) => (
          <span key={k}>{text.repeat(2)}</span>
        ))}
      </div>
    </section>
  );
}