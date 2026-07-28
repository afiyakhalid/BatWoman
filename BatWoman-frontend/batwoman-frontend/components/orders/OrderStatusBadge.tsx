interface Props {

    status: string;

}

export default function OrderStatusBadge({

                                             status,

                                         }: Props) {

    const styles = {

        PENDING:

            "bg-yellow-100 text-yellow-700",

        PAID:

            "bg-green-100 text-green-700",

        SHIPPED:

            "bg-blue-100 text-blue-700",

        DELIVERED:

            "bg-emerald-100 text-emerald-700",

        CANCELLED:

            "bg-red-100 text-red-700",

    };

    return (

        <span

            className={`

                rounded-full

                px-4

                py-1

                text-sm

                font-medium

                ${styles[status as keyof typeof styles]}

            `}

        >

            {status}

        </span>

    );

}