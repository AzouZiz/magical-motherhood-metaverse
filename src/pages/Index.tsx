
import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import CulturalSection from '../components/CulturalSection';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PregnancyTracker from '../components/pregnancy-tracker';
import MoodTracker from '../components/MoodTracker';
import PregnancyNotifications from '../components/PregnancyNotifications';
import AIPregnancyAssistant from '../components/AIPregnancyAssistant';
import PregnancyDueCalculator from '../components/PregnancyDueCalculator';
import { AICulturalAssistant } from '../components/cultural/AICulturalAssistant';
import MedicalAssistant from '../components/medical/MedicalAssistant';
import ARSection from '../components/ARSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-soothing-lightPurple/10">
      <div className="arab-pattern-bg fixed inset-0 opacity-[0.03] pointer-events-none"></div>
      <Navbar />
      <Hero />
      <Features />
      
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center mb-8 font-amiri text-kidmam-purple">أدوات مساعدة للأم الحامل</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
          <div className="md:col-span-8">
            <PregnancyNotifications />
          </div>
          <div className="md:col-span-4">
            <MoodTracker />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
          <div className="md:col-span-5">
            <PregnancyDueCalculator />
          </div>
          <div className="md:col-span-7">
            <AIPregnancyAssistant />
          </div>
        </div>
        
        <div className="mb-10">
          <PregnancyTracker />
        </div>

        {/* المساعد الشامل (دمج المساعد الثقافي والطبي) */}
        <div className="mb-10 bg-white/50 rounded-xl p-6 shadow-md backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-center mb-6 font-amiri text-kidmam-purple">المساعد الذكي الشامل</h3>
          <p className="text-center text-muted-foreground mb-6">استشيري مساعدنا الذكي للإجابة على أسئلتك الثقافية والطبية المتعلقة بالحمل والأمومة</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <AICulturalAssistant />
            </div>
            <div className="hidden lg:block">
              <MedicalAssistant />
            </div>
          </div>
        </div>
      </div>
      
      {/* قسم الواقع المعزز */}
      <ARSection />
      
      <CulturalSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
