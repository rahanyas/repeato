import Nav from "../components/landing/Nav";
import Hero from "../components/landing/Hero";
import StatBar from "../components/landing/StatBar";
import HowItWorks from "../components/landing/HowItWorks";
import ProductPreview from "../components/landing/ProductPreview";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

export default function Landing({ onGetStarted, onSignIn }) {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      <Nav onGetStarted={onGetStarted} onSignIn={onSignIn} />
      <Hero onGetStarted={onGetStarted} />
      <StatBar />
      <HowItWorks />
      <ProductPreview />
      <CTA onGetStarted={onGetStarted} />
      <Footer />
    </div>
  );
}