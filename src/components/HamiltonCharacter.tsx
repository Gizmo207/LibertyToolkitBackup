import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface HamiltonCharacterProps {
  intro?: boolean;   // Should Hamilton wave first, then idle?
  size?: string;     // Tailwind size class, e.g. "w-56"
}

export default function HamiltonCharacter({
  intro = true,
  size = "w-56",
}: HamiltonCharacterProps) {
  const [pose, setPose] = useState(intro ? "wave" : "idle");

  useEffect(() => {
    if (intro) {
      const timer = setTimeout(() => setPose("idle"), 2000);
      return () => clearTimeout(timer);
    }
  }, [intro]);

  return (
    <AnimatePresence mode="wait">
      <motion.img
        key={pose} // 👈 triggers animation on pose change
        src={`/images/Characters/Hamilton/hamilton_${pose}.png`}
        alt="Hamilton character"
        className={`absolute bottom-[-10px] right-[-30px] ${size} h-auto drop-shadow-lg`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5, ease: "easeInOut" }} // smooth crossfade with subtle slide
      />
    </AnimatePresence>
  );
}
