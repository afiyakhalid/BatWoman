
"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { menuData } from "./menuData";

interface Props {
  active: string | null;
  close: () => void;
}

export default function MegaMenu({
  active,
  close,
}: Props) {
  return (
    <AnimatePresence>

      {active && (
        <>

          {/* Blur Overlay */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseEnter={close}
            className="fixed inset-0 top-20 z-30 backdrop-blur-md bg-white/20"
          />

          {/* Menu */}

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: .2 }}
            className="absolute left-0 top-20 z-40 w-full border-b bg-white"
          >
            <div className="mx-auto flex max-w-7xl gap-24 px-6 py-12">

              <div>

                <p className="mb-6 text-sm uppercase tracking-[0.35em] text-neutral-500">
                  {active}
                </p>

                <div className="space-y-5">

                  {menuData[active as keyof typeof menuData].map((item) => (

                    <Link
                      key={item}
                      href="#"
                      className="block text-3xl font-[var(--font-playfair)] transition hover:translate-x-2"
                    >
                      {item}
                    </Link>

                  ))}

                </div>

              </div>

            </div>

          </motion.div>

        </>
      )}

    </AnimatePresence>
  );
}