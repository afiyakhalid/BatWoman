"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb() {
  return (
    <nav className="flex items-center gap-2 text-sm text-neutral-500">
      <Link
        href="/"
        className="transition hover:text-black"
      >
        Home
      </Link>

      <ChevronRight size={14} />

      <span className="text-black">
        Shop
      </span>
    </nav>
  );
}