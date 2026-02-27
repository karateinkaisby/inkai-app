"use client";

import { motion } from "framer-motion";

type ModeVariant = "users" | "menu" | "database";

const VARIANT_STYLES: Record<
  ModeVariant,
  {
    active: string;
    inactive: string;
    indicator: string;
    glow: string;
  }
> = {
  users: {
    active: "bg-emerald-600 border-emerald-500",
    inactive: "bg-white/5 border-white/10 hover:bg-white/10",
    indicator: "bg-emerald-200",
    glow: "shadow-emerald-500/30",
  },
  menu: {
    active: "bg-cyan-600 border-cyan-500",
    inactive: "bg-white/5 border-white/10 hover:bg-white/10",
    indicator: "bg-cyan-200",
    glow: "shadow-cyan-500/30",
  },
  database: {
    active: "bg-violet-600 border-violet-500",
    inactive: "bg-white/5 border-white/10 hover:bg-white/10",
    indicator: "bg-violet-200",
    glow: "shadow-violet-500/30",
  },
};

interface ModeButtonProps {
  active: boolean;
  variant: ModeVariant;
  title: string;
  subtitle?: string;
  onClick: () => void;
}

export function ModeButton({
  active,
  variant,
  title,
  subtitle,
  onClick,
}: ModeButtonProps) {
  const v = VARIANT_STYLES[variant];

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      animate={{ scale: active ? 1.05 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className={[
        "relative px-5 py-2 rounded-full text-left border transition-all",
        active ? `${v.active} shadow-lg ${v.glow}` : v.inactive,
      ].join(" ")}
    >
      <div
        className={[
          "font-semibold tracking-wide text-sm",
          active ? "text-white" : "text-white/70",
        ].join(" ")}
      >
        {title}
      </div>

      {subtitle && (
        <div
          className={[
            "text-[11px] leading-tight",
            active ? "text-white/90" : "text-white/40",
          ].join(" ")}
        >
          {subtitle}
        </div>
      )}

      {active && (
        <motion.span
          layoutId="mode-indicator"
          className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full ${v.indicator}`}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        />
      )}
    </motion.button>
  );
}
