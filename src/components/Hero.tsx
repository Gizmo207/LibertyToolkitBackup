// src/components/Hero.tsx

export default function Hero() {
  return (
    <section className="text-center pt-0">
      <h1 className="font-constitution text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black drop-shadow-lg">
        Liberty Toolkit
      </h1>
      <p className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-black/90 font-serif max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
        Equip yourself with the knowledge and arguments to defend liberty, free
        markets, and limited government in today's toughest debates.
      </p>
      <button
        className="mt-6 px-[24px] py-[12px] bg-red-700 text-white font-bold rounded-md shadow-lg hover:bg-red-800 transition"
        onClick={() => {
          const toolsSection = document.getElementById("tools");
          if (toolsSection) {
            toolsSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        Explore Tools
      </button>
    </section>
  );
}
