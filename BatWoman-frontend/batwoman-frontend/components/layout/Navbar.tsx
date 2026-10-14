"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Logo from "@/components/home/Logo";

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
import { logout as logoutService, getCurrentUser } from "@/services/auth.service";

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
    title: "Our Story",
    href: "/customer/about",
  },
  {
    title: "Contact",
    href: "/customer/contact",
  },
];

export default function Navbar() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const requireAuth = useRequireAuth();
  const { openLogin } = useAuthModal();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: cart } = useCart();
  const { data: wishlist = [] } = useWishlist();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  const logoutStore = useAuthStore((state) => state.logout);
  const refreshToken = useAuthStore((state) => state.refreshToken);

  const cartItemCount =
    cart?.items?.reduce((total, item) => total + item.quantity, 0) ?? 0;
  const wishlistItemCount = wishlist.length;

  useEffect(() => {
    let cancelled = false;
    async function checkAdminRole() {
      if (!isAuthenticated) {
        setIsAdmin(false);
        return;
      }
      try {
        const user = await getCurrentUser();
        if (!cancelled) {
          setIsAdmin(user?.role === "ROLE_ADMIN");
        }
      } catch (error) {
        console.error("Failed to check user role:", error);
        if (!cancelled) setIsAdmin(false);
      }
    }
    checkAdminRole();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  async function handleLogout() {
    try {
      if (refreshToken) {
        await logoutService(refreshToken);
      }
    } catch (error) {
      console.error(error);
    } finally {
      queryClient.removeQueries({ queryKey: ["cart"] });
      logoutStore();
      setIsAdmin(false);
      setMobileMenuOpen(false);
      router.push("/");
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeFeatured = navItems.find((item) => item.title === activeDropdown)?.featured;

  return (
    <>
      <header
        onMouseLeave={() => setActiveDropdown(null)}
        /*
          EXACT COLOR MATCH:
          bg-[#F3ECE2] with backdrop-blur matches the warm silk tone of your logo perfectly!
        */
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || activeDropdown
            ? "border-b border-[#D8CEBF]/60 bg-[#F3ECE2]/95 backdrop-blur-2xl shadow-[0_4px_30px_rgba(45,31,26,0.04)]"
            : "border-b border-transparent bg-[#F3ECE2]/90 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 sm:h-28">
          {/* ================= LEFT (NAVIGATION) ================= */}
          <div className="flex items-center">
            <button
              className="text-[#2C2420] transition-colors duration-300 hover:text-[#8C6D4F] lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>

            <nav className="hidden items-center gap-10 lg:flex">
              {navItems.map((item) => (
                <div
                  key={item.title}
                  className="relative flex h-24 sm:h-28 items-center"
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
                    className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.25em] text-[#2C2420] transition-colors duration-300 hover:text-[#8C6D4F]"
                  >
                    {item.title}
                    {item.featured && (
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-500 ease-out ${
                          activeDropdown === item.title ? "rotate-180 text-[#8C6D4F]" : ""
                        }`}
                      />
                    )}
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {/* ================= CENTER (SEAMLESS LOGO) ================= */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center py-1 transition-opacity duration-300 hover:opacity-85"
          >
            <Logo />
          </Link>

          {/* ================= RIGHT (ICONS) ================= */}
          <div className="flex items-center gap-6">
            {/* Search */}
            <Link href="/customer/search" aria-label="Search">
              <Search
                size={19}
                className="text-[#2C2420] transition-colors duration-300 hover:text-[#8C6D4F]"
              />
            </Link>

            {/* Wishlist */}
            <button
              type="button"
              className="hidden md:block"
              onClick={() =>
                requireAuth(() => router.push("/customer/wishlist"))
              }
              aria-label="Wishlist"
            >
              <div className="relative">
                <Heart
                  size={19}
                  className="text-[#2C2420] transition-colors duration-300 hover:text-[#8C6D4F]"
                />
                {wishlistItemCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#2D1F1A] text-[9px] font-medium text-white shadow-sm ring-2 ring-[#F3ECE2]">
                    {wishlistItemCount}
                  </span>
                )}
              </div>
            </button>

            {/* Account */}
            <div className="relative">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className="flex items-center text-[#2C2420] transition-colors duration-300 hover:text-[#8C6D4F]"
                  aria-label="Account menu"
                >
                  <User size={19} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={openLogin}
                  className="text-[#2C2420] transition-colors duration-300 hover:text-[#8C6D4F]"
                  aria-label="Login"
                >
                  <User size={19} />
                </button>
              )}

              {/* User Dropdown */}
              <AnimatePresence>
                {userMenuOpen && isAuthenticated && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-4 w-52 rounded-xl border border-[#D8CEBF] bg-[#FAF7F2] p-2 shadow-2xl backdrop-blur-xl"
                  >
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="block rounded-lg px-4 py-2.5 text-xs uppercase tracking-widest text-[#2C2420] hover:bg-[#F3ECE2]"
                      >
                        Admin Portal
                      </Link>
                    )}
                    <Link
                      href="/customer/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="block rounded-lg px-4 py-2.5 text-xs uppercase tracking-widest text-[#2C2420] hover:bg-[#F3ECE2]"
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/customer/orders"
                      onClick={() => setUserMenuOpen(false)}
                      className="block rounded-lg px-4 py-2.5 text-xs uppercase tracking-widest text-[#2C2420] hover:bg-[#F3ECE2]"
                    >
                      Orders
                    </Link>
                    <div className="my-1 border-t border-[#D8CEBF]" />
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="block w-full rounded-lg px-4 py-2.5 text-left text-xs uppercase tracking-widest text-red-700 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart Bag */}
            <Link href="/customer/cart" aria-label="Shopping Cart">
              <div className="relative">
                <ShoppingBag
                  size={19}
                  className="text-[#2C2420] transition-colors duration-300 hover:text-[#8C6D4F]"
                />
                {cartItemCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#2D1F1A] text-[9px] font-medium text-white shadow-sm ring-2 ring-[#F3ECE2]">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>

        {/* ================= MEGA MENU FLYOUT ================= */}
        <AnimatePresence>
          {activeDropdown && activeFeatured && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="border-t border-[#D8CEBF] bg-[#F3ECE2] shadow-2xl backdrop-blur-2xl"
            >
              <div className="mx-auto grid max-w-7xl grid-cols-2 gap-16 px-12 py-12">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#8C6D4F]">
                    {activeDropdown}
                  </p>
                  <h2 className="mt-4 font-[var(--font-playfair)] text-4xl leading-tight text-[#2C2420]">
                    Discover timeless <br /> luxury.
                  </h2>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#6D5548] font-[var(--font-playfair)] italic">
                    &ldquo;Elegance is not about being noticed, it&apos;s about being remembered.&rdquo;
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4 pt-2">
                    {activeFeatured.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="block text-sm tracking-wide text-[#2C2420] transition-colors hover:text-[#8C6D4F]"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  <div className="relative h-64 overflow-hidden rounded-sm bg-[#EFE5D9]">
                    <Image
                      src="https://res.cloudinary.com/m0okzag4/image/upload/f_auto,q_auto/img1"
                      alt="Zubayda By A3 Showcase"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
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
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-0 top-0 z-50 h-screen w-80 bg-[#F3ECE2] p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[#D8CEBF] pb-6">
                <Logo />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-neutral-500 hover:text-black"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="mt-8 space-y-6">
                {navItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm font-medium uppercase tracking-[0.25em] text-[#2C2420] transition-colors hover:text-[#8C6D4F]"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>

              <div className="mt-12 border-t border-[#D8CEBF] pt-6 space-y-4">
                <Link
                  href="/customer/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs uppercase tracking-widest text-[#6D5548] hover:text-black"
                >
                  Wishlist ({wishlistItemCount})
                </Link>
                <Link
                  href="/customer/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs uppercase tracking-widest text-[#6D5548] hover:text-black"
                >
                  My Profile
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}