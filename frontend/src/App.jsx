import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import SignUpPage from "./pages/SignIn";

function LandingRoute() {
  const navigate = useNavigate();
  return <Landing onGetStarted={() => navigate("/app")} />;
}

function DashboardRoute() {
  const navigate = useNavigate();
  return <Dashboard onExit={() => navigate("/")} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingRoute />} />
        <Route path="/app" element={<DashboardRoute />} />
        <Route path="/sign-in" element={<SignUpPage
  initialMode="signin"
  onBack={() => {/* go to landing */}}
  onAuthenticated={() => {/* go to dashboard */}}
  onGoogleAuth={() => {/* trigger real Google OAuth */}}
/>}/>
      </Routes>
    </BrowserRouter>
  );
}