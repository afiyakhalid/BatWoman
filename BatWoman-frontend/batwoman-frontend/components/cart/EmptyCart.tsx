//
// "use client";
//
// import Link from "next/link";
//
// export default function EmptyCart() {
//   return (
//     <div className="flex flex-col items-center justify-center px-4 py-32 text-center">
//       <h2 className="font-[var(--font-playfair)] text-3xl font-normal italic text-neutral-900 sm:text-4xl">
//         Your shopping bag is empty.
//       </h2>
//
//       <p className="mt-3 max-w-md text-xs font-light uppercase tracking-[0.2em] text-neutral-400">
//         Explore pieces cut for understated elegance and modest luxury.
//       </p>
//
//       <Link
//         href="/customer/products"
//         style={{
//           backgroundColor: "#000000",
//           color: "#ffffff",
//           WebkitTextFillColor: "#ffffff",
//         }}
//         className="mt-10 inline-flex min-h-14 w-full max-w-xs items-center justify-center px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] transition-colors duration-300 hover:bg-neutral-800"
//       >
//         Explore Collection
//       </Link>
//     </div>
//   );
// }

"use client";

import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-32 text-center">
      <h2 className="font-[var(--font-playfair)] text-3xl font-normal italic text-neutral-900 sm:text-4xl">
        Your shopping bag is empty.
      </h2>

      <p className="mt-3 max-w-md text-xs font-light uppercase tracking-[0.2em] text-neutral-400">
        Explore pieces cut for understated elegance and modest luxury.
      </p>

      <Link
        href="/customer/products"
        style={{
          backgroundColor: "#000000",
          color: "#ffffff",
          WebkitTextFillColor: "#ffffff",
        }}
        className="mt-10 inline-flex min-h-14 w-full max-w-xs items-center justify-center px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] transition-colors duration-300 hover:bg-neutral-800"
      >
        <span
          style={{
            color: "#ffffff",
            WebkitTextFillColor: "#ffffff",
          }}
        >
          Explore Collection
        </span>
      </Link>
    </div>
  );
}
