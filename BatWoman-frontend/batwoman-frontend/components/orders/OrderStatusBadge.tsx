interface Props {
  status: string;
}

export default function OrderStatusBadge({ status }: Props) {
  const styles: Record<string, string> = {
    PENDING:
      "bg-[#fcf8f2] text-[#8a6b29] border-[#e8ddc7]",
    PAID:
      "bg-[#f4f7f4] text-[#2d5a27] border-[#d2e3d0]",
    SHIPPED:
      "bg-[#f3f5f8] text-[#334e68] border-[#cfd7e2]",
    DELIVERED:
      "bg-black text-white border-black",
    CANCELLED:
      "bg-[#fdf3f2] text-[#9c382f] border-[#f0cfcc]",
  };

  const currentStyle =
    styles[status] || "bg-[#faf8f5] text-neutral-700 border-neutral-300";

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-medium border rounded-none select-none
        ${currentStyle}
      `}
    >
      {status}
    </span>
  );
}