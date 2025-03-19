
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import CulturalSection from '@/components/CulturalSection';
import ARSection from '@/components/ARSection';
import PregnancyTracker from '@/components/PregnancyTracker';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import AIPregnancyAssistant from '@/components/AIPregnancyAssistant';
import PregnancyInsightsDashboard from '@/components/PregnancyInsightsDashboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <section id="pregnancy-tools" className="py-16 bg-gradient-to-b from-white to-kidmam-light/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-kidmam-dark mb-4">أدوات متابعة الحمل الذكية</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              مجموعة من الأدوات المتقدمة التي تساعدك على متابعة مرحلة الحمل بدقة وتوفر لك معلومات قيمة ودعم مستمر
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <PregnancyTracker />
              <PregnancyInsightsDashboard />
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <AIPregnancyAssistant />
            </div>
          </div>
        </div>
      </section>
      <CulturalSection />
      <ARSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
