import OrderStatusBadge from "./OrderStatusBadge";

interface Props {

    status: string;

    createdAt: string;

}

export default function OrderTimeline({

                                          status,

                                          createdAt,

                                      }: Props) {

    return (

        <div className="rounded-xl border border-neutral-200 bg-white p-8">

            <h2 className="mb-8 font-[var(--font-playfair)] text-3xl">

                Order Status

            </h2>

            <div className="space-y-6">

                <div className="flex items-center justify-between">

                    <span>Status</span>

                    <OrderStatusBadge status={status} />

                </div>

                <div className="flex items-center justify-between">

                    <span>Placed On</span>

                    <span>

                        {

                            new Date(

                                createdAt

                            ).toLocaleString()

                        }

                    </span>

                </div>

            </div>

        </div>

    );

}