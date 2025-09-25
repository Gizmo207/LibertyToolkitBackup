// src/main.tsx

// Import React & ReactDOM so React can mount into the page
import React from "react";
import ReactDOM from "react-dom/client";

// Import the main App component
import App from "./App";   // ✅ FIXED: Capital A

// Import Tailwind’s global styles
import "./globals.css";

// Mount the <App /> into the <div id="root"> in index.html
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
