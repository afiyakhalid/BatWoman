"use client";

import { useParams } from "next/navigation";

import { useProduct } from "@/hooks/useProduct";

import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";

import Footer from "@/components/layout/Footer/Footer";

export default function ProductDetailsPage() {

    const params = useParams();

    const slug = params.slug as string;

    const {
        data: product,
        isLoading,
        isError,
    } = useProduct(slug);

    if (isLoading) {
        return (
            <div className="pt-40 text-center">
                Loading product...
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="pt-40 text-center">
                Product not found.
            </div>
        );
    }

    return (

        <>
            <section className="mx-auto max-w-7xl px-6 pt-36 pb-24">

                <div className="grid gap-16 lg:grid-cols-2">

                    <ProductGallery
                        images={product.images}
                    />

                    <ProductInfo
                        product={product}
                    />

                </div>

            </section>

            <Footer />

        </>

    );

}