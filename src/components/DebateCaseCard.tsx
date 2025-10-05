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
      case 'principle': return 'bg-yellow-100 border-yellow-600';
      case 'myth': return 'bg-red-100 border-red-600';
      case 'fact': return 'bg-green-100 border-green-600';
      case 'rebuttal': return 'bg-blue-100 border-blue-600';
      case 'fastfact': return 'bg-purple-100 border-purple-600';
      case 'tiein': return 'bg-gray-100 border-gray-600';
      default: return 'bg-gray-100 border-gray-600';
    }
  };

  // Accent styling for modal content sections (title color + left border color)
  const getTypeAccent = (type: string): { titleClass: string; borderClass: string } => {
    switch (type) {
      case 'principle':
        return { titleClass: 'text-yellow-700', borderClass: 'border-yellow-600' };
      case 'myth':
        return { titleClass: 'text-red-700', borderClass: 'border-red-600' };
      case 'fact':
        return { titleClass: 'text-green-700', borderClass: 'border-green-600' };
      case 'rebuttal':
        return { titleClass: 'text-blue-700', borderClass: 'border-blue-600' };
      case 'fastfact':
        return { titleClass: 'text-purple-700', borderClass: 'border-purple-600' };
      case 'tiein':
        return { titleClass: 'text-gray-700', borderClass: 'border-gray-600' };
      default:
        return { titleClass: 'text-gray-800', borderClass: 'border-gray-600' };
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
            className={`absolute backface-hidden flex flex-col items-center justify-between w-full h-full rounded-lg shadow-lg border-4 ${
              title === "TikTok Ban"
                ? "bg-black text-white border-gray-700"
                : "bg-yellow-100 border-yellow-700"
            }`}
            style={frontBackgroundImage ? {
              backgroundImage: `url(${frontBackgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            } : {}}
          >
            {/* Semi-transparent overlay for better text readability */}
            {frontBackgroundImage && title !== "TikTok Ban" && (
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
            )}

            {/* Title at top */}
            <div className="relative z-10 w-full text-center" style={{ paddingTop: '4px', paddingLeft: '24px', paddingRight: '24px' }}>
              <h2 className={`text-2xl font-bold ${
                title === "TikTok Ban" || frontBackgroundImage ? 'text-white' : ''
              }`}>{title}</h2>
            </div>

            {/* Principle text at bottom */}
            <div className="relative z-10 w-full text-center" style={{ paddingBottom: '24px', paddingLeft: '24px', paddingRight: '24px' }}>
              {image && !frontBackgroundImage ? (
                <img
                  src={image}
                  alt={`${title} graphic`}
                  className="w-20 h-20 mb-4 mx-auto"
                />
              ) : null}
              <p className={`text-sm ${
                title === "TikTok Ban" || frontBackgroundImage ? 'text-white' : ''
              }`}>
                {principle.length > 100
                  ? principle.substring(0, 100) + "..."
                  : principle}
              </p>
            </div>
          </div>

          {/* BACK */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-[#fdf8f0] border-4 border-gray-400 rounded-lg shadow-lg p-4 overflow-y-auto">
            <h3 className="text-xl font-bold text-center mb-4">{title}</h3>

            {/* Core Principle */}
            <div className="mb-4 p-3 rounded-lg bg-yellow-100 border-l-4 border-yellow-600">
              <button
                className="font-semibold text-lg mb-2 text-left w-full hover:opacity-80 transition-opacity"
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
                }}
              >
                Core Principle
              </button>
              <p className="text-sm">{principle}</p>
            </div>

            {/* Opposition Claim (TikTok Ban) / The Left's Claim (others) */}
            <div className="mb-4 p-3 rounded-lg bg-red-100 border-l-4 border-red-600">
              <button
                className="font-semibold text-lg text-red-700 mb-2 text-left w-full hover:opacity-80 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  if (title === "TikTok Ban") {
                    const content = `**Summary**  
Supporters of banning TikTok argue that the platform poses a major national security risk due to its ties to the Chinese Communist Party. They claim the app harvests sensitive data from millions of Americans and could be exploited to spread propaganda, manipulate elections, or conduct surveillance. From this perspective, a ban is a necessary step to protect U.S. privacy and sovereignty.  

**Supporting Points**  
- 🕵️ **Data Harvesting:** TikTok collects vast amounts of personal information, which critics say could be accessed by the Chinese government.  
- 🛰️ **National Security Threat:** Lawmakers warn the CCP could weaponize TikTok for espionage, surveillance, or cyberattacks.  
- 📢 **Propaganda Tool:** The app may be used to influence U.S. public opinion, particularly among young voters, by promoting pro-China narratives or suppressing dissenting content.  
- 🇨🇳 **Foreign Ownership:** Because TikTok’s parent company, ByteDance, is headquartered in China, advocates argue the app is inherently compromised.  
- 🌍 **Global Precedent:** Other countries — including India and Canada — have restricted or banned TikTok, which ban supporters say shows the U.S. must act as well.`.trim();
                    openModal("Opposition Claim", content, "myth");
                  } else {
                    openModal("The Left's Claim", myth, "myth");
                  }
                }}
              >
                {title === "TikTok Ban" ? "Opposition Claim" : "The Left's Claim"}
              </button>
              <p className="text-sm italic">{myth}</p>
            </div>

            {/* Rebuttal Script */}
            <div className="mb-4 p-3 rounded-lg bg-blue-100 border-l-4 border-blue-600">
              <button
                className="font-semibold text-lg text-blue-700 mb-2 text-left w-full hover:opacity-80 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal("Rebuttal Script", `"${rebuttal}"`, "rebuttal");
                }}
              >
                Rebuttal Script
              </button>
              <p className="text-sm">"{rebuttal}"</p>
            </div>

            {/* Common Misconceptions */}
            <div className="mb-4 p-3 rounded-lg bg-green-100 border-l-4 border-green-600">
              <button
                className="font-semibold text-lg text-green-700 mb-2 text-left w-full hover:opacity-80 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal("Common Misconceptions", fact, "fact");
                }}
              >
                Common Misconceptions
              </button>
              <p className="text-sm">{fact}</p>
            </div>

            {/* Quotes */}
            <div className="mb-4 p-3 rounded-lg bg-gray-100 border-l-4 border-gray-600">
              <button
                className="font-semibold text-lg mb-2 text-left w-full hover:opacity-80 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal("Quotes", "", "quotes");
                }}
              >
                Quotes
              </button>
            </div>

            {/* Fast Facts */}
            <div className="mb-4 p-3 rounded-lg bg-purple-100 border-l-4 border-purple-600">
              <button
                className="font-semibold text-lg text-purple-700 mb-2 text-left w-full hover:opacity-80 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal("Fast Facts", fastFact, "fastfact");
                }}
              >
                Fast Facts
              </button>
              <p className="text-sm">{fastFact}</p>
            </div>

            {/* TPUSA Tie-In */}
            <div className="mb-4 p-3 rounded-lg bg-gray-100">
              <button
                className="font-semibold text-lg mb-2 text-left w-full hover:opacity-80 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal("TPUSA Tie-In", tpusaTieIn, "tiein");
                }}
              >
                TPUSA Tie-In
              </button>
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
                <h2 className="text-3xl font-bold text-center mb-8">{modalSection.title}</h2>

                {modalSection.type === 'core-principles' && corePrinciples ? (
                  <>
                    <div className="mb-6 p-6 bg-yellow-50 rounded-lg border-l-4 border-yellow-600">
                      <h3 className="text-xl font-bold text-yellow-800 mb-3">📍 Primary Position</h3>
                      <p className="text-lg text-gray-800 leading-relaxed">
                        {corePrinciples.primaryPosition}
                      </p>
                    </div>

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

                    <div className="p-6 bg-green-50 rounded-lg border-l-4 border-green-600">
                      <h3 className="text-xl font-bold text-green-800 mb-3">💡 Why This Matters</h3>
                      <p className="text-lg text-gray-800 leading-relaxed">
                        {corePrinciples.whyItMatters}
                      </p>
                    </div>
                  </>
                ) : (
                  modalSection.title === 'Opposition Claim' ? (
                    <div className="p-6 rounded-lg border-l-4 border-red-600">
                      <h3 className="text-red-400 font-bold text-lg mb-6">Opposition Claim</h3>
                      <div className="space-y-6">
                        <section>
                          <h4 className="text-lg font-semibold text-red-700 mb-2">Summary</h4>
                          <p className="text-lg leading-relaxed text-gray-800">
                            Supporters of banning TikTok argue that the platform poses a major national security risk due to its ties to the Chinese Communist Party. They claim the app harvests sensitive data from millions of Americans and could be exploited to spread propaganda, manipulate elections, or conduct surveillance. From this perspective, a ban is a necessary step to protect U.S. privacy and sovereignty.
                          </p>
                        </section>
                        <section>
                          <h4 className="text-lg font-semibold text-red-700 mb-3">Supporting Points</h4>
                          <ul className="list-disc pl-6 space-y-2">
                            <li className="text-gray-800 text-lg">
                              🕵️ <span className="font-semibold">Data Harvesting:</span> TikTok collects vast amounts of personal information, which critics say could be accessed by the Chinese government.
                            </li>
                            <li className="text-gray-800 text-lg">
                              🛰️ <span className="font-semibold">National Security Threat:</span> Lawmakers warn the CCP could weaponize TikTok for espionage, surveillance, or cyberattacks.
                            </li>
                            <li className="text-gray-800 text-lg">
                              📢 <span className="font-semibold">Propaganda Tool:</span> The app may be used to influence U.S. public opinion, particularly among young voters, by promoting pro-China narratives or suppressing dissenting content.
                            </li>
                            <li className="text-gray-800 text-lg">
                              🇨🇳 <span className="font-semibold">Foreign Ownership:</span> Because TikTok’s parent company, ByteDance, is headquartered in China, advocates argue the app is inherently compromised.
                            </li>
                            <li className="text-gray-800 text-lg">
                              🌍 <span className="font-semibold">Global Precedent:</span> Other countries — including India and Canada — have restricted or banned TikTok, which ban supporters say shows the U.S. must act as well.
                            </li>
                          </ul>
                        </section>
                      </div>
                    </div>
                  ) : title === 'TikTok Ban' && modalSection.type === 'rebuttal' ? (
                    <div className="p-6 rounded-lg border-l-4 border-blue-600">
                      <h3 className="text-red-400 font-bold text-lg mb-6">Rebuttal Script</h3>
                      <div className="space-y-8 text-gray-900">
                        <section>
                          <h4 className="text-lg font-semibold text-blue-700 mb-3">Summary</h4>
                          <p className="text-lg leading-relaxed text-gray-900">
                            Use these responses when someone argues in favor of banning TikTok. They emphasize liberty, privacy reform, and constitutional limits on government power.
                          </p>
                        </section>
                        <section>
                          <h4 className="text-lg font-semibold text-blue-700 mb-4">Rebuttals</h4>
                          <ol className="list-decimal pl-6 space-y-6">
                            <li className="space-y-2">
                              <ul className="list-disc pl-6 space-y-1">
                                <li className="text-lg leading-relaxed">
                                  <span className="font-semibold text-blue-700">Claim:</span>
                                  <span className="ml-2 text-gray-900">“TikTok is a Chinese spying tool.”</span>
                                </li>
                                <li className="text-lg leading-relaxed">
                                  <span className="font-semibold text-blue-700">Rebuttal:</span>
                                  <span className="ml-2 text-gray-900">There’s no verified evidence of data being handed to the CCP. The answer is to strengthen <em>data-privacy laws for all tech companies</em>, not ban speech platforms.</span>
                                </li>
                                <li className="text-lg leading-relaxed">
                                  <span className="font-semibold text-blue-700">Key Phrase:</span>
                                  <span className="ml-2 text-gray-900">“Regulate data, not speech.”</span>
                                </li>
                              </ul>
                            </li>
                            <li className="space-y-2">
                              <ul className="list-disc pl-6 space-y-1">
                                <li className="text-lg leading-relaxed">
                                  <span className="font-semibold text-blue-700">Claim:</span>
                                  <span className="ml-2 text-gray-900">“Banning TikTok keeps Americans safe.”</span>
                                </li>
                                <li className="text-lg leading-relaxed">
                                  <span className="font-semibold text-blue-700">Rebuttal:</span>
                                  <span className="ml-2 text-gray-900">Safety doesn’t come from censorship. If national security is the concern, address cyber-security directly — don’t give Washington the power to silence apps it dislikes.</span>
                                </li>
                                <li className="text-lg leading-relaxed">
                                  <span className="font-semibold text-blue-700">Key Phrase:</span>
                                  <span className="ml-2 text-gray-900">“Security shouldn’t mean silence.”</span>
                                </li>
                              </ul>
                            </li>
                            <li className="space-y-2">
                              <ul className="list-disc pl-6 space-y-1">
                                <li className="text-lg leading-relaxed">
                                  <span className="font-semibold text-blue-700">Claim:</span>
                                  <span className="ml-2 text-gray-900">“Other countries banned TikTok, so we should too.”</span>
                                </li>
                                <li className="text-lg leading-relaxed">
                                  <span className="font-semibold text-blue-700">Rebuttal:</span>
                                  <span className="ml-2 text-gray-900">America leads on freedom, not imitation. We don’t copy censorship from abroad — we set the global standard for liberty.</span>
                                </li>
                                <li className="text-lg leading-relaxed">
                                  <span className="font-semibold text-blue-700">Key Phrase:</span>
                                  <span className="ml-2 text-gray-900">“America sets the standard for freedom.”</span>
                                </li>
                              </ul>
                            </li>
                            <li className="space-y-2">
                              <ul className="list-disc pl-6 space-y-1">
                                <li className="text-lg leading-relaxed">
                                  <span className="font-semibold text-blue-700">Claim:</span>
                                  <span className="ml-2 text-gray-900">“A ban only targets China, not Americans.”</span>
                                </li>
                                <li className="text-lg leading-relaxed">
                                  <span className="font-semibold text-blue-700">Rebuttal:</span>
                                  <span className="ml-2 text-gray-900">The ban punishes 170 million U.S. users and millions of creators, none of whom are the Chinese government. Collective punishment isn’t national security.</span>
                                </li>
                                <li className="text-lg leading-relaxed">
                                  <span className="font-semibold text-blue-700">Key Phrase:</span>
                                  <span className="ml-2 text-gray-900">“Don’t punish Americans to spite China.”</span>
                                </li>
                              </ul>
                            </li>
                            <li className="space-y-2">
                              <ul className="list-disc pl-6 space-y-1">
                                <li className="text-lg leading-relaxed">
                                  <span className="font-semibold text-blue-700">Claim:</span>
                                  <span className="ml-2 text-gray-900">“It’s just an app — banning it isn’t censorship.”</span>
                                </li>
                                <li className="text-lg leading-relaxed">
                                  <span className="font-semibold text-blue-700">Rebuttal:</span>
                                  <span className="ml-2 text-gray-900">TikTok is a <em>platform for speech</em>. Banning it restricts what Americans can say and hear — exactly what the First Amendment forbids.</span>
                                </li>
                                <li className="text-lg leading-relaxed">
                                  <span className="font-semibold text-blue-700">Key Phrase:</span>
                                  <span className="ml-2 text-gray-900">“An app for speech is speech.”</span>
                                </li>
                              </ul>
                            </li>
                          </ol>
                        </section>
                      </div>
                    </div>
                  ) : (
                    <div className={`p-6 rounded-lg border-l-4 ${getTypeAccent(modalSection.type).borderClass}`}>
                      <h3 className="text-red-400 font-bold text-lg mb-4">{modalSection.title}</h3>
                      <div className="text-lg leading-relaxed whitespace-pre-wrap text-gray-800">{modalSection.content}</div>
                    </div>
                  )
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
