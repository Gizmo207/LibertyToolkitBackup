import { DebateCaseCardProps } from "../components/DebateCaseCard";

// Sample Free Speech case cards
export const freeSpeechCases: DebateCaseCardProps[] = [
  {
    title: "TikTok Ban",
    principle: "Banning apps isn't protecting freedom — it's censorship in disguise.",
    myth: "Banning TikTok keeps us safe from foreign disinformation.",
    fact: "Censorship doesn't stop propaganda — it just sets a precedent for banning platforms that carry views politicians dislike.",
    rebuttal: "If the government can ban TikTok today, what stops them from banning X, or any app conservatives rely on, tomorrow?",
    fastFact: "Montana passed a statewide TikTok ban in 2023, but courts struck it down as unconstitutional before it took effect.",
    tpusaTieIn: "Free societies don't ban apps — they trust citizens to make their own choices.",
    image: "/images/tiktok_ban.png",
    frontBackgroundImage: "/images/card_bg_tiktokban.png",
    corePrinciples: {
      primaryPosition: "Government app bans violate the First Amendment and set dangerous precedents for future censorship.",
      talkingPoints: [
        "When government picks winners and losers in the marketplace of ideas, we all lose.",
        "The Constitution doesn't have a 'Chinese exception' to the First Amendment.",
        "Today it's TikTok, tomorrow it's any platform that challenges government narratives.",
        "150 million Americans chose TikTok. Who is Congress to override their decision?",
        "We defeat bad ideas with better ideas, not with bans.",
        "Censorship is the tool of weak arguments and authoritarian governments.",
        "The marketplace of ideas works when government stays out of it.",
        "Liberty means having the freedom to make choices politicians disagree with.",
        "You can't protect freedom by destroying it.",
        "If the government can silence foreign voices today, they'll silence domestic ones tomorrow."
      ],
      whyItMatters: "This isn't just about one app - it's about whether we trust citizens to make informed choices or surrender that authority to government bureaucrats. Free societies counter bad speech with more speech, not censorship."
    }
  },
  {
    title: "Social Media Censorship",
    principle: "Free speech protections must extend into the digital public square.",
    myth: "Tech companies are private, so they can censor anything they want.",
    fact: "When platforms act like utilities, silencing speech amounts to viewpoint discrimination.",
    rebuttal: "Imagine if your phone carrier dropped your call because they didn't like your politics. That's what Big Tech censorship feels like.",
    fastFact: "Twitter Files (2022) revealed government agencies pressured platforms to silence certain viewpoints.",
    tpusaTieIn: "TPUSA believes students must defend free expression online as strongly as on campus.",
  },
  {
    title: "Campus Speech Codes",
    principle: "Universities should be marketplaces of ideas, not echo chambers.",
    myth: "Speech codes make campuses safer and more inclusive.",
    fact: "Most speech codes have been struck down in federal court as unconstitutional.",
    rebuttal: "Shielding students from offensive speech doesn't prepare them for the real world — it infantilizes them.",
    fastFact: "As of 2023, FIRE reports 88% of colleges maintain restrictive speech policies.",
    tpusaTieIn: "TPUSA exists to push back on biased administrators and reclaim free debate on campus.",
  },
  {
    title: "Antisemitism Speech Laws",
    principle: "Even hateful speech is protected unless it directly incites violence.",
    myth: "Banning antisemitic speech protects Jewish students.",
    fact: "Suppressing ugly ideas drives them underground — it doesn't eliminate them.",
    rebuttal: "We defeat bad ideas with better ones, not government bans.",
    fastFact: "In 1977, the ACLU defended the right of Nazis to march in Skokie, Illinois, to uphold First Amendment principles.",
    tpusaTieIn: "TPUSA stands for liberty even when it's uncomfortable — because without it, no one's rights are safe.",
  },
];
