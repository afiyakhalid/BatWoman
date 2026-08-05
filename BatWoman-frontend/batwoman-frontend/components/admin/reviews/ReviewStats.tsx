interface Props {

    totalReviews: number;

    averageRating: number;

    productsReviewed: number;

}

export default function ReviewStats({

                                        totalReviews,

                                        averageRating,

                                        productsReviewed,

                                    }: Props) {

    return (

        <div className="grid gap-6 md:grid-cols-3">

            <div className="rounded-xl border bg-white p-8">

                <p className="text-neutral-500">

                    Total Reviews

                </p>

                <h2 className="mt-4 text-5xl font-semibold">

                    {totalReviews}

                </h2>

            </div>

            <div className="rounded-xl border bg-white p-8">

                <p className="text-neutral-500">

                    Average Rating

                </p>

                <h2 className="mt-4 text-5xl font-semibold">

                    {averageRating.toFixed(1)}

                </h2>

            </div>

            <div className="rounded-xl border bg-white p-8">

                <p className="text-neutral-500">

                    Products Reviewed

                </p>

                <h2 className="mt-4 text-5xl font-semibold">

                    {productsReviewed}

                </h2>

            </div>

        </div>

    );

}