
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ScanFace, Baby, Phone } from 'lucide-react';

const ARSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 arab-pattern-bg opacity-20"></div>
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-kidmam-purple/5 to-kidmam-teal/5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* AR Visual */}
          <div className="lg:w-1/2 order-2 lg:order-1">
            <div 
              className="relative w-full max-w-lg mx-auto"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Phone Frame */}
              <div className="relative border-8 border-kidmam-dark/10 rounded-[40px] shadow-xl overflow-hidden aspect-[9/19] mx-auto">
                {/* Screen Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-kidmam-purple/20 to-kidmam-teal/20"></div>
                
                {/* AR Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* AR Grid Effect */}
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(155,109,255,0.15)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                  
                  {/* Baby Visualization Placeholder */}
                  <motion.div 
                    className="relative w-40 h-40 bg-white/10 rounded-full backdrop-blur-sm border border-white/30 flex items-center justify-center"
                    animate={{ 
                      scale: isHovered ? [1, 1.05, 1] : 1,
                      rotate: isHovered ? [0, -5, 5, 0] : 0
                    }}
                    transition={{ 
                      duration: isHovered ? 2 : 0.5,
                      repeat: isHovered ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  >
                    <Baby className="h-24 w-24 text-white/70" />
                    
                    {/* Scanning Lines */}
                    {isHovered && (
                      <motion.div 
                        className="absolute inset-0 overflow-hidden rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <motion.div 
                          className="h-full w-full bg-gradient-to-b from-transparent via-kidmam-purple/30 to-transparent"
                          animate={{ y: [-100, 100, -100] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.div>
                    )}
                  </motion.div>
                  
                  {/* AR Markers */}
                  <motion.div 
                    className="absolute top-1/4 right-1/4 w-3 h-3 border-2 border-kidmam-teal/70 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div 
                    className="absolute bottom-1/3 left-1/4 w-3 h-3 border-2 border-kidmam-gold/70 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.div 
                    className="absolute top-1/2 left-1/3 w-3 h-3 border-2 border-kidmam-purple/70 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                  
                  {/* AR UI Elements */}
                  <div className="absolute top-8 left-0 right-0 flex justify-center">
                    <div className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm flex items-center">
                      <ScanFace className="h-4 w-4 mr-2" />
                      <span>استكشاف الجنين</span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                    {isHovered ? (
                      <motion.div 
                        className="bg-kidmam-purple/80 backdrop-blur-sm px-6 py-2 rounded-full text-white text-sm"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        تم الكشف عن الجنين
                      </motion.div>
                    ) : (
                      <div className="bg-black/40 backdrop-blur-sm px-6 py-2 rounded-full text-white/90 text-sm">
                        وجّه الكاميرا نحو البطن
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Phone Stand Shadow */}
              <div className="w-32 h-4 bg-black/10 rounded-full mx-auto mt-4 blur-sm"></div>
              
              {/* AR Feature Label */}
              <div className="absolute -right-20 top-1/3 transform rotate-12">
                <motion.div 
                  className="bg-kidmam-purple/90 text-white px-4 py-2 rounded-lg shadow-lg"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Phone className="h-4 w-4 inline-block mr-1" />
                  <span className="text-sm font-medium">AR تقنية</span>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="lg:w-1/2 order-1 lg:order-2">
            <div className="text-center lg:text-right rtl:lg:text-left space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="gradient-text">رؤية طفلك</span>
                <br />
                <span>قبل ولادته</span>
              </h2>
              
              <p className="text-lg text-muted-foreground">
                باستخدام تقنية الواقع المعزز المتطورة، يمكنك الآن رؤية طفلك وهو ينمو وكأنه أمامك. ما عليك سوى توجيه هاتفك نحو بطنك لتشاهدي معجزة نمو طفلك بتفاصيل ثلاثية الأبعاد مذهلة.
              </p>
              
              <div className="space-y-4 md:space-y-0 md:space-x-4 rtl:space-x-reverse">
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-start rtl:flex-row-reverse space-x-3 rtl:space-x-reverse">
                    <div className="mt-1">
                      <div className="p-1.5 rounded-full bg-kidmam-purple/20">
                        <div className="w-2 h-2 rounded-full bg-kidmam-purple"></div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">رؤية تفاصيل دقيقة</h4>
                      <p className="text-muted-foreground text-sm">شاهدي تفاصيل وجه طفلك وأصابعه وحركاته بدقة عالية</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start rtl:flex-row-reverse space-x-3 rtl:space-x-reverse">
                    <div className="mt-1">
                      <div className="p-1.5 rounded-full bg-kidmam-teal/20">
                        <div className="w-2 h-2 rounded-full bg-kidmam-teal"></div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">تسجيل اللحظات</h4>
                      <p className="text-muted-foreground text-sm">التقطي صورًا وفيديوهات لطفلك لمشاركتها مع العائلة والأصدقاء</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start rtl:flex-row-reverse space-x-3 rtl:space-x-reverse">
                    <div className="mt-1">
                      <div className="p-1.5 rounded-full bg-kidmam-gold/20">
                        <div className="w-2 h-2 rounded-full bg-kidmam-gold"></div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">رؤية المستقبل</h4>
                      <p className="text-muted-foreground text-sm">استخدمي تقنية "المعجزة" لمحاكاة شكل طفلك في سن الخامسة</p>
                    </div>
                  </div>
                </motion.div>
                
                <div className="flex justify-center lg:justify-start rtl:lg:justify-end pt-6">
                  <Button className="btn-primary">تجربة الميزة الآن</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ARSection;
