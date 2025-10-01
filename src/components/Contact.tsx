// Contact.tsx
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Contact() {
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
      <div className="w-full max-w-4xl mt-[100px]">
        <button
          onClick={() => navigate("/")}
          className="text-xl font-constitution font-bold text-[#0f0800] hover:text-red-700 -mt-[75px]"
        >
          ← Home
        </button>

        <h1 className="text-4xl sm:text-5xl font-constitution font-bold text-center mt-[20px] mb-2">
          Contact Us
        </h1>

        {/* Contact form */}
        <form className="space-y-2 max-w-2xl mx-auto mt-0">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border rounded bg-white/90 text-black"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded bg-white/90 text-black"
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-3 border rounded h-32 bg-white/90 text-black"
          />
          <div className="flex justify-between items-center mt-[-20px]">
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded hover:bg-yellow-600"
            >
              Send
            </button>
            <a
              href="https://x.com/tpusasmcc"
              target="_blank"
              className="text-blue-800 hover:underline"
            >
              Follow us on X
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
