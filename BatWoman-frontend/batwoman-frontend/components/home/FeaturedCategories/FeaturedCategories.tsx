import CategoryCard from "./CategoryCard";
import { featuredCategories } from "./categoryData";

export default function FeaturedCategories() {
  return (
    <section className="bg-white py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <p className="uppercase tracking-[0.4em] text-neutral-500 text-sm">
            Collections
          </p>

          <h2 className="mt-4 font-[var(--font-playfair)] text-5xl">
            Shop By Category
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-neutral-600">
            Discover luxury abayas curated for every occasion,
            from timeless classics to modern contemporary styles.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2">

          {featuredCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}

        </div>

      </div>

    </section>
  );
}