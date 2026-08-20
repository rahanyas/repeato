import  { useState } from "react";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

/**
 * Standalone view-switcher so this repo runs without a router installed.
 * Swap for React Router when you wire up real routes:
 *   <Route path="/" element={<Landing onGetStarted={() => navigate("/app")} />} />
 *   <Route path="/app" element={<Dashboard />} />
 */
export default function App() {
  const [view, setView] = useState("landing"); // "landing" | "dashboard"

  return view === "landing" ? (
    <Landing onGetStarted={() => setView("dashboard")} />
  ) : (
    <Dashboard onExit={() => setView("landing")} />
  );
}
