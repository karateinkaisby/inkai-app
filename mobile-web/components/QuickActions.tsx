import Link from "next/link";
import { MapPin, ShoppingBag, User } from "lucide-react";

export default function QuickActions() {
  const items = [
    {
      href: "/register",
      label: "Daftar Anggota",
      icon: User,
      className: "border-red-500/30 bg-gradient-to-br from-red-500/20 to-amber-500/10",
      iconClass: "text-white",
      muted: false,
    },
    {
      href: "/dojo",
      label: "Cari Dojo",
      icon: MapPin,
      className: "border-white/10 bg-white/[0.03]",
      iconClass: "text-amber-300",
      muted: true,
    },
    {
      href: "/store",
      label: "INKAI Store",
      icon: ShoppingBag,
      className: "border-white/10 bg-white/[0.03]",
      iconClass: "text-amber-300",
      muted: true,
    },
  ];

  return (
    <section className="grid grid-cols-3 gap-2 px-4 pt-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`glass-card flex flex-col items-center gap-2 px-2 py-4 text-center ${item.className}`}
          >
            <div className="rounded-xl bg-black/20 p-2.5">
              <Icon size={20} className={item.iconClass} strokeWidth={2.5} />
            </div>
            <span
              className={`text-[11px] font-bold leading-tight ${
                item.muted ? "text-white/55" : "text-white"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </section>
  );
}
