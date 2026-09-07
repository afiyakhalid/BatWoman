"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useRouter } from "next/navigation";

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

import {
  logout as logoutService,
  getCurrentUser,
} from "@/services/auth.service";

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
  const router = useRouter();

  const requireAuth = useRequireAuth();
  const { openLogin } = useAuthModal();

  const isAuthenticated = useAuthStore(
    (state) => !!state.accessToken
  );

  const hydrateAuth = useAuthStore(
    (state) => state.hydrate
  );

  const refreshToken = useAuthStore(
    (state) => state.refreshToken
  );

  const logoutStore = useAuthStore(
    (state) => state.logout
  );

  const { data: cart } = useCart();
  const { data: wishlist = [] } = useWishlist();

  const [isAdmin, setIsAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(
    null
  );

  const cartItemCount =
    cart?.items?.reduce(
      (total, item) => total + item.quantity,
      0
    ) ?? 0;

  const wishlistItemCount = wishlist.length;

  useEffect(() => {
    hydrateAuth();
  }, [hydrateAuth]);

  /*
   * Check the currently logged-in user's role.
   *
   * We use /auth/me instead of assuming that every authenticated
   * user is an admin.
   */
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
          setIsAdmin(user.role === "ADMIN");
        }
      } catch (error) {
        console.error("Failed to check user role:", error);

        if (!cancelled) {
          setIsAdmin(false);
        }
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
      logoutStore();
      setIsAdmin(false);
      router.push("/");
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const activeFeatured = navItems.find(
    (item) => item.title === activeDropdown
  )?.featured;

  return (
    <>
      <header
        onMouseLeave={() => setActiveDropdown(null)}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || activeDropdown
            ? "border-b border-black/5 bg-white/90 backdrop-blur-2xl shadow-[0_4px_24px_rgba(0,0,0,0.02)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* ================= LEFT ================= */}

          <div className="flex items-center">
            <button
              className="lg:hidden text-neutral-800 transition-colors duration-300 hover:text-neutral-500"
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
                    className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-800 transition-colors duration-300 hover:text-neutral-400"
                  >
                    {item.title}

                    {item.featured && (
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-500 ease-out ${
                          activeDropdown === item.title
                            ? "rotate-180 text-neutral-400"
                            : ""
                        }`}
                      />
                    )}
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {/* ================= CENTER ================= */}

          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 font-[var(--font-playfair)] text-2xl md:text-3xl tracking-[0.35em] text-neutral-900 transition-opacity duration-300 hover:opacity-70"
          >
            BATWOMAN
          </Link>

          {/* ================= RIGHT ================= */}

          <div className="flex items-center gap-6">

            {/* Search */}
            <Link href="/search">
              <Search
                size={19}
                className="text-neutral-800 transition-colors duration-300 hover:text-neutral-400"
              />
            </Link>

            {/* Wishlist */}
            <button
              className="hidden md:block"
              onClick={() =>
                requireAuth(() =>
                  router.push("/customer/wishlist")
                )
              }
            >
              <div className="relative">
                <Heart
                  size={19}
                  className="text-neutral-800 transition-colors duration-300 hover:text-neutral-400"
                />

                {wishlistItemCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-[9px] font-medium text-white shadow-sm ring-2 ring-white transition-all">
                    {wishlistItemCount}
                  </span>
                )}
              </div>
            </button>

            {/* Cart */}
            <button
              onClick={() =>
                requireAuth(() =>
                  router.push("/customer/cart")
                )
              }
            >
              <div className="relative">
                <ShoppingBag
                  size={19}
                  className="text-neutral-800 transition-colors duration-300 hover:text-neutral-400"
                />

                {cartItemCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-[9px] font-medium text-white shadow-sm ring-2 ring-white transition-all">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </button>

            {/* Profile */}
            {isAuthenticated ? (
              <Link
                href="/customer/profile"
                className="hidden md:block"
              >
                <User
                  size={19}
                  className="text-neutral-800 transition-colors duration-300 hover:text-neutral-400"
                />
              </Link>
            ) : (
              <button
                className="hidden md:block"
                onClick={openLogin}
              >
                <User
                  size={19}
                  className="text-neutral-800 transition-colors duration-300 hover:text-neutral-400"
                />
              </button>
            )}

            {/* ================= ADMIN BUTTON ================= */}

            {isAuthenticated && isAdmin && (
              <Link
                href="/admin"
                className="hidden md:flex items-center rounded-full border border-neutral-200 bg-neutral-50/50 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-600 backdrop-blur-sm transition-all duration-300 hover:border-neutral-300 hover:bg-white hover:text-neutral-900 hover:shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
              >
                Admin
              </Link>
            )}

            {/* Logout */}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="hidden md:block text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-400 transition-colors duration-300 hover:text-neutral-800"
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
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="hidden overflow-hidden border-t border-black/5 bg-white/95 backdrop-blur-2xl shadow-xl shadow-black/[0.02] lg:block"
            >
              <div className="mx-auto grid max-w-7xl grid-cols-[1fr_1.2fr] gap-16 px-6 py-12">

                {/* LEFT CARD */}

                <div>
                  <p className="mb-4 text-xs uppercase tracking-[0.35em] text-neutral-400">
                    {activeDropdown}
                  </p>

                  <h2 className="font-[var(--font-playfair)] text-4xl leading-tight text-neutral-900">
                    Discover timeless
                    <br />
                    luxury.
                  </h2>

                  <p className="mt-5 max-w-sm text-sm leading-7 text-neutral-500">
                    Carefully curated collections designed for elegance,
                    comfort and modern modest fashion.
                  </p>
                </div>

                {/* RIGHT CARD */}

                <div className="grid grid-cols-2 gap-8">

                  <div className="space-y-6 pt-2">
                    {activeFeatured.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block text-sm tracking-wide text-neutral-600 transition-colors duration-300 hover:text-black"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  <div className="relative h-72 overflow-hidden rounded-xl group cursor-pointer">
                    <Image
                      src="/images/navbar/editorial.jpg"
                      alt="Editorial Collection Showcase"
                      fill
                      sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 33vw, 400px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      priority
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

                    <div className="absolute bottom-6 left-6 text-white">
                      <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-200">
                        Editorial
                      </p>

                      <h3 className="mt-2 font-[var(--font-playfair)] text-2xl tracking-wide">
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
            transition={{ duration: 0.3 }}
            onMouseEnter={() => setActiveDropdown(null)}
            className="fixed inset-0 top-20 z-40 bg-white/30 backdrop-blur-sm"
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
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-md"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-0 top-0 z-50 h-screen w-80 bg-white p-8 shadow-2xl"
            >
              <div className="mb-12 flex justify-end">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-neutral-500 transition-colors hover:text-black"
                >
                  <X strokeWidth={1.5} size={26} />
                </button>
              </div>

              <nav className="space-y-8">

                {navItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="block text-xl tracking-wide text-neutral-900 transition-colors hover:text-neutral-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}

                <div className="h-px w-full bg-neutral-100" />

                <button
                  className="block w-full text-left text-lg tracking-wide text-neutral-600 transition-colors hover:text-black"
                  onClick={() => {
                    setMobileMenuOpen(false);

                    requireAuth(() =>
                      router.push("/customer/wishlist")
                    );
                  }}
                >
                  Wishlist
                </button>

                <button
                  className="block w-full text-left text-lg tracking-wide text-neutral-600 transition-colors hover:text-black"
                  onClick={() => {
                    setMobileMenuOpen(false);

                    requireAuth(() =>
                      router.push("/customer/cart")
                    );
                  }}
                >
                  Cart
                </button>

                {isAuthenticated ? (
                  <>
                    <Link
                      href="/customer/profile"
                      className="block text-lg tracking-wide text-neutral-600 transition-colors hover:text-black"
                      onClick={() =>
                        setMobileMenuOpen(false)
                      }
                    >
                      Profile
                    </Link>

                    {/* Mobile Admin */}

                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="block text-lg font-medium tracking-wide text-neutral-900 transition-colors hover:text-neutral-500"
                        onClick={() =>
                          setMobileMenuOpen(false)
                        }
                      >
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      className="block w-full pt-4 text-left text-sm uppercase tracking-[0.2em] text-neutral-400 transition-colors hover:text-black"
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
                    className="block w-full text-left text-lg tracking-wide text-neutral-900 transition-colors hover:text-neutral-500"
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