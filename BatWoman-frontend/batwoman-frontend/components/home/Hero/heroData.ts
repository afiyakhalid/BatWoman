export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Timeless Elegance",
    subtitle:
      "Discover luxury abayas crafted with premium fabrics for women who appreciate sophistication and timeless style.",
    image: "/images/hero/hero-1.jpg",
    buttonText: "Shop Collection",
    buttonLink: "/products",
  },
  {
    id: 2,
    title: "Minimal Luxury",
    subtitle:
      "Designed with refined silhouettes and effortless elegance for every occasion.",
    image: "/images/hero/hero-2.jpg",
    buttonText: "Explore Now",
    buttonLink: "/products",
  },
  {
    id: 3,
    title: "New Collection",
    subtitle:
      "Modern designs inspired by timeless fashion and handcrafted details.",
    image: "/images/hero/hero-3.jpg",
    buttonText: "View Collection",
    buttonLink: "/products",
  },
];