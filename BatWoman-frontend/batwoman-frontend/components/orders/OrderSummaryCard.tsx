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
    <div className="bg-white border border-[#e7e1d8] p-6 sm:p-8 shadow-[0_4px_25px_rgba(45,31,26,0.03)] rounded-none">
      <h2 className="mb-6 font-[var(--font-playfair)] text-2xl sm:text-3xl font-normal text-neutral-900">
        Order Summary
      </h2>

      <div className="space-y-4 text-xs">
        <div className="flex justify-between items-center">
          <span className="uppercase tracking-[0.16em] text-neutral-500">Subtotal</span>
          <span className="font-medium text-neutral-900">₹{subtotal.toLocaleString("en-IN")}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="uppercase tracking-[0.16em] text-neutral-500">Shipping</span>
          <span className="font-medium text-neutral-900">
            {shipping === 0 ? "FREE" : `₹${shipping.toLocaleString("en-IN")}`}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="uppercase tracking-[0.16em] text-neutral-500">Discount</span>
          <span className="font-medium text-neutral-900">
            {discount === 0 ? "-" : `₹${discount.toLocaleString("en-IN")}`}
          </span>
        </div>

        <div className="border-t border-[#e7e1d8] pt-4 mt-4 flex justify-between items-center">
          <span className="text-xs uppercase tracking-[0.18em] font-medium text-neutral-900">Total</span>
          <span className="font-[var(--font-playfair)] text-2xl font-normal text-neutral-900">
            ₹{total.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </div>
  );
}