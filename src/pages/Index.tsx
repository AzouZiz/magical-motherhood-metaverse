
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
import MothersSupport from '@/components/MothersSupport';
import NutritionGuide from '@/components/NutritionGuide';
import DoctorAppointments from '@/components/DoctorAppointments';
import VideoLibrary from '@/components/VideoLibrary';
import PregnancyJournal from '@/components/PregnancyJournal';
import LanguageTranslator from '@/components/LanguageTranslator';
import PregnancyNotifications from '@/components/PregnancyNotifications';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      
      {/* أدوات متابعة الحمل الذكية */}
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
              <MothersSupport />
              <PregnancyJournal />
            </div>
            
            <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <PregnancyNotifications />
              <AIPregnancyAssistant />
              <NutritionGuide />
              <DoctorAppointments />
            </div>
          </div>
        </div>
      </section>
      
      {/* قسم الموارد التعليمية */}
      <section className="py-16 bg-gradient-to-b from-kidmam-light/20 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-kidmam-dark mb-4">موارد تعليمية وأدوات مساعدة</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              محتوى تعليمي غني وأدوات مفيدة لمساعدتك خلال رحلة الحمل والاستعداد للأمومة
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <VideoLibrary />
            <LanguageTranslator />
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
