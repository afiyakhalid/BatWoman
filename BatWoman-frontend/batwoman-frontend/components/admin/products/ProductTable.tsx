"use client";

import {
    Button,
} from "@/components/ui/button";

import {
    AdminProduct,
} from "@/types/admin-product";

interface ProductTableProps {

    products: AdminProduct[];

    onEdit: (
        product: AdminProduct
    ) => void;

    onDelete: (
        product: AdminProduct
    ) => void;

}

export default function ProductTable({

                                         products,

                                         onEdit,

                                         onDelete,

                                     }: ProductTableProps) {

    return (

        <div className="overflow-hidden rounded-xl border">

            <table className="w-full">

                <thead className="bg-muted">

                <tr>

                    <th className="p-4 text-left">
                        Image
                    </th>

                    <th className="p-4 text-left">
                        Product
                    </th>

                    <th className="p-4 text-left">
                        Category
                    </th>

                    <th className="p-4 text-left">
                        Price
                    </th>

                    <th className="p-4 text-left">
                        Status
                    </th>

                    <th className="p-4 text-right">
                        Actions
                    </th>

                </tr>

                </thead>

                <tbody>

                {products.map(
                    (product) => {

                        const primary =
                            product.media?.find(
                                (item) =>
                                    item.primaryMedia
                            )
                            ??
                            product.media?.[0];

                        return (

                            <tr
                                key={
                                    product.id
                                }
                                className="border-t"
                            >

                                <td className="p-4">

                                    <div className="
                                            h-20
                                            w-16
                                            overflow-hidden
                                            rounded
                                            bg-muted
                                        ">

                                        {primary?.mediaUrl && (

                                            <img
                                                src={
                                                    primary.mediaUrl
                                                }
                                                alt={
                                                    product.name
                                                }
                                                className="
                                                        h-full
                                                        w-full
                                                        object-cover
                                                    "
                                            />

                                        )}

                                    </div>

                                </td>

                                <td className="p-4">

                                    <p className="font-medium">
                                        {
                                            product.name
                                        }
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        {
                                            product.slug
                                        }
                                    </p>

                                </td>

                                <td className="p-4">

                                    {
                                        product
                                            .category
                                            ?.name
                                    }

                                </td>

                                <td className="p-4">

                                    ₹
                                    {
                                        product.discountPrice ??
                                        product.price
                                    }

                                </td>

                                <td className="p-4">

                                    <div className="flex flex-wrap gap-2">

                                        {product.active && (

                                            <span className="
                                                    rounded
                                                    bg-green-100
                                                    px-2
                                                    py-1
                                                    text-xs
                                                ">
                                                    Active
                                                </span>

                                        )}

                                        {product.featured && (

                                            <span className="
                                                    rounded
                                                    bg-blue-100
                                                    px-2
                                                    py-1
                                                    text-xs
                                                ">
                                                    Featured
                                                </span>

                                        )}

                                        {product.newArrival && (

                                            <span className="
                                                    rounded
                                                    bg-purple-100
                                                    px-2
                                                    py-1
                                                    text-xs
                                                ">
                                                    New
                                                </span>

                                        )}

                                    </div>

                                </td>

                                <td className="p-4">

                                    <div className="
                                            flex
                                            justify-end
                                            gap-2
                                        ">

                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                onEdit(
                                                    product
                                                )
                                            }
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="destructive"
                                            onClick={() =>
                                                onDelete(
                                                    product
                                                )
                                            }
                                        >
                                            Delete
                                        </Button>

                                    </div>

                                </td>

                            </tr>

                        );
                    }
                )}

                </tbody>

            </table>

        </div>

    );
}