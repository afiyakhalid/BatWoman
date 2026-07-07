import ProductHeader from "@/components/product/ProductHeader";
// import ProductSidebar from "@/components/product/ProductSidebar";
// import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer/Footer";

export default function ProductsPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-20">
        <ProductHeader />

        <div className="mt-12 flex gap-12">
          {/* <ProductSidebar />

          <ProductGrid /> */}
        </div>
      </section>

      <Footer />
    </>
  );
}