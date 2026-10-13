"use client";

import { forwardRef, useState } from "react";
import Link from "next/link";

function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-[var(--font-playfair)] font-medium tracking-[0.03em] ${className}`}>
      Zubayda<span className="font-normal italic">By A3</span>
    </span>
  );
}

const CurtainFooter = forwardRef<HTMLElement>((_, ref) => {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer
      ref={ref}
      id="footer"
      className="relative z-0 bg-black text-white lg:fixed lg:inset-x-0 lg:bottom-0"
    >
      <div className="mx-auto max-w-[1280px] px-5 pb-8 pt-20 md:px-8">
        <div className="flex flex-col gap-8 border-b border-white/15 pb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.25em] text-[#d4af37]">Newsletter</p>
            <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold md:text-5xl">
              Meet the pieces you&apos;ll return to.
            </h2>
          </div>
          {subscribed ? (
            <p className="font-[var(--font-playfair)] text-2xl">Thank you. Welcome in.</p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
              className="flex w-full max-w-md flex-col gap-4 sm:flex-row"
            >
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                type="email"
                required
                placeholder="Your email address"
                className="flex-1 rounded-none border-0 border-b border-white/40 bg-transparent px-1 py-3 text-base outline-none transition-colors placeholder:text-white/50 focus:border-[#d4af37]"
              />
              <button
                type="submit"
                className="rounded-full bg-white px-8 py-4 text-sm font-medium tracking-[0.05em] text-black transition-all hover:scale-[1.02] hover:bg-[#d4af37]"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo className="text-3xl" />
            <p className="mt-4 max-w-xs text-sm leading-[1.7] text-white/60">
              Rooted in modesty. Defined by individuality.
            </p>
          </div>
          {[
            ["Shop", ["Newly Discovered", "The Signature Collection", "Everyday, Elevated", "The Occasion Edit"]],
            ["Company", ["Our Story", "The Art of Detail", "Journal", "Contact"]],
            ["Support", ["Shipping", "Returns", "Size Guide", "FAQ"]],
          ].map(([h, items]) => (
            <div key={h as string}>
              <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.25em] text-white/50">{h as string}</p>
              <ul className="space-y-2.5 text-sm">
                {(items as string[]).map((i) => (
                  <li key={i}>
                    <Link href="/customer/products" className="transition-colors hover:text-[#d4af37]">
                      {i}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-white/15 pt-6 text-[12px] tracking-[0.05em] text-white/50">
          <span>© 2026 Zubayda By A3. All rights reserved.</span>
          <span>Privacy · Terms</span>
        </div>
      </div>
    </footer>
  );
});

CurtainFooter.displayName = "CurtainFooter";
export default CurtainFooter;