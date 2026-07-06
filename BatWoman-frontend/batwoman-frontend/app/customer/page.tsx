import Hero from "@/components/home/Hero/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories/FeaturedCategories";
import PromotionalBanner from "@/components/home/PromotionalBanner/Promotional";
import Footer from "@/components/layout/Footer/Footer";


export default function Home() {
  return (
    <>
      <Hero />

      <FeaturedCategories />

      <PromotionalBanner />
        <Footer />
    </>
  );
}