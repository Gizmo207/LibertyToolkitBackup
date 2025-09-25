// Tools.tsx
import { useNavigate } from "react-router-dom";

export default function Tools() {
  const navigate = useNavigate();
  return (
    // Section to group all tool categories
    <section className="text-center px-[24px] py-4">
      
      
      {/* Section heading */}
      <h2 className="font-constitution text-2xl text-black font-bold mb-3">
        Debate Tools
      </h2>
      
      
      {/* Intro text */}
      <p className="text-base text-black mb-4 font-serif max-w-2xl mx-auto">
        Pick a category to explore debates. Select a topic like 
        <span className="font-semibold"> Free Speech</span> or 
        <span className="font-semibold"> Right to Privacy</span>.
      </p>
      
      
      {/* Category links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        
        {/* Individual Liberty link */}
        <div className="cursor-pointer hover:bg-white/50 p-3 rounded text-center">
          <button
            onClick={() => navigate("/tools/individual-liberty")}
            className="text-lg font-constitution font-bold text-red-900 hover:text-red-800 block"
          >
            Individual Liberty
          </button>
          <p className="text-sm text-black/70 mt-1">Explore rights like free speech, privacy, and freedom of religion.</p>
        </div>
        
        
        {/* Free Markets link */}
        <div className="cursor-pointer hover:bg-white/50 p-3 rounded text-center">
          <button
            onClick={() => navigate("/tools/free-markets")}
            className="text-lg font-constitution font-bold text-red-900 hover:text-red-800 block"
          >
            Free Markets
          </button>
          <p className="text-sm text-black/70 mt-1">Understand the value of capitalism, entrepreneurship, and choice.</p>
        </div>
        
        
        {/* Limited Government link */}
        <div className="cursor-pointer hover:bg-white/50 p-3 rounded text-center">
          <button
            onClick={() => navigate("/tools/limited-government")}
            className="text-lg font-constitution font-bold text-red-900 hover:text-red-800 block"
          >
            Limited Government
          </button>
          <p className="text-sm text-black/70 mt-1">Learn why checks and balances protect liberty from government overreach.</p>
        </div>
      </div>
    </section>
  );
}
