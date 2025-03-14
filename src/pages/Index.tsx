
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CulturalSection from "@/components/CulturalSection";
import ARSection from "@/components/ARSection";
import PregnancyTracker from "@/components/PregnancyTracker";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import AdminWelcome from "@/components/AdminWelcome";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function Index() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { data } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
          
        if (data && (data.role === 'super' || data.role === 'helper')) {
          setIsAdmin(true);
        }
      }
    };
    
    checkAdminStatus();
  }, []);
  
  const goToAdminLogin = () => {
    navigate('/admin-login');
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {isAdmin && <AdminWelcome />}
      
      <Hero />
      <Features />
      <CulturalSection />
      <ARSection />
      <PregnancyTracker />
      <CallToAction />
      
      <div className="container mx-auto px-4 py-8 text-center">
        <Button 
          variant="outline" 
          className="bg-kidmam-purple/10 border-kidmam-purple/30 text-kidmam-purple hover:bg-kidmam-purple/20"
          onClick={goToAdminLogin}
        >
          دخول المشرفين
        </Button>
      </div>
      
      <Footer />
    </div>
  );
}
