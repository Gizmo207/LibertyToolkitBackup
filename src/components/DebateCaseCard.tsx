import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface DebateCaseCardProps {
  title: string;
  principle: string;
  myth: string;
  fact: string;
  rebuttal: string;
  fastFact: string;
  tpusaTieIn: string;
  image?: string;
  frontBackgroundImage?: string;
  corePrinciples?: {
    primaryPosition: string;
    talkingPoints: string[];
    whyItMatters: string;
  };
}

export default function DebateCaseCard({
  title,
  principle,
  myth,
  fact,
  rebuttal,
  fastFact,
  tpusaTieIn,
  image,
  frontBackgroundImage,
  corePrinciples,
}: DebateCaseCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSection, setModalSection] = useState<{
    title: string;
    content: string;
    type: string;
  } | null>(null);

  const openModal = (sectionTitle: string, content: string, type: string) => {
    setModalSection({ title: sectionTitle, content, type });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalSection(null);
  };

  const getSectionColor = (type: string) => {
    switch (type) {
      case 'principle': return 'bg-yellow-100 border-yellow-600 text-yellow-800';
      case 'myth': return 'bg-red-100 border-red-600 text-red-800';
      case 'fact': return 'bg-green-100 border-green-600 text-green-800';
      case 'rebuttal': return 'bg-blue-100 border-blue-600 text-blue-800';
      case 'fastfact': return 'bg-purple-100 border-purple-600 text-purple-800';
      case 'tiein': return 'bg-gray-100 border-gray-600 text-gray-800';
      default: return 'bg-gray-100 border-gray-600 text-gray-800';
    }
  };

  return (
    <>
      <div
        className="w-64 h-80 cursor-pointer perspective transition-transform duration-300 hover:scale-105 z-10"
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          {/* FRONT */}
          <div
            className="absolute w-full h-full backface-hidden flex flex-col justify-center items-center bg-yellow-100 border-4 border-yellow-700 rounded-lg shadow-lg p-6"
            style={frontBackgroundImage ? {
              backgroundImage: `url(${frontBackgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            } : {}}
          >
            {/* Semi-transparent overlay for better text readability */}
            {frontBackgroundImage && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
            )}

            {/* Content */}
            <div className="relative z-10 w-full h-full flex flex-col">
              {image && !frontBackgroundImage ? (
                <img
                  src={image}
                  alt={`${title} graphic`}
                  className="w-20 h-20 mb-4 mx-auto"
                />
              ) : null}

              {/* Title - moved down 50px */}
              <div className="flex-shrink-0 mb-4" style={{ marginTop: '50px' }}>
                <h2 className={`text-2xl font-bold text-center ${
                  frontBackgroundImage ? 'text-white' : ''
                }`}>{title}</h2>
              </div>

              {/* Spacer to push text down */}
              <div className="flex-grow"></div>

              {/* Principle text positioned at bottom */}
              <div className="flex-shrink-0 mt-20">
                <p className={`text-sm text-center ${
                  frontBackgroundImage ? 'text-white' : ''
                }`}>
                  {principle.length > 100
                    ? principle.substring(0, 100) + "..."
                    : principle}
                </p>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-[#fdf8f0] border-4 border-gray-400 rounded-lg shadow-lg p-4 overflow-y-auto">
            <h3 className="text-xl font-bold text-center mb-4">{title}</h3>

            {/* Core Principle */}
            <div
              className="mb-4 p-3 rounded-lg bg-yellow-100 border-l-4 border-yellow-600 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                if (corePrinciples) {
                  const content = `
**Primary Position:**
${corePrinciples.primaryPosition}

**Core Talking Points:**
${corePrinciples.talkingPoints.map((point, index) => `${index + 1}. "${point}"`).join('\n')}

**Why This Matters:**
${corePrinciples.whyItMatters}
                  `.trim();
                  openModal("Core Principles", content, "core-principles");
                } else {
                  openModal("Core Principle", principle, "principle");
                }
                setModalOpen(true);
              }}
            >
              <h4 className="font-semibold text-lg">Core Principle</h4>
              <p className="text-sm">{principle}</p>
            </div>

            {/* The Left's Claim */}
            <div
              className="mb-4 p-3 rounded-lg bg-red-100 border-l-4 border-red-600 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                openModal("The Left's Claim", myth, "myth");
              }}
            >
              <h4 className="font-semibold text-lg text-red-700">The Left's Claim</h4>
              <p className="text-sm italic">{myth}</p>
            </div>

            {/* Fact */}
            <div
              className="mb-4 p-3 rounded-lg bg-green-100 border-l-4 border-green-600 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                openModal("Fact", fact, "fact");
              }}
            >
              <h4 className="font-semibold text-lg text-green-700">Fact</h4>
              <p className="text-sm">{fact}</p>
            </div>

            {/* Rebuttal Script */}
            <div
              className="mb-4 p-3 rounded-lg bg-blue-100 border-l-4 border-blue-600 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                openModal("Rebuttal Script", `"${rebuttal}"`, "rebuttal");
              }}
            >
              <h4 className="font-semibold text-lg text-blue-700">Rebuttal Script</h4>
              <p className="text-sm">"{rebuttal}"</p>
            </div>

            {/* Fast Fact */}
            <div
              className="mb-4 p-3 rounded-lg bg-purple-100 border-l-4 border-purple-600 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                openModal("Fast Fact", fastFact, "fastfact");
              }}
            >
              <h4 className="font-semibold text-lg text-purple-700">Fast Fact</h4>
              <p className="text-sm">{fastFact}</p>
            </div>

            {/* TPUSA Tie-In */}
            <div
              className="mb-4 p-3 rounded-lg bg-gray-100 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                openModal("TPUSA Tie-In", tpusaTieIn, "tiein");
              }}
            >
              <h4 className="font-semibold text-lg">TPUSA Tie-In</h4>
              <p className="text-sm">{tpusaTieIn}</p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {modalOpen && modalSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`bg-white rounded-2xl shadow-2xl max-w-2xl max-h-[80vh] overflow-y-auto ${getSectionColor(modalSection.type)}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>

                {modalSection.type === 'core-principles' && corePrinciples ? (
                  <>
                    {/* Primary Position Section */}
                    <div className="mb-6 p-6 bg-yellow-50 rounded-lg border-l-4 border-yellow-600">
                      <h3 className="text-xl font-bold text-yellow-800 mb-3">📍 Primary Position</h3>
                      <p className="text-lg text-gray-800 leading-relaxed">
                        {corePrinciples.primaryPosition}
                      </p>
                    </div>

                    {/* Core Talking Points Section */}
                    <div className="mb-6 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                      <h3 className="text-xl font-bold text-blue-800 mb-4">🎯 Core Talking Points</h3>
                      <div className="space-y-3">
                        {corePrinciples.talkingPoints.map((point, index) => (
                          <div key={index} className="flex items-start">
                            <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                              {index + 1}
                            </span>
                            <p className="text-gray-800 leading-relaxed italic">
                              "{point}"
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Why This Matters Section */}
                    <div className="p-6 bg-green-50 rounded-lg border-l-4 border-green-600">
                      <h3 className="text-xl font-bold text-green-800 mb-3">💡 Why This Matters</h3>
                      <p className="text-lg text-gray-800 leading-relaxed">
                        {corePrinciples.whyItMatters}
                      </p>
                    </div>
                  </>
                ) : (
                  /* Default modal content for other sections */
                  <div className="p-6 rounded-lg border-l-4 border-current">
                    <h3 className="text-2xl font-semibold mb-4">{modalSection.title}</h3>
                    <div className="text-lg leading-relaxed whitespace-pre-wrap">{modalSection.content}</div>
                  </div>
                )}

                <div className="flex justify-end mt-8">
                  <button
                    onClick={closeModal}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
