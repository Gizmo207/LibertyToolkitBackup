import React from "react";

interface ChatBubbleProps {
  text: string;
  visible?: boolean;
  position?: string; // Tailwind classes, e.g. "bottom-48 right-40"
}

export default function ChatBubble({
  text,
  visible = true,
  position = "bottom-48 right-40",
}: ChatBubbleProps) {
  if (!visible) return null;

  return (
    <div className={`absolute ${position} max-w-xs z-50`}>
      <div className="relative inline-block">
        {/* Bubble background */}
        <img
          src="/images/ChatBubble.png"
          alt="Chat Bubble"
          className="w-full h-auto"
        />
        {/* Text overlay */}
        <div className="absolute top-[40%] left-1/2 w-[85%] -translate-x-1/2 text-center text-black font-constitution text-lg leading-snug break-words">
          {text}
        </div>
      </div>
    </div>
  );
}
