// About.tsx
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function About() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-start p-10 text-[#2a1b00]"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundRepeat: "repeat-y",
        backgroundSize: "cover",
        backgroundPosition: "center -60px",
        boxShadow:
          "inset 0 0 60px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.8)",
      }}
    >
      <div className="w-full max-w-4xl mt-[80px]">
        <div className="flex items-center justify-between mb-8 pt-[25px]">
          <button
            onClick={() => navigate("/")}
            className="text-xl font-constitution font-bold text-[#0f0800] hover:text-red-700 pt-[50px]"
          >
            ← Home
          </button>
          <h1 className="text-4xl sm:text-5xl font-constitution font-bold text-center">About Us</h1>
          <div className="w-16"></div> {/* Spacer for centering */}
        </div>
        <p className="text-lg sm:text-xl leading-relaxed font-serif pt-[25px] mt-[-50px]">
        Liberty Toolkit is a cutting-edge initiative developed by TPUSA SMCC to ensure our members and conservative students nationwide are always battle-ready for ideological debates. As president of our SMCC chapter, I created this resource because every TPUSA member deserves to be equipped with razor-sharp arguments and rock-solid evidence to defend our values at a moment's notice.
Whether you're facing a hostile professor, debating peers in the student union, or engaging in campus activism, Liberty Toolkit gives you the intellectual ammunition you need to win hearts and minds for liberty. This isn't just about knowing conservative talking points—it's about mastering the art of persuasive argumentation that advances our movement.
We believe every interaction is an opportunity to spread the message of free markets, limited government, and individual liberty. Liberty Toolkit ensures you never walk into a debate unprepared, because the future of American freedom depends on articulate, confident conservative voices ready to engage anywhere, anytime.
        </p>
        <div className="text-center pt-[20px] pb-[20px] font-constitution font-bold text-xl text-[#0f0800]">
          “Never give up, never surrender, and always go for the win.” — Charlie Kirk
        </div>
      </div>
    </div>
  );
}
