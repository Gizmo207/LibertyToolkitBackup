import React from "react";

export default function Parchment({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[600px] mx-auto">
      {/* Top */}
      <div
        className="h-[120px] bg-no-repeat bg-top bg-center"
        style={{ backgroundImage: "url('/parchment-top.png')" }}
      />

      {/* Middle (repeats vertically) */}
      <div
        className="bg-repeat-y bg-top bg-center p-10 font-serif text-[#2a1b00]"
        style={{ backgroundImage: "url('/parchment-middle.png')" }}
      >
        {children}
      </div>

      {/* Bottom */}
      <div
        className="h-[120px] bg-no-repeat bg-bottom bg-center"
        style={{ backgroundImage: "url('/parchment-bottom.png')" }}
      />
    </div>
  );
}
