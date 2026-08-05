"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { usePathname, useRouter } from "next/navigation";
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

import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useAuthStore } from "@/store/auth.store";

import { logout as logoutService } from "@/services/auth.service";

const navItems = [
  {
    title: "Shop",
    href: "/customer/products",
    featured: [
      { name: "All Products", href: "/customer/products" },
      { name: "New Arrivals", href: "/customer/products?sort=newest" },
      { name: "Best Sellers", href: "/customer/products?sort=bestseller" },
      { name: "Trending", href: "/customer/products?sort=trending" },
      { name: "Sale", href: "/customer/products?sale=true" },
    ],
  },
  {
    title: "About Us",
    href: "/customer/about",
  },
  {
    title: "Contact Us",
    href: "/customer/contact",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const requireAuth = useRequireAuth();
  const { openLogin } = useAuthModal();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  const { data: cart } = useCart();

  const cartItemCount =
    cart?.items?.reduce((total, item) => total + item.quantity, 0) ?? 0;

  const refreshToken = useAuthStore((state) => state.refreshToken);
  const logoutStore = useAuthStore((state) => state.logout);

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  async function handleLogout() {
    try {
      if (refreshToken) {
        await logoutService(refreshToken);
      }
    } catch (error) {
      console.error(error);
    } finally {
      logoutStore();
      router.push("/");
    }
  }

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

  const activeFeatured = navItems.find(
    (item) => item.title === activeDropdown
  )?.featured;

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
                  onMouseEnter={() => {
                    if (item.featured) {
                      setActiveDropdown(item.title);
                    } else {
                      setActiveDropdown(null);
                    }
                  }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 text-xs font-medium uppercase tracking-[0.22em] transition hover:text-neutral-500"
                  >
                    {item.title}
                    {item.featured && (
                      <ChevronDown
                        size={12}
                        className={`transition duration-300 ${
                          activeDropdown === item.title ? "rotate-180" : ""
                        }`}
                      />
                    )}
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

            <button
              className="hidden md:block"
              onClick={() => requireAuth(() => router.push("/customer/wishlist"))}
            >
              <Heart size={20} className="transition hover:scale-110" />
            </button>

            <button onClick={() => requireAuth(() => router.push("/customer/cart"))}>
              <div className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[11px] font-semibold text-white">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </button>

            {isAuthenticated ? (
              <Link href="/customer/profile" className="hidden md:block">
                <User size={20} className="transition hover:scale-110" />
              </Link>
            ) : (
              <button className="hidden md:block" onClick={openLogin}>
                <User size={20} className="transition hover:scale-110" />
              </button>
            )}

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="hidden md:block text-xs uppercase tracking-[0.15em] text-neutral-500 hover:text-black transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* ================= DESKTOP MEGA MENU ================= */}
        <AnimatePresence mode="wait">
          {activeDropdown && activeFeatured && (
            <motion.div
              key={activeDropdown}
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
                    {activeFeatured.map((item) => (
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
                      sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 33vw, 400px"
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
        {activeDropdown && activeFeatured && (
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

                <button
                  className="block text-left w-full text-lg"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    requireAuth(() => router.push("/customer/wishlist"));
                  }}
                >
                  Wishlist
                </button>

                <button
                  className="block text-left w-full text-lg"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    requireAuth(() => router.push("/customer/cart"));
                  }}
                >
                  Cart
                </button>

                {isAuthenticated ? (
                  <>
                    <Link
                      href="/customer/profile"
                      className="block text-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      className="block text-left w-full text-lg text-neutral-500"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleLogout();
                      }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    className="block text-left w-full text-lg"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openLogin();
                    }}
                  >
                    Login / Register
                  </button>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}