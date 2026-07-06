export interface Category {
  id: number;
  title: string;
  description: string;
  image: string;
  href: string;
}

export const featuredCategories: Category[] = [
  {
    id: 1,
    title: "Luxury",
    description: "Premium handcrafted abayas",
    image: "/images/categories/luxury.jpg",
    href: "/categories/luxury",
  },
  {
    id: 2,
    title: "Casual",
    description: "Everyday comfort with elegance",
    image: "/images/categories/casual.jpg",
    href: "/categories/casual",
  },
  {
    id: 3,
    title: "Party Wear",
    description: "Designed for special occasions",
    image: "/images/categories/party.jpg",
    href: "/categories/party",
  },
  {
    id: 4,
    title: "New Collection",
    description: "Latest arrivals of the season",
    image: "/images/categories/new.jpg",
    href: "/categories/new",
  },
];