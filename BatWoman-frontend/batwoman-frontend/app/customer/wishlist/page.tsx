"use client";

import Link from "next/link";
import { Heart, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

import { useWishlist } from "@/hooks/useWishlist";
import WishlistCard from "@/components/wishlist/WishlistCard";

export default function WishlistPage() {
  const {
    data: wishlist = [],
    isLoading,
    isError,
    removeFromWishlist,
    isRemoving,
  } = useWishlist();

  // Loading skeleton state
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#faf8f5] py-12 sm:py-20">
        <section className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <div className="animate-pulse space-y-8">
            <div className="h-4 w-36 bg-[#e8e2d8]" />
            <div className="space-y-3">
              <div className="h-10 w-64 bg-[#e8e2d8]" />
              <div className="h-4 w-40 bg-[#e8e2d8]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white border border-[#e7e1d8] p-4 space-y-4"
                >
                  <div className="aspect-[3/4] bg-[#f4eee6]" />
                  <div className="h-4 w-3/4 bg-[#e8e2d8]" />
                  <div className="h-4 w-1/2 bg-[#e8e2d8]" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Error state
  if (isError) {
    return (
      <main className="min-h-screen bg-[#faf8f5] py-20 sm:py-32">
        <section className="mx-auto max-w-xl px-6 text-center">
          <div className="bg-white border border-[#e7e1d8] p-8 sm:p-12 shadow-[0_4px_25px_rgba(45,31,26,0.03)]">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f4eee6] text-[#8C6D4F]">
              <Heart size={24} strokeWidth={1.5} />
            </div>
            <h1 className="font-[var(--font-playfair)] text-2xl sm:text-3xl text-neutral-900 font-normal">
              Archive Inaccessible
            </h1>
            <p className="mt-3 text-xs leading-relaxed text-neutral-500 max-w-md mx-auto">
              We encountered an issue synchronizing your private archive. Please try refreshing your session or reconnecting.
            </p>
            <div className="mt-8">
              <Link
                href="/customer/products"
                className="inline-flex items-center gap-2 bg-black px-8 py-3.5 text-xs uppercase tracking-[0.22em] text-white transition hover:bg-neutral-800 rounded-none"
              >
                <ArrowLeft size={14} />
                <span>Return to Collection</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Empty state
  if (wishlist.length === 0) {
    return (
      <main className="min-h-screen bg-[#faf8f5] py-20 sm:py-32">
        <section className="mx-auto max-w-xl px-6 text-center">
          <div className="bg-white border border-[#e7e1d8] p-10 sm:p-16 shadow-[0_4px_25px_rgba(45,31,26,0.03)]">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f4eee6] text-[#8C6D4F]">
              <Heart size={26} strokeWidth={1.5} />
            </div>

            <p className="text-[10px] uppercase tracking-[0.28em] text-[#8C6D4F] font-medium mb-2">
              Personal Archive
            </p>

            <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl text-neutral-900 font-normal italic">
              Your Wishlist is Empty
            </h1>

            <p className="mt-4 text-xs sm:text-sm text-neutral-500 max-w-md mx-auto leading-relaxed">
              Capture pieces you admire while exploring the collection, and revisit them when you are ready to curate your personal wardrobe.
            </p>

            <div className="mt-8 pt-4">
              <Link
                href="/customer/products"
                className="inline-flex items-center gap-2 border border-neutral-900 bg-transparent px-8 py-4 text-xs uppercase tracking-[0.25em] font-medium text-neutral-900 transition-colors duration-200 hover:bg-neutral-900 hover:text-white rounded-none"
              >
                <span>Explore New Arrivals</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f5] py-10 sm:py-16">
      <section className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        {/* TOP NAVIGATION LINK */}
        <div className="mb-8">
          <Link
            href="/customer/products"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-neutral-500 hover:text-black transition"
          >
            <ArrowLeft size={14} />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* EDITORIAL HEADER */}
        <div className="mb-10 pb-8 border-b border-[#e7e1d8] flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={12} className="text-[#8C6D4F]" />
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#8C6D4F] font-medium">
                Private Archive · Saved For Later
              </p>
            </div>
            <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-900">
              My Wishlist
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-neutral-500 tracking-wide">
              A curated archive of your saved abayas. ({wishlist.length}{" "}
              {wishlist.length === 1 ? "piece" : "pieces"})
            </p>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {wishlist.map((item) => (
            <WishlistCard
              key={item.id}
              item={item}
              isRemoving={isRemoving}
              onRemove={removeFromWishlist}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
// "use client";
//
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Heart, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
//
// import { useAuthStore } from "@/store/auth.store";
// import { useWishlist } from "@/hooks/useWishlist";
// import WishlistCard from "@/components/wishlist/WishlistCard";
//
// export default function WishlistPage() {
//   const router = useRouter();
//
//   const accessToken = useAuthStore((state) => state.accessToken);
//   const isHydrated = useAuthStore((state) => state.isHydrated);
//   const hydrate = useAuthStore((state) => state.hydrate);
//
//   useEffect(() => {
//     if (!isHydrated) {
//       hydrate();
//     }
//   }, [isHydrated, hydrate]);
//
//   const isSignedIn = isHydrated && Boolean(accessToken);
//
//   const {
//     data: wishlist = [],
//     isLoading,
//     isError,
//     removeFromWishlist,
//     isRemoving,
//   } = useWishlist({
//     enabled: isSignedIn,
//   });
//
//   // Redirect unauthenticated users to the login page
//   useEffect(() => {
//     if (isHydrated && !accessToken) {
//       router.replace("/customer/login");
//     }
//   }, [isHydrated, accessToken, router]);
//
//   // Prevent loading/error UI from flashing during hydration or redirect
//   if (!isHydrated || !accessToken) {
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-[#faf8f5]">
//         <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
//           Redirecting to sign in...
//         </p>
//       </main>
//     );
//   }
//
//   // Loading skeleton state
//   if (isLoading) {
//     return (
//       <main className="min-h-screen bg-[#faf8f5] py-12 sm:py-20">
//         <section className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
//           <div className="animate-pulse space-y-8">
//             <div className="h-4 w-36 bg-[#e8e2d8]" />
//             <div className="space-y-3">
//               <div className="h-10 w-64 bg-[#e8e2d8]" />
//               <div className="h-4 w-40 bg-[#e8e2d8]" />
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
//               {[1, 2, 3, 4].map((i) => (
//                 <div
//                   key={i}
//                   className="bg-white border border-[#e7e1d8] p-4 space-y-4"
//                 >
//                   <div className="aspect-[3/4] bg-[#f4eee6]" />
//                   <div className="h-4 w-3/4 bg-[#e8e2d8]" />
//                   <div className="h-4 w-1/2 bg-[#e8e2d8]" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>
//     );
//   }
//
//   // Error state
//   if (isError) {
//     return (
//       <main className="min-h-screen bg-[#faf8f5] py-20 sm:py-32">
//         <section className="mx-auto max-w-xl px-6 text-center">
//           <div className="bg-white border border-[#e7e1d8] p-8 sm:p-12 shadow-[0_4px_25px_rgba(45,31,26,0.03)]">
//             <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f4eee6] text-[#8C6D4F]">
//               <Heart size={24} strokeWidth={1.5} />
//             </div>
//             <h1 className="font-[var(--font-playfair)] text-2xl sm:text-3xl text-neutral-900 font-normal">
//               Archive Inaccessible
//             </h1>
//             <p className="mt-3 text-xs leading-relaxed text-neutral-500 max-w-md mx-auto">
//               We encountered an issue synchronizing your private archive. Please try refreshing your session or reconnecting.
//             </p>
//             <div className="mt-8">
//               <Link
//                 href="/customer/products"
//                 className="inline-flex items-center gap-2 bg-black px-8 py-3.5 text-xs uppercase tracking-[0.22em] text-white transition hover:bg-neutral-800 rounded-none"
//               >
//                 <ArrowLeft size={14} />
//                 <span>Return to Collection</span>
//               </Link>
//             </div>
//           </div>
//         </section>
//       </main>
//     );
//   }
//
//   // Empty state
//   if (wishlist.length === 0) {
//     return (
//       <main className="min-h-screen bg-[#faf8f5] py-20 sm:py-32">
//         <section className="mx-auto max-w-xl px-6 text-center">
//           <div className="bg-white border border-[#e7e1d8] p-10 sm:p-16 shadow-[0_4px_25px_rgba(45,31,26,0.03)]">
//             <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f4eee6] text-[#8C6D4F]">
//               <Heart size={26} strokeWidth={1.5} />
//             </div>
//
//             <p className="text-[10px] uppercase tracking-[0.28em] text-[#8C6D4F] font-medium mb-2">
//               Personal Archive
//             </p>
//
//             <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl text-neutral-900 font-normal italic">
//               Your Wishlist is Empty
//             </h1>
//
//             <p className="mt-4 text-xs sm:text-sm text-neutral-500 max-w-md mx-auto leading-relaxed">
//               Capture pieces you admire while exploring the collection, and revisit them when you are ready to curate your personal wardrobe.
//             </p>
//
//             <div className="mt-8 pt-4">
//               <Link
//                 href="/customer/products"
//                 className="inline-flex items-center gap-2 border border-neutral-900 bg-transparent px-8 py-4 text-xs uppercase tracking-[0.25em] font-medium text-neutral-900 transition-colors duration-200 hover:bg-neutral-900 hover:text-white rounded-none"
//               >
//                 <span>Explore New Arrivals</span>
//                 <ArrowRight size={14} />
//               </Link>
//             </div>
//           </div>
//         </section>
//       </main>
//     );
//   }
//
//   return (
//     <main className="min-h-screen bg-[#faf8f5] py-10 sm:py-16">
//       <section className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
//         {/* TOP NAVIGATION LINK */}
//         <div className="mb-8">
//           <Link
//             href="/customer/products"
//             className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-neutral-500 hover:text-black transition"
//           >
//             <ArrowLeft size={14} />
//             <span>Continue Shopping</span>
//           </Link>
//         </div>
//
//         {/* EDITORIAL HEADER */}
//         <div className="mb-10 pb-8 border-b border-[#e7e1d8] flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
//           <div>
//             <div className="flex items-center gap-2 mb-1">
//               <Sparkles size={12} className="text-[#8C6D4F]" />
//               <p className="text-[10px] uppercase tracking-[0.28em] text-[#8C6D4F] font-medium">
//                 Private Archive · Saved For Later
//               </p>
//             </div>
//             <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-900">
//               My Wishlist
//             </h1>
//             <p className="mt-2 text-xs sm:text-sm text-neutral-500 tracking-wide">
//               A curated archive of your saved abayas. ({wishlist.length}{" "}
//               {wishlist.length === 1 ? "piece" : "pieces"})
//             </p>
//           </div>
//         </div>
//
//         {/* PRODUCTS GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
//           {wishlist.map((item) => (
//             <WishlistCard
//               key={item.id}
//               item={item}
//               isRemoving={isRemoving}
//               onRemove={removeFromWishlist}
//             />
//           ))}
//         </div>
//       </section>
//     </main>
//   );
//}