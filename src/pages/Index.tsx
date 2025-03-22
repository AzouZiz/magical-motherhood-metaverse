
import React, { useEffect } from 'react';
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
import { AICulturalAssistant } from '@/components/cultural/AICulturalAssistant';
import { IslamicPattern } from '@/components/cultural/IslamicPatterns';
import MoodTracker from '@/components/MoodTracker';
import { motion } from 'framer-motion';

const Index = () => {
  // Setup fade-on-scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-on-scroll');
      elements.forEach(el => {
        const rect = (el as HTMLElement).getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        if (isVisible) {
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'translateY(0)';
        } else {
          (el as HTMLElement).style.opacity = '0.7';
          (el as HTMLElement).style.transform = 'translateY(20px)';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-soothing-gradient">
      <Navbar />
      <Hero />
      <Features />
      
      {/* Mood Tracker Section */}
      <section className="py-12 bg-calm-pattern relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-md mx-auto"
          >
            <MoodTracker />
          </motion.div>
        </div>
      </section>
      
      {/* أدوات متابعة الحمل الذكية */}
      <section id="pregnancy-tools" className="py-16 bg-gradient-to-b from-white to-soothing-lightPurple/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold text-kidmam-dark mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              أدوات متابعة الحمل الذكية
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              مجموعة من الأدوات المتقدمة التي تساعدك على متابعة مرحلة الحمل بدقة وتوفر لك معلومات قيمة ودعم مستمر
            </motion.p>
            <IslamicPattern type="divider" className="max-w-md mx-auto mt-4" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-8 fade-on-scroll" style={{ animationDelay: '0.2s' }}>
              <PregnancyTracker />
              <PregnancyInsightsDashboard />
              <MothersSupport />
              <PregnancyJournal />
            </div>
            
            <div className="space-y-8 fade-on-scroll" style={{ animationDelay: '0.4s' }}>
              <PregnancyNotifications />
              <AIPregnancyAssistant />
              <NutritionGuide />
              <DoctorAppointments />
            </div>
          </div>
        </div>
      </section>
      
      {/* المساعد الثقافي الذكي */}
      <section className="py-16 bg-gradient-to-b from-soothing-lightPurple/20 to-white relative overflow-hidden">
        <IslamicPattern type="background" className="absolute inset-0 opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold text-kidmam-dark mb-4 font-amiri"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              المساعد الثقافي الذكي
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              مساعد ذكي يجمع بين المعرفة الطبية والثقافية ليقدم لك إجابات تناسب احتياجاتك ضمن إطار القيم والعادات العربية
            </motion.p>
            <IslamicPattern type="divider" className="max-w-md mx-auto mt-4" />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <AICulturalAssistant />
          </motion.div>
        </div>
      </section>
      
      {/* قسم الموارد التعليمية */}
      <section className="py-16 bg-gradient-to-b from-soothing-lightPurple/20 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold text-kidmam-dark mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              موارد تعليمية وأدوات مساعدة
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              محتوى تعليمي غني وأدوات مفيدة لمساعدتك خلال رحلة الحمل والاستعداد للأمومة
            </motion.p>
            <IslamicPattern type="divider" className="max-w-md mx-auto mt-4" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="fade-on-scroll"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <VideoLibrary />
            </motion.div>
            <motion.div 
              className="fade-on-scroll"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <LanguageTranslator />
            </motion.div>
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
