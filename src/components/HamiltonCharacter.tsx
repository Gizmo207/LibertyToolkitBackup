import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface HamiltonCharacterProps {
  intro?: boolean;   // Should Hamilton wave first, then idle?
  size?: string;     // Tailwind size class, e.g. "w-56"
  onAnimationComplete?: () => void; // Callback when wave animation is ready
  transitionToIdle?: () => void; // Function to trigger idle transition
}

export default function HamiltonCharacter({
  intro = true,
  size = "w-56",
  onAnimationComplete,
  transitionToIdle,
}: HamiltonCharacterProps) {
  const [pose, setPose] = useState(intro ? "wave" : "idle");

  useEffect(() => {
    if (intro) {
      // Small delay to let character fully load into wave pose
      const timer = setTimeout(() => {
        onAnimationComplete?.(); // Signal that wave pose is ready
      }, 400); // Reduced from 800ms - start audio sooner
      return () => clearTimeout(timer);
    }
  }, [intro, onAnimationComplete]);

  const handleTransitionToIdle = () => {
    setPose("idle");
    transitionToIdle?.(); // Call the parent's transition function
  };

  // Expose the transition function to parent via global reference
  useEffect(() => {
    (window as any).hamiltonTransitionToIdle = handleTransitionToIdle;
    return () => {
      delete (window as any).hamiltonTransitionToIdle;
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.img
        key={pose} // triggers animation on pose change
        src={`/images/Characters/Hamilton/hamilton_${pose}.png`}
        alt="Hamilton character"
        className={`absolute bottom-[-10px] right-[-30px] ${size} h-auto drop-shadow-lg z-50`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }} // crossfade timing
      />
    </AnimatePresence>
  );
}
