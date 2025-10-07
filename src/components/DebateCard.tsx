import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type DebateCardProps = {
  title: string;
  containers: { label: string; type: string; content: string }[];
  onClick?: () => void; // Optional external click handler
};

export default function DebateCard({ title, containers, onClick }: DebateCardProps) {
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();
  const { category } = useParams();

  const handleFlip = () => setFlipped(!flipped);

  const handleClick = () => {
    // When viewing subsection cards (category present), navigate without flipping
    if (category) {
      onClick?.();
      const subcategorySlug = title.toLowerCase().replace(/\s+/g, '-');
      navigate(`/tools/${category}/${subcategorySlug}`);
      return;
    }

    // Otherwise, allow local flip behavior
    handleFlip();
    onClick?.();
  };

  return (
    <div
      className="w-full max-w-xs sm:w-64 h-72 sm:h-80 cursor-pointer perspective transition-transform duration-300 hover:scale-105"
      onClick={handleClick}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front side */}
        <div className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center bg-yellow-100 border-4 border-yellow-700 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-center">Click to explore this debate topic</p>
        </div>

        {/* Back side */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-[#fdf8f0] border-4 border-gray-400 rounded-lg shadow-lg p-4 overflow-y-auto">
          <h3 className="text-xl font-bold text-center mb-4">{title}</h3>

          {containers.map((c, index) => (
            <div
              key={index}
              className={`mb-4 p-3 rounded-lg ${
                c.type === "core"
                  ? "bg-yellow-100 border-l-4 border-yellow-600"
                  : c.type === "myth"
                  ? "bg-red-100 border-l-4 border-red-600"
                  : c.type === "rebuttal"
                  ? "bg-blue-100 border-l-4 border-blue-600"
                  : c.type === "fact"
                  ? "bg-green-100 border-l-4 border-green-600"
                  : "bg-gray-100"
              }`}
            >
              <h4 className="font-semibold text-lg">{c.label}</h4>
              <p className="text-sm">{c.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
