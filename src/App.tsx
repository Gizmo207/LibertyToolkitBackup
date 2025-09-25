// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import pages
import Home from "./Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Join from "./components/Join";
import DebateToolsPage from "./DebateToolsPage";  // ⬅️ FIXED

export default function App() {
  return (
    <Router>
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
