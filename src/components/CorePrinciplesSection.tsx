interface CorePrinciplesProps {
  primaryPosition: string;
  talkingPoints: string[];
  whyItMatters: string;
}

export default function CorePrinciplesSection({
  primaryPosition,
  talkingPoints,
  whyItMatters,
}: CorePrinciplesProps) {
  return (
    <div className="space-y-6">
      {/* Primary Position */}
      <div>
        <h3 className="text-xl font-bold mb-3 text-gray-800">Primary Position</h3>
        <p className="italic text-lg text-gray-700 leading-relaxed">{primaryPosition}</p>
      </div>

      {/* Talking Points */}
      <div>
        <h3 className="text-xl font-bold mb-3 text-gray-800">Core Talking Points</h3>
        <ul className="list-disc pl-6 space-y-3">
          {talkingPoints.map((point, idx) => (
            <li key={idx} className="leading-relaxed text-gray-700">
              "{point}"
            </li>
          ))}
        </ul>
      </div>

      {/* Why This Matters */}
      <div>
        <h3 className="text-xl font-bold mb-3 text-gray-800">Why This Matters</h3>
        <p className="text-gray-700 leading-relaxed">{whyItMatters}</p>
      </div>
    </div>
  );
}
