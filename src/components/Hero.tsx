
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Baby, HeartPulse, Users, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 arab-pattern-bg opacity-40"></div>
      
      {/* Purple Glow */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-kidmam-purple/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-kidmam-teal/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-right rtl:md:text-left">
            <h1 className="font-amiri text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">كيدمام</span>
              <br />
              <span className="text-foreground">عالم الأمومة السحري الذكي</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              أول ميتافيرس متكامل للحمل والأمومة في العالم العربي، مع ميزات ثورية تجعل التطبيق أكثر من مجرد أداة... بل رفيقًا عاطفيًّا، مُرشدًا طبيًّا، ومُنصةً اجتماعيةً ثقافيةً فريدة.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start rtl:md:justify-end">
              <Button className="btn-primary" size="lg">
                ابدئي رحلتك الآن
              </Button>
              <Button variant="outline" size="lg">
                استكشفي المزيد
              </Button>
            </div>
          </div>

          {/* 3D/Illustrated Pregnant Woman */}
          <div className="md:w-1/2 flex justify-center">
            <div 
              className="relative w-80 h-80"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Circle Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-kidmam-purple/10 to-kidmam-teal/10 rounded-full animate-pulse-gentle"></div>
              
              {/* Animated Mother Figure (placeholder) */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative w-64 h-64 bg-gradient-to-b from-kidmam-purple/80 to-kidmam-teal/80 rounded-full overflow-hidden flex items-center justify-center shadow-lg">
                  <span className="text-white text-9xl">👩‍🍼</span>
                  
                  {/* Baby Glow Animation */}
                  {isHovered && (
                    <motion.div 
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-kidmam-gold/40 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 1 }}
                    >
                      <div className="absolute inset-0 rounded-full animate-pulse-gentle bg-kidmam-gold/40"></div>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Orbiting Elements */}
              <motion.div 
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: 'center 200px' }}
              >
                <Baby className="h-5 w-5 text-kidmam-purple" />
              </motion.div>

              <motion.div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: 'center -200px' }}
              >
                <HeartPulse className="h-5 w-5 text-kidmam-rose" />
              </motion.div>

              <motion.div 
                className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: '200px center' }}
              >
                <Users className="h-5 w-5 text-kidmam-teal" />
              </motion.div>

              <motion.div 
                className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: '-200px center' }}
              >
                <BrainCircuit className="h-5 w-5 text-kidmam-gold" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
