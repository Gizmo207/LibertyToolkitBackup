// App.tsx
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Import pages
import Home from "./Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Join from "./components/Join";
import DebateToolsPage from "./DebateToolsPage";  // ⬅️ FIXED

// Scroll to top on route change
function ScrollToTop(): null {
  const location = useLocation();

  useEffect(() => {
    // Always scroll to top when path or query changes
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.search]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<DebateToolsPage />} />
        <Route path="/tools/:category" element={<DebateToolsPage />} />
        <Route path="/tools/:category/:subcategory" element={<DebateToolsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </Router>
  );
}
