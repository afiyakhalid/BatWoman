"use client";

export default function Newsletter() {
  return (
    <div className="mt-16">

      <h3 className="font-[var(--font-playfair)] text-3xl">
        Subscribe to our Newsletter
      </h3>

      <p className="mt-4 text-neutral-600">
        Get exclusive offers, new arrivals and luxury collections delivered to
        your inbox.
      </p>

      <form className="mt-8 flex flex-col gap-4 sm:flex-row">

        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 border-b border-black bg-transparent py-3 outline-none"
        />

        <button
          className="rounded-full bg-black px-8 py-3 text-white transition hover:bg-neutral-800"
        >
          Subscribe
        </button>

      </form>

    </div>
  );
}