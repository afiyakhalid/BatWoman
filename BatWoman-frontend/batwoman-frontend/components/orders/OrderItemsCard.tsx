import { OrderItem } from "@/types/order";

interface Props {
    items: OrderItem[];
}

export default function OrderItemsCard({
                                           items,
                                       }: Props) {
    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-8">

            <h2 className="mb-8 font-[var(--font-playfair)] text-3xl">
                Order Items
            </h2>

            <div className="space-y-6">

                {items.map((item) => (

                    <div
                        key={item.productId}
                        className="flex items-center justify-between border-b pb-5"
                    >

                        <div>

                            <h3 className="font-semibold text-lg">
                                {item.productName}
                            </h3>

                            <p className="text-sm text-neutral-500">
                                Quantity: {item.quantity}
                            </p>

                            <p className="text-sm text-neutral-500">
                                Unit Price: ₹{item.unitPrice}
                            </p>

                        </div>

                        <div className="text-right">

                            <p className="text-xl font-semibold">
                                ₹{item.totalPrice}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}