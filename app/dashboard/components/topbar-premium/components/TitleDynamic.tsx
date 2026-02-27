"use client";

import { motion } from "framer-motion";

export default function TitleDynamic({ title }: { title: string }) {
  return (
    <motion.h2
      key={title}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="
        text-xl font-semibold text-cyan-200
        drop-shadow-[0_0_6px_rgba(0,255,255,0.5)]
      "
    >
      {title}
    </motion.h2>
  );
}
