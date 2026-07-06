"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  {
    title: "Collections",
    href: "/collections",
  },
  {
    title: "Categories",
    href: "/categories",
  },
  {
    title: "Shop",
    href: "/products",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-neutral-200"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* LEFT */}

          <div className="flex items-center">

            <button
              className="lg:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu size={25} />
            </button>

            <nav className="hidden lg:flex items-center gap-8 text-sm tracking-wide">

              {navItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="transition hover:text-neutral-500"
                >
                  {item.title}
                </Link>
              ))}

            </nav>

          </div>

          {/* CENTER */}

          <Link
            href="/"
            className="font-[var(--font-playfair)] text-3xl tracking-[0.35em]"
          >
            BATWOMAN
          </Link>

          {/* RIGHT */}

          <div className="flex items-center gap-5">

            <Link href="/search">
              <Search
                size={20}
                className="transition hover:scale-110"
              />
            </Link>

            <Link
              href="/wishlist"
              className="hidden md:block"
            >
              <Heart
                size={20}
                className="transition hover:scale-110"
              />
            </Link>

            <Link href="/cart">
              <ShoppingBag
                size={20}
                className="transition hover:scale-110"
              />
            </Link>

            <Link
              href="/profile"
              className="hidden md:block"
            >
              <User
                size={20}
                className="transition hover:scale-110"
              />
            </Link>

          </div>

        </div>
      </header>

      {/* MOBILE MENU */}

      <AnimatePresence>

        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-0 z-50 h-screen w-72 bg-white p-8"
            >
              <div className="mb-10 flex justify-end">

                <button onClick={() => setOpen(false)}>
                  <X />
                </button>

              </div>

              <nav className="flex flex-col gap-8 text-lg">

                {navItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}

                <Link
                  href="/wishlist"
                  onClick={() => setOpen(false)}
                >
                  Wishlist
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                >
                  Cart
                </Link>

                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                >
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