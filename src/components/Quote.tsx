// src/components/Quote.tsx

type QuoteProps = {
  text: string;   // the quote itself
  author: string; // who said it
};

export default function Quote({ text, author }: QuoteProps) {
  return (
    <blockquote className="text-center my-8 px-6">
      {/* Ornamental flourish above */}
      <div className="flex justify-center mb-4 text-red-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="20"
          viewBox="0 0 200 20"
          fill="none"
        >
          <path
            d="M10 10h60c10-10 20 10 30 0s20 10 30 0h60"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Quote text */}
      <p className="font-constitution italic text-base sm:text-lg md:text-xl lg:text-2xl text-black/90 max-w-3xl mx-auto">
        "{text}"
      </p>

      {/* Author */}
      <footer className="mt-4 text-sm sm:text-base md:text-lg text-black/70 font-bold">— {author}</footer>

      {/* Ornamental flourish below */}
      <div className="flex justify-center mt-4 text-red-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="20"
          viewBox="0 0 200 20"
          fill="none"
        >
          <path
            d="M10 10h60c10 10 20-10 30 0s20-10 30 0h60"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
    </blockquote>
  );
}
