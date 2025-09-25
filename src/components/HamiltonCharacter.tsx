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
      const timer = setTimeout(() => setPose("idle"), 2000); // 2 seconds
      return () => clearTimeout(timer);
    }
  }, [intro]);

  return (
    <img
      src={`/images/Characters/Hamilton/hamilton_${pose}.png`}
      alt="Hamilton character"
      className={`absolute bottom-[-10px] right-[-30px] ${size} h-auto drop-shadow-lg transition-all duration-500`}
    />
  );
}
