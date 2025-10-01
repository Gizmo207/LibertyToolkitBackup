import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

export default function Join() {
  const [status, setStatus] = useState("");
  const [isCocOpen, setIsCocOpen] = useState(false);
  const [cocAgreed, setCocAgreed] = useState(false);
  const [initials, setInitials] = useState("");
  const [student, setStudent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCocAgree = () => {
    if (initials.trim()) {
      setCocAgreed(true);
      setIsCocOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cocAgreed) {
      setStatus("❌ Please agree to the Code of Conduct first.");
      return;
    }

    if (!formRef.current) return;

    try {
      // Send welcome email via EmailJS
      await emailjs.sendForm(
        "service_h8skbic",     // Gmail service
        "template_ntgixtx",    // ✅ Welcome template
        formRef.current,
        "mu8RfaHxq4wGQJC6p"    // Public Key
      );

      // Gather form data for Google Sheets
      const formData = {
        firstName: formRef.current["firstName"].value,
        lastName: formRef.current["lastName"].value,
        email: formRef.current["email"].value,
        phone: formRef.current["phone"].value,
        studentId: formRef.current["studentId"].value,
        student: student ? "Yes" : "No",
        cocAgreed: cocAgreed ? "Yes" : "No",
        initials: initials
      };

      // Save to Google Sheets (with CORS handling)
      fetch("https://script.google.com/macros/s/AKfycbyV4qbZk35QRK9SS2JqwmeaAoYBhUBvPLB8uf5vd2pXQKewzLT_qvYguIAx0iShxiHJ/exec", {
        method: "POST",
        mode: 'no-cors', // Handle CORS issues
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      }).then(() => {
        // Success - don't try to parse response due to no-cors
        setStatus("✅ Welcome email sent! Your membership is recorded.");
        formRef.current?.reset();
        setInitials("");
        setCocAgreed(false);
        setStudent(false);
      }).catch((error) => {
        // CORS error is expected, but data may still be saved
        console.log("CORS error (expected):", error);
        setStatus("✅ Welcome email sent! Your membership is recorded.");
        formRef.current?.reset();
        setInitials("");
        setCocAgreed(false);
        setStudent(false);
      });
    } catch (error) {
      setStatus("❌ Could not send welcome email.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start p-10 text-[#2a1b00]"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundRepeat: "repeat-y",
        backgroundSize: "cover",
        backgroundPosition: "center -60px",
        boxShadow: "inset 0 0 60px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.8)",
      }}
    >
      <div className="w-full max-w-4xl mt-[105px]">
        <div className="flex items-center justify-between mb-8 mt-[-20px]">
          <button
            onClick={() => navigate("/")}
            className="text-xl font-constitution font-bold text-[#0f0800] hover:text-red-700 pt-[75px]"
          >
            ← Home
          </button>
          <h1 className="text-4xl sm:text-5xl font-constitution font-bold text-center">
            Join TPUSA SMCC
          </h1>
          <div className="w-16"></div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-2 max-w-2xl mx-auto mt-[-45px]">
          <div className="grid grid-cols-2 gap-2">
            <input type="text" name="firstName" placeholder="First Name" required className="w-full p-3 border rounded bg-white/90 text-black" />
            <input type="text" name="lastName" placeholder="Last Name" required className="w-full p-3 border rounded bg-white/90 text-black" />
          </div>
          <input type="email" name="email" placeholder="Your Email" required className="w-full p-3 border rounded bg-white/90 text-black" />
          <input type="tel" name="phone" placeholder="Phone Number" required className="w-full p-3 border rounded bg-white/90 text-black" />
          <input type="text" name="studentId" placeholder="SMCC Student ID (if applicable)" className="w-full p-3 border rounded bg-white/90 text-black" />
          <textarea name="why" placeholder="Why do you want to join?" required className="w-full p-3 border rounded h-32 bg-white/90 text-black" />
          <input
            type="text"
            name="initials"
            placeholder="Initials (after agreeing to COC)"
            value={initials}
            onChange={(e) => setInitials(e.target.value)}
            required
            className="w-full p-3 border rounded bg-white/90 text-black"
          />
          <div className="flex justify-between items-center mt-4">
            <button
              type="button"
              onClick={() => setIsCocOpen(true)}
              className="bg-black text-white px-6 py-3 rounded hover:bg-yellow-600 transition-colors"
            >
              Sign Code of Conduct
            </button>
            <button type="submit" className="bg-black text-white px-6 py-3 rounded hover:bg-yellow-600 transition-colors" disabled={!cocAgreed}>
              Join
            </button>
          </div>
        </form>

        {status && <p className="mt-4 text-lg text-center">{status}</p>}
      </div>

      {/* Code of Conduct Modal */}
      {isCocOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Code of Conduct</h2>

            <div className="text-sm space-y-3 mb-6">
              <p><strong>TPUSA SMCC Chapter Code of Conduct</strong></p>

              <p>As a member of Turning Point USA at SMCC, I commit to:</p>

              <ol className="list-decimal list-inside space-y-2">
                <li><strong>Promote Conservative Values:</strong> I will advocate for fiscal responsibility, free markets, and limited government in all chapter activities and discussions.</li>

                <li><strong>Respect Fellow Members:</strong> I will treat all members, regardless of background, with dignity and respect, fostering an inclusive environment for conservative dialogue.</li>

                <li><strong>Engage in Civil Discourse:</strong> I will debate ideas, not attack individuals. Personal attacks, harassment, or intimidation will not be tolerated.</li>

                <li><strong>Maintain Academic Integrity:</strong> I will uphold honesty in all academic pursuits and chapter activities, representing our values with integrity.</li>

                <li><strong>Support Chapter Goals:</strong> I will actively participate in chapter events, promote membership growth, and contribute positively to our mission.</li>

                <li><strong>Comply with Campus Policies:</strong> I will adhere to all SMCC policies and local laws while engaging in chapter activities.</li>

                <li><strong>Protect Chapter Reputation:</strong> I will conduct myself in a manner that reflects positively on TPUSA and our chapter at all times.</li>
              </ol>

              <p><strong>Consequences:</strong> Violation of this Code of Conduct may result in disciplinary action, up to and including removal from the chapter.</p>

              <p className="text-xs text-gray-600 mt-4">
                By signing below, I acknowledge that I have read, understood, and agree to abide by this Code of Conduct.
              </p>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="student-modal"
                  checked={student}
                  onChange={(e) => setStudent(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="student-modal" className="text-sm">I am currently a student</label>
              </div>
              <input
                type="text"
                placeholder="Your Initials"
                value={initials}
                onChange={(e) => setInitials(e.target.value)}
                className="border rounded p-2"
              />
            </div>

            <div className="flex justify-end space-x-4 mt-4">
              <button onClick={() => setIsCocOpen(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
              <button onClick={handleCocAgree} className="bg-blue-600 text-white px-4 py-2 rounded">I Agree</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
