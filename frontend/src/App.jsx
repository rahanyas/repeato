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
};


function SiginInRoute(){
  const navigate = useNavigate()
  return (
    <SignUpPage 
    initialMode="signin"
    onBack={() => navigate('/')}
    onAuthenticated={() => navigate('/app')}
    onGoogleAuth={() => {/* trigger real Google OAuth */}}
    />
  )
}

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingRoute />} />
        <Route path="/app" element={<DashboardRoute />} />
        <Route path='/sign-in' element={<SiginInRoute/> }/>
      </Routes>
    </BrowserRouter>
  );
}