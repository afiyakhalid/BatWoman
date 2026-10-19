"use client";

import { useRouter } from "next/navigation";
import { Package, Heart, MapPin, LogOut, ChevronRight } from "lucide-react";

interface Props {
  onLogout: () => void;
}

export default function AccountMenu({ onLogout }: Props) {
  const router = useRouter();

  const menuItems = [
    {
      label: "My Orders",
      icon: Package,
      path: "/customer/orders",
      description: "Order status & archive",
    },
    {
      label: "Wishlist",
      icon: Heart,
      path: "/customer/wishlist",
      description: "Saved abayas",
    },
    {
      label: "Addresses",
      icon: MapPin,
      path: "/customer/address",
      description: "Delivery locations",
    },
  ];

  return (
    <div className="bg-white border border-[#e7e1d8] p-6 sm:p-8 shadow-[0_4px_25px_rgba(45,31,26,0.03)] rounded-none">
      <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D4F] font-semibold block mb-1">
        Navigation
      </span>
      <h2 className="mb-6 font-[var(--font-playfair)] text-xl sm:text-2xl font-normal text-neutral-900">
        Account Directory
      </h2>

      <div className="divide-y divide-[#eee8e0]">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              type="button"
              onClick={() => router.push(item.path)}
              className="group flex w-full items-center justify-between py-4 text-left transition-all duration-200 hover:pl-1.5"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#faf8f5] border border-[#e7e1d8] text-neutral-600 transition group-hover:border-black group-hover:text-black">
                  <Icon size={14} strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] font-medium text-neutral-900">
                    {item.label}
                  </p>
                  <p className="text-[10px] text-neutral-400 tracking-wide mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
              <ChevronRight
                size={14}
                className="text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-black"
              />
            </button>
          );
        })}

        {/* LOGOUT ROW */}
        <button
          type="button"
          onClick={onLogout}
          className="group flex w-full items-center justify-between pt-5 pb-2 text-left transition-all duration-200 hover:pl-1.5"
        >
          <div className="flex items-center gap-3.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fdf3f2] border border-[#f0cfcc] text-[#9c382f]">
              <LogOut size={14} strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] font-medium text-[#9c382f]">
                Sign Out
              </p>
              <p className="text-[10px] text-neutral-400 tracking-wide mt-0.5">
                End current session
              </p>
            </div>
          </div>
          <ChevronRight
            size={14}
            className="text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-[#9c382f]"
          />
        </button>
      </div>
    </div>
  );
}