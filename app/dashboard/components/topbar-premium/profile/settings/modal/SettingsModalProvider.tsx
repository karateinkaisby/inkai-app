"use client";

import { AnimatePresence } from "framer-motion";
import SettingsModal from "./SettingsModal";
import useSettingsModal from "../state/useSettingsModal";

export default function SettingsModalProvider() {
  const { isOpen } = useSettingsModal();

  return <AnimatePresence>{isOpen && <SettingsModal />}</AnimatePresence>;
}
