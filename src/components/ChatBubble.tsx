import React from "react";

interface ChatBubbleProps {
  text: string;
  visible?: boolean;
  position?: string; // Tailwind positioning classes, e.g. "bottom-48 right-40"
}

export default function ChatBubble({
  text,
  visible = true,
  position = "bottom-48 right-40",
}: ChatBubbleProps) {
  if (!visible) return null;

  return (
    <div
      className={`absolute ${position} max-w-xs p-4 text-black font-constitution text-lg`}
    >
      <div className="relative">
        {/* Bubble background */}
        <img
          src="/images/chatbubble.png"
          alt="Chat Bubble"
          className="w-full h-auto"
        />
        {/* Text overlay */}
        <p className="absolute inset-0 flex items-center justify-center p-3 text-center">
          {text}
        </p>
      </div>
    </div>
  );
}
