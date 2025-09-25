// DebateToolsPage.tsx
import DebateCard from "./components/DebateCard";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import HamiltonCharacter from "./components/HamiltonCharacter";
import ChatBubble from "./components/ChatBubble";
import VoicePlayer from "./components/VoicePlayer";
import DebateCaseCard from "./components/DebateCaseCard";
import { freeSpeechCases } from "./data/FreeSpeechCases";
import { freedomOfChoiceCases } from "./data/FreedomOfChoiceCases";

// Sub-category lookup table
const datasets: Record<string, any[]> = {
  "free-speech": freeSpeechCases,
  "freedom-of-choice": freedomOfChoiceCases,
};

// Comprehensive dataset with categories
const topics = [
  // ======================
  // INDIVIDUAL LIBERTY
  // ======================
  {
    category: "individual-liberty",
    title: "Free Speech",
    containers: [
      { label: "Core Principle", type: "core", content: "The First Amendment protects the right to express ideas without government interference." },
      { label: "Myth vs Fact", type: "myth", content: "Myth: Offensive speech isn't protected. Fact: The Supreme Court has ruled it is." },
      { label: "Rebuttal", type: "rebuttal", content: "Banning offensive speech undermines liberty because popular ideas don't need protection." },
      { label: "Fast Fact", type: "fact", content: "77% of students believe free speech is under threat on campus (FIRE, 2023)." },
    ],
  },
  {
    category: "individual-liberty",
    title: "Right to Privacy",
    containers: [
      { label: "Core Principle", type: "core", content: "Privacy is essential for liberty, protecting individuals from government overreach." },
      { label: "Myth vs Fact", type: "myth", content: "Myth: Privacy is not a constitutional right. Fact: Courts recognize it through multiple amendments." },
      { label: "Rebuttal", type: "rebuttal", content: "Limiting privacy erodes personal freedom and opens the door to government abuse." },
      { label: "Fast Fact", type: "fact", content: "The 4th Amendment protects against unreasonable searches and seizures." },
    ],
  },
  {
    category: "individual-liberty",
    title: "Freedom of Religion",
    containers: [
      { label: "Core Principle", type: "core", content: "The First Amendment protects the free exercise of religion." },
      { label: "Myth vs Fact", type: "myth", content: "Myth: Separation of church and state means religion is banned from public life. Fact: It prevents government control of religion." },
      { label: "Rebuttal", type: "rebuttal", content: "Protecting religious liberty ensures diverse communities thrive peacefully." },
      { label: "Fast Fact", type: "fact", content: "Over 70% of Americans say religion is important in their lives (Pew, 2021)." },
    ],
  },

  // ======================
  // FREE MARKETS
  // ======================
  {
    category: "free-markets",
    title: "Entrepreneurship",
    containers: [
      { label: "Core Principle", type: "core", content: "Entrepreneurship drives innovation, creates jobs, and expands opportunity." },
      { label: "Myth vs Fact", type: "myth", content: "Myth: Entrepreneurs succeed only by exploiting workers. Fact: They create value for society and opportunities for employees." },
      { label: "Rebuttal", type: "rebuttal", content: "Without entrepreneurs, we'd have fewer products, services, and jobs." },
      { label: "Fast Fact", type: "fact", content: "Small businesses create 62% of new U.S. jobs (SBA, 2022)." },
    ],
  },
  {
    category: "free-markets",
    title: "Capitalism vs Socialism",
    containers: [
      { label: "Core Principle", type: "core", content: "Capitalism rewards innovation and hard work, while socialism centralizes control." },
      { label: "Myth vs Fact", type: "myth", content: "Myth: Socialism ensures fairness. Fact: It often leads to shortages and inefficiency." },
      { label: "Rebuttal", type: "rebuttal", content: "Free markets have lifted more people out of poverty than any other system." },
      { label: "Fast Fact", type: "fact", content: "Global extreme poverty fell from 42% in 1981 to under 9% today, thanks to free markets." },
    ],
  },
  {
    category: "free-markets",
    title: "Consumer Choice",
    containers: [
      { label: "Core Principle", type: "core", content: "Competition gives consumers the power to choose the best products and services." },
      { label: "Myth vs Fact", type: "myth", content: "Myth: Regulation always protects consumers. Fact: Overregulation reduces options and raises prices." },
      { label: "Rebuttal", type: "rebuttal", content: "Free choice keeps businesses accountable to customers, not bureaucrats." },
      { label: "Fast Fact", type: "fact", content: "The average U.S. grocery store offers 30,000+ products — a result of free markets." },
    ],
  },

  // ======================
  // LIMITED GOVERNMENT
  // ======================
  {
    category: "limited-government",
    title: "Checks and Balances",
    containers: [
      { label: "Core Principle", type: "core", content: "Checks and balances prevent any one branch of government from gaining too much power." },
      { label: "Myth vs Fact", type: "myth", content: "Myth: More government ensures stability. Fact: Overreach often causes abuse and corruption." },
      { label: "Rebuttal", type: "rebuttal", content: "Limiting power is the best safeguard against tyranny." },
      { label: "Fast Fact", type: "fact", content: "The U.S. Constitution separates power into 3 branches: Legislative, Executive, Judicial." },
    ],
  },
  {
    category: "limited-government",
    title: "Federalism",
    containers: [
      { label: "Core Principle", type: "core", content: "Federalism divides power between national and state governments, protecting liberty." },
      { label: "Myth vs Fact", type: "myth", content: "Myth: States are just administrative units of the federal government. Fact: They have constitutional sovereignty." },
      { label: "Rebuttal", type: "rebuttal", content: "Local governments better reflect community needs than distant bureaucrats." },
      { label: "Fast Fact", type: "fact", content: "The 10th Amendment reserves powers not delegated to the U.S. for the states or the people." },
    ],
  },
  {
    category: "limited-government",
    title: "Regulation and Liberty",
    containers: [
      { label: "Core Principle", type: "core", content: "Excessive regulation stifles innovation and limits freedom." },
      { label: "Myth vs Fact", type: "myth", content: "Myth: More rules always mean more fairness. Fact: Too many rules often protect insiders." },
      { label: "Rebuttal", type: "rebuttal", content: "Smart limits on regulation foster growth while protecting liberty." },
      { label: "Fast Fact", type: "fact", content: "The Federal Register (rulebook of regulations) is over 180,000 pages long." },
    ],
  },
];

