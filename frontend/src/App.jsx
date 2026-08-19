



import Nav from "./components/Navbar.comp";
import Hero from "./components/Hero.comp";
import StatBar from "./components/StatBar.comp";
import HowItWorks from "./components/howItWork.comp";
import ProductPreview from "./components/Preview.comp";
import CTA from "./components/Cta.comp";
import Footer from "./components/Footer.comp";


// ---------------------------------------------------------------------------
// Root page
// ---------------------------------------------------------------------------

export default function RecurraLanding() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      <Nav />
      <Hero />
      <StatBar />
      <HowItWorks />
      <ProductPreview />
      <CTA />
      <Footer />
    </div>
  );
}