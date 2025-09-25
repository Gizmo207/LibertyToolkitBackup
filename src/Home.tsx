// Home.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Mission from "./components/Mission";
import Tools from "./components/Tools";
import Quote from "./components/Quote";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/tools") {
      const el = document.getElementById("tools");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.pathname]);

  return (
    <div
      className="w-screen min-h-screen bg-black bg-top bg-cover overflow-y-auto"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <Header />

      <main
        className="
          w-full
          max-w-4xl mx-auto
          px-4 sm:px-6 md:px-8 lg:px-16
          pt-[50px] sm:pt-[100px] md:pt-[150px] lg:pt-[200px]
          text-center text-[#2a1b00]
        "
      >
        <Hero />

        <Quote
          text="Knowledge will forever govern ignorance; and a people who mean to be their own governors must arm themselves with the power which knowledge gives."
          author="James Madison"
        />

        <div className="mt-[0px] sm:mt-[0px] md:mt-[0px]">
          <Mission />
        </div>

        <Quote
          text="Liberty means responsibility. That is why most men dread it."
          author="George Bernard Shaw"
        />

        <div id="tools" className="mt-[0px] sm:mt-[0px] md:mt-[0px]">
          <Tools />
        </div>
      </main>

      <footer className="text-center py-6 text-sm sm:text-base text-white">
        2025 Liberty Toolkit
      </footer>
    </div>
  );
}
