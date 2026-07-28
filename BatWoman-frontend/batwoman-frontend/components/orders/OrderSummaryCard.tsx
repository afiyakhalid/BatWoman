interface Props {

    subtotal: number;

    shipping: number;

    discount?: number;

    total: number;

}

export default function OrderSummaryCard({

                                             subtotal,

                                             shipping,

                                             discount = 0,

                                             total,

                                         }: Props) {

    return (

        <div className="rounded-xl border border-neutral-200 bg-white p-8">

            <h2 className="mb-8 font-[var(--font-playfair)] text-3xl">

                Order Summary

            </h2>

            <div className="space-y-5">

                <div className="flex justify-between">

                    <span>Subtotal</span>

                    <span>₹{subtotal}</span>

                </div>

                <div className="flex justify-between">

                    <span>Shipping</span>

                    <span>

                        {shipping === 0 ? "FREE" : `₹${shipping}`}

                    </span>

                </div>

                <div className="flex justify-between">

                    <span>Discount</span>

                    <span>

                        {discount === 0 ? "-" : `₹${discount}`}

                    </span>

                </div>

                <div className="border-t pt-5 flex justify-between text-xl font-semibold">

                    <span>Total</span>

                    <span>₹{total}</span>

                </div>

            </div>

        </div>

    );

}