import React, { useState } from "react";

export interface DebateCaseCardProps {
  title: string;
  principle: string;
  myth: string;
  fact: string;
  rebuttal: string;
  fastFact: string;
  tpusaTieIn: string;
}

export default function DebateCaseCard({
  title,
  principle,
  myth,
  fact,
  rebuttal,
  fastFact,
  tpusaTieIn,
}: DebateCaseCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-64 h-80 cursor-pointer perspective transition-transform duration-300 hover:scale-105"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* FRONT */}
        <div className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center bg-yellow-100 border-4 border-yellow-700 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
          <p className="text-center text-sm">Click to explore this debate case</p>
        </div>

        {/* BACK */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-[#fdf8f0] border-4 border-gray-400 rounded-lg shadow-lg p-4 overflow-y-auto">
          <h3 className="text-xl font-bold text-center mb-4">{title}</h3>

          {/* Core Principle */}
          <div className="mb-4 p-3 rounded-lg bg-yellow-100 border-l-4 border-yellow-600">
            <h4 className="font-semibold text-lg">Core Principle</h4>
            <p className="text-sm">{principle}</p>
          </div>

          {/* The Left's Claim */}
          <div className="mb-4 p-3 rounded-lg bg-red-100 border-l-4 border-red-600">
            <h4 className="font-semibold text-lg text-red-700">The Left's Claim</h4>
            <p className="text-sm italic">{myth}</p>
          </div>

          {/* Fact */}
          <div className="mb-4 p-3 rounded-lg bg-green-100 border-l-4 border-green-600">
            <h4 className="font-semibold text-lg text-green-700">Fact</h4>
            <p className="text-sm">{fact}</p>
          </div>

          {/* Rebuttal Script */}
          <div className="mb-4 p-3 rounded-lg bg-blue-100 border-l-4 border-blue-600">
            <h4 className="font-semibold text-lg text-blue-700">Rebuttal Script</h4>
            <p className="text-sm">"{rebuttal}"</p>
          </div>

          {/* Fast Fact */}
          <div className="mb-4 p-3 rounded-lg bg-purple-100 border-l-4 border-purple-600">
            <h4 className="font-semibold text-lg text-purple-700">Fast Fact</h4>
            <p className="text-sm">{fastFact}</p>
          </div>

          {/* TPUSA Tie-In */}
          <div className="mb-4 p-3 rounded-lg bg-gray-100">
            <h4 className="font-semibold text-lg">TPUSA Tie-In</h4>
            <p className="text-sm">{tpusaTieIn}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
