"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
  ChevronDown,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  {
    title: "Collections",
    href: "/collections",
    featured: [
      { name: "Luxury Collection", href: "/collections/luxury" },
      { name: "Summer Collection", href: "/collections/summer" },
      { name: "New Arrivals", href: "/products?sort=newest" },
      { name: "Best Sellers", href: "/products?sort=bestseller" },
      { name: "Editor's Picks", href: "/collections/editors-picks" },
    ],
  },
  {
    title: "Shop",
    href: "/products",
    featured: [
      { name: "All Products", href: "/products" },
      { name: "Trending", href: "/products?sort=trending" },
      { name: "Sale", href: "/products?sale=true" },
    ],
  },
  {
    title: "Categories",
    href: "/categories",
    featured: [
      { name: "Luxury", href: "/categories/luxury" },
      { name: "Casual", href: "/categories/casual" },
      { name: "Party Wear", href: "/categories/party" },
      { name: "Everyday", href: "/categories/everyday" },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <>
      <header
        onMouseLeave={() => setActiveDropdown(null)}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || activeDropdown
            ? "border-b border-neutral-200 bg-white/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* LEFT */}
          <div className="flex items-center">
            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={23} />
            </button>

            <nav className="hidden items-center gap-10 lg:flex">
              {navItems.map((item) => (
                <div
                  key={item.title}
                  className="relative flex h-20 items-center"
                  onMouseEnter={() => setActiveDropdown(item.title)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 text-xs font-medium uppercase tracking-[0.22em] transition hover:text-neutral-500"
                  >
                    {item.title}
                    <ChevronDown
                      size={12}
                      className={`transition duration-300 ${
                        activeDropdown === item.title ? "rotate-180" : ""
                      }`}
                    />
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {/* CENTER */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 font-[var(--font-playfair)] text-3xl tracking-[0.35em]"
          >
            BATWOMAN
          </Link>

          {/* RIGHT */}
          <div className="flex items-center gap-5">
            <Link href="/search">
              <Search size={20} className="transition hover:scale-110" />
            </Link>
            <Link href="/wishlist" className="hidden md:block">
              <Heart size={20} className="transition hover:scale-110" />
            </Link>
            <Link href="/cart">
              <ShoppingBag size={20} className="transition hover:scale-110" />
            </Link>
            <Link href="/profile" className="hidden md:block">
              <User size={20} className="transition hover:scale-110" />
            </Link>
          </div>
        </div>

        {/* ================= DESKTOP MEGA MENU ================= */}
        <AnimatePresence mode="wait">
          {activeDropdown && (
            <motion.div
              key={activeDropdown} // 👈 Added to fix animation swap glitches
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="hidden lg:block overflow-hidden border-t border-neutral-100 bg-white/95 backdrop-blur-xl"
            >
              <div className="mx-auto grid max-w-7xl grid-cols-[1fr_1.2fr] gap-16 px-6 py-12">
                {/* LEFT CARD */}
                <div>
                  <p className="mb-4 text-xs uppercase tracking-[0.35em] text-neutral-400">
                    {activeDropdown}
                  </p>
                  <h2 className="font-[var(--font-playfair)] text-4xl leading-tight">
                    Discover timeless
                    <br />
                    luxury.
                  </h2>
                  <p className="mt-5 max-w-sm text-sm leading-7 text-neutral-600">
                    Carefully curated collections designed for elegance, comfort
                    and modern modest fashion.
                  </p>
                </div>

                {/* RIGHT CARD */}
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-5">
                    {navItems
                      .find((item) => item.title === activeDropdown)
                      ?.featured?.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block text-lg transition-all duration-300 hover:translate-x-2 hover:text-black"
                        >
                          {item.name}
                        </Link>
                      ))}
                  </div>

                  <div className="relative h-72 overflow-hidden rounded-2xl">
                    <Image
                      src="/images/navbar/editorial.jpg"
                      alt="Editorial Collection Showcase"
                      fill
                      sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 33vw, 400px" // 👈 CRITICAL PERFORMANCE FIX
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <p className="text-xs uppercase tracking-[0.35em]">
                        Editorial
                      </p>
                      <h3 className="mt-2 font-[var(--font-playfair)] text-3xl">
                        New Season
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ================= BACKDROP ================= */}
      <AnimatePresence>
        {activeDropdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onMouseEnter={() => setActiveDropdown(null)}
            className="fixed inset-0 top-20 z-40 bg-white/20 backdrop-blur-md"
          />
        )}
      </AnimatePresence>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-0 z-50 h-screen w-80 bg-white p-8"
            >
              <div className="mb-12 flex justify-end">
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X />
                </button>
              </div>

              <nav className="space-y-8">
                {navItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="block text-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
                <hr />
                <Link href="/wishlist" className="block">
                  Wishlist
                </Link>
                <Link href="/cart" className="block">
                  Cart
                </Link>
                <Link href="/profile" className="block">
                  Profile
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}