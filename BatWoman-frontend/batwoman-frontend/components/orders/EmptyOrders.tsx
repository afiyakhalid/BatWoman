import Link from "next/link";

export default function EmptyOrders() {

    return (

        <div className="rounded-xl border border-dashed p-20 text-center">

            <h2 className="text-3xl font-semibold">

                No Orders Yet

            </h2>

            <p className="mt-4 text-neutral-500">

                Once you place an order, it will appear here.

            </p>

            <Link

                href="/products"

                className="mt-10 inline-block rounded-lg bg-black px-8 py-4 text-white"

            >

                Start Shopping

            </Link>

        </div>

    );

}