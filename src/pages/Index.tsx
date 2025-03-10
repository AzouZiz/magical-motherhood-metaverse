
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import PregnancyTracker from '@/components/PregnancyTracker';
import CulturalSection from '@/components/CulturalSection';
import ARSection from '@/components/ARSection';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

const Index = () => {
  // Set RTL direction for Arabic content
  document.documentElement.dir = 'rtl';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <PregnancyTracker />
        <CulturalSection />
        <ARSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
