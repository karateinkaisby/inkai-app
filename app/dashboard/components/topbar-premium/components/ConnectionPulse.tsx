"use client";

import { motion } from "framer-motion";
import useConnectionStatus from "../hooks/useConnectionStatus";

export default function ConnectionPulse() {
  const { isConnected } = useConnectionStatus();

  return (
    <motion.div
      animate={{
        scale: isConnected ? [1, 1.2, 1] : [1, 1, 1],
        opacity: isConnected ? 1 : 0.4,
      }}
      transition={{
        duration: isConnected ? 1.5 : 0.3,
        repeat: Infinity,
      }}
      className="
        h-3 w-3 rounded-full
        shadow-[0_0_12px_rgba(0,255,255,0.7)]
        border border-cyan-500/50
      "
      style={{
        backgroundColor: isConnected ? "#22d3ee" : "#c50000",
      }}
    />
  );
}
