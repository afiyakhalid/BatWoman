"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { useProduct } from "@/hooks/useProduct";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import Footer from "@/components/layout/Footer/Footer";

export default function ProductDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: product, isLoading, isError } = useProduct(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-24 text-xs uppercase tracking-[0.25em] text-neutral-400">
        Loading Garment...
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-24 space-y-4">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
          Garment Not Found
        </p>
        <Link
          href="/customer/products"
          className="border-b border-black pb-1 text-xs uppercase tracking-[0.2em] font-medium text-black hover:text-neutral-500 hover:border-neutral-500 transition"
        >
          Return to Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* KHAITE-STYLE EXPANSIVE PRODUCT VIEW */}
      <section className="mx-auto max-w-[1760px] px-4 sm:px-8 lg:px-12 pt-6 sm:pt-10 pb-24">
        {/* Subtle Back Link */}
        <div className="pb-6 sm:pb-8">
          <Link
            href="/customer/products"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-neutral-400 hover:text-black transition"
          >
            <ArrowLeft size={12} strokeWidth={1.5} />
            <span>Ready-To-Wear</span>
          </Link>
        </div>

        {/* 2-COLUMN LUXURY SHOWCASE: EXPANSIVE MEDIA ON LEFT, PINNED INFO ON RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] xl:grid-cols-[1.25fr_0.75fr] gap-10 sm:gap-14 xl:gap-24 items-start">
          <ProductGallery media={product.media} />
          <ProductInfo product={product} />
        </div>
      </section>

      <Footer />
    </div>
  );
}