export default function DebateToolsPage() {
  const navigate = useNavigate();
  const { category, subcategory } = useParams();
  const [showGreeting, setShowGreeting] = useState(false);
  const [showCharacter, setShowCharacter] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);

  // Filter topics by the category, or show all if no category
  const filteredTopics = category ? topics.filter(t => t.category === category) : topics;

  const handleCardClick = () => {
    if (!showCharacter) {
      setShowCharacter(true);
      setShowGreeting(true);
    }
  };

  const handleCharacterReady = () => {
    // Character is fully loaded in wave pose, now start audio
    setAudioStarted(true);
  };

  const handleAudioEnded = () => {
    // Audio finished, hide greeting and transition character to idle
    setShowGreeting(false);
    // Call the stored transition function
    if ((window as any).hamiltonTransitionToIdle) {
      (window as any).hamiltonTransitionToIdle();
    }
  };

  // If subcategory exists, show case cards
  if (subcategory && datasets[subcategory]) {
    return (
      <div className="min-h-screen bg-parchment relative p-10" style={{ backgroundColor: '#f7f3ed', backgroundImage: 'url("/bg.png")', backgroundSize: 'cover', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat' }}>
        {/* Page Title */}
        <div className="flex items-center justify-center mb-10">
          <button
            onClick={() => navigate("/")}
            className="text-xl font-constitution font-bold text-[#0f0800] hover:text-red-700 pt-[50px]"
            style={{ marginLeft: '75px', marginTop: '50px' }}
          >
            ← Back
          </button>
          <h1 className="text-4xl font-bold text-center text-[#2a1b00] drop-shadow-lg mt-12 flex-1" style={{ marginLeft: '-155px' }}>
            {subcategory.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())} Cases
          </h1>
        </div>

        {/* Show Hamilton character when triggered by card click */}
        {showCharacter && (
          <HamiltonCharacter
            intro={true}
            size="w-56"
            onAnimationComplete={handleCharacterReady}
          />
        )}

        {/* Show greeting bubble and audio only during greeting sequence */}
        {showGreeting && (
          <>
            <ChatBubble
              text="Hello friend. Glad you made it."
              visible={true}
              position="bottom-[203px] right-16"
            />

            {audioStarted && (
              <VoicePlayer
                src="/audio/hamilton_intro.mp3"
                onEnded={handleAudioEnded}
              />
            )}
          </>
        )}

        {/* Grid of case cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 justify-items-center max-w-4xl mx-auto" style={{ marginTop: '65px' }}>
          {datasets[subcategory].map((card, index) => (
            <DebateCaseCard key={index} {...card} />
          ))}
        </div>
      </div>
    );
  }

  // Otherwise, show sub-category selection
  return (
    <div className="min-h-screen bg-parchment relative p-10">
      {/* Page Title */}
      <div className="flex items-center justify-center mb-10">
        <button
          onClick={() => navigate("/")}
          className="text-xl font-constitution font-bold text-[#0f0800] hover:text-red-700 pt-[50px]"
          style={{ marginLeft: '75px', marginTop: '50px' }}
        >
          ← Back
        </button>
        <h1 className="text-4xl font-bold text-center text-[#2a1b00] drop-shadow-lg mt-12 flex-1" style={{ marginLeft: '-155px' }}>
          {category?.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())} Sections
        </h1>
      </div>

      {/* Show Hamilton character when triggered by card click */}
      {showCharacter && (
        <HamiltonCharacter
          intro={true}
          size="w-56"
          onAnimationComplete={handleCharacterReady}
        />
      )}

      {/* Show greeting bubble and audio only during greeting sequence */}
      {showGreeting && (
        <>
          <ChatBubble
            text="Hello friend. Glad you made it."
            visible={true}
            position="bottom-[203px] right-16"
          />

          {audioStarted && (
            <VoicePlayer
              src="/audio/hamilton_intro.mp3"
              onEnded={handleAudioEnded}
            />
          )}
        </>
      )}

      {/* Grid of sub-category cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 justify-items-center max-w-4xl mx-auto" style={{ marginTop: '65px' }}>
        {filteredTopics.map((topic, index) => (
          <DebateCard
            key={index}
            title={topic.title}
            containers={topic.containers}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
}
