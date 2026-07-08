"use client";

import ProductCard from "./ProductCard";
import { useProducts } from "@/hooks/useProducts";

export default function ProductGrid() {

  const {
    data: products,
    isLoading,
    isError,
  } = useProducts();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Unable to load products.</p>;
  }

  return (
    <section className="flex-1">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}