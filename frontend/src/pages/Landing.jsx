import Nav from "../components/landing/Nav";
import Hero from "../components/landing/Hero";
import StatBar from "../components/landing/StatBar";
import HowItWorks from "../components/landing/HowItWorks";
import ProductPreview from "../components/landing/ProductPreview";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

import { useNavigate } from "react-router-dom";

export default function Landing({ onGetStarted }) {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans overflow-x-hidden">
      <Nav onGetStarted={onGetStarted} onSignIn={() => navigate('/sign-in')} />
      <Hero onGetStarted={onGetStarted} />
      <StatBar />
      <HowItWorks />
      <ProductPreview />
      <CTA onGetStarted={onGetStarted} />
      <Footer />
    </div>
  );
}