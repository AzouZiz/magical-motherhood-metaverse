
import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import CulturalSection from '../components/CulturalSection';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PregnancyTracker from '../components/PregnancyTracker';
import MoodTracker from '../components/MoodTracker';
import PregnancyNotifications from '../components/PregnancyNotifications';
import AIPregnancyAssistant from '../components/AIPregnancyAssistant';
import PregnancyDueCalculator from '../components/PregnancyDueCalculator';
import { AICulturalAssistant } from '../components/cultural/AICulturalAssistant';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-soothing-lightPurple/10">
      <div className="arab-pattern-bg fixed inset-0 opacity-[0.03] pointer-events-none"></div>
      <Navbar />
      <Hero />
      <Features />
      
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center mb-8 font-amiri text-kidmam-purple">أدوات مساعدة للأم الحامل</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2">
            <PregnancyNotifications />
          </div>
          <div>
            <MoodTracker />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div>
            <PregnancyDueCalculator />
          </div>
          <div>
            <AIPregnancyAssistant />
          </div>
        </div>
        
        <div className="mb-10">
          <PregnancyTracker />
        </div>

        <div className="mb-10">
          <AICulturalAssistant />
        </div>
      </div>
      
      <CulturalSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
