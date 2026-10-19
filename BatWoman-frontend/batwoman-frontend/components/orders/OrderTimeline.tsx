import OrderStatusBadge from "./OrderStatusBadge";

interface Props {
  status: string;
  createdAt?: string;
}

export default function OrderTimeline({ status }: Props) {

  const steps = [
    { key: "ORDERED", label: "Order Placed" },
    { key: "PAID", label: "Payment Confirmed" },
    { key: "SHIPPED", label: "Dispatched" },
    { key: "DELIVERED", label: "Delivered" },
  ];

  const statusOrder: Record<string, number> = {
    PENDING: 1,
    PAID: 2,
    SHIPPED: 3,
    DELIVERED: 4,
    CANCELLED: 0,
  };

  const currentStep = statusOrder[status] || 1;

  return (
    <div className="bg-white border border-[#e7e1d8] p-6 sm:p-8 shadow-[0_4px_25px_rgba(45,31,26,0.03)] rounded-none">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-[#eee8e0] gap-4">
        <div>
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#8C6D4F] font-semibold block mb-0.5">
            Status Overview
          </span>
          <h2 className="font-[var(--font-playfair)] text-xl sm:text-2xl font-normal text-neutral-900">
            Current Order Status
          </h2>
        </div>

        <OrderStatusBadge status={status} />
      </div>

      {/* Progress Steps (if not cancelled) */}
      {status !== "CANCELLED" ? (
        <div className="pt-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {steps.map((step, idx) => {
              const isCompleted = idx + 1 <= currentStep;
              const isCurrent = idx + 1 === currentStep;

              return (
                <div key={step.key} className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`
                        h-2 w-full rounded-none transition-colors
                        ${isCompleted ? "bg-black" : "bg-[#eee8e0]"}
                      `}
                    />
                  </div>
                  <span
                    className={`
                      text-[10px] uppercase tracking-[0.16em]
                      ${
                        isCurrent
                          ? "font-semibold text-black"
                          : isCompleted
                          ? "text-neutral-700 font-medium"
                          : "text-neutral-400 font-light"
                      }
                    `}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="pt-4">
          <p className="text-xs text-[#9c382f] tracking-wide">
            This order has been cancelled.
          </p>
        </div>
      )}
    </div>
  );
}