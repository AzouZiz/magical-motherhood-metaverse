
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Baby, Plus, Minus, Cube } from 'lucide-react';
import FetusThreedModel from './FetusThreedModel';

const PregnancyTracker = () => {
  const [weekNumber, setWeekNumber] = useState(12);
  const [showThreedModel, setShowThreedModel] = useState(false);
  const totalWeeks = 40;
  
  const increaseWeek = () => {
    if (weekNumber < totalWeeks) {
      setWeekNumber(weekNumber + 1);
    }
  };
  
  const decreaseWeek = () => {
    if (weekNumber > 1) {
      setWeekNumber(weekNumber - 1);
    }
  };

  // Simulated data for fetus development
  const getFetusDevelopment = (week: number) => {
    const developmentStages = {
      size: week < 10 ? `${week * 0.5} سم` : `${Math.min(50, week * 1.2)} سم`,
      weight: week < 10 ? `${week * 3} جرام` : `${Math.min(3500, week * 30)} جرام`,
      highlights: [
        week < 8 ? "تشكل الأعضاء الرئيسية" : "نمو الأطراف والأصابع",
        week < 20 ? "تطور الدماغ والجهاز العصبي" : "نمو الشعر والأظافر",
        week > 25 ? "تطور الرئتين والجهاز التنفسي" : "تشكل ملامح الوجه"
      ],
      trimester: week <= 13 ? "الأول" : week <= 26 ? "الثاني" : "الثالث"
    };
    
    return developmentStages;
  };
  
  const fetusDevelopment = getFetusDevelopment(weekNumber);
  
  // Calculate progress percentage
  const progressPercentage = (weekNumber / totalWeeks) * 100;

  return (
    <section className="py-16 relative overflow-hidden bg-background">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-kidmam-teal/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-kidmam-purple/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">تتبع تطور الحمل</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            تابعي نمو طفلك أسبوعًا بأسبوع مع تقنيات التصور المتقدمة والمعلومات الدقيقة
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual Representation */}
          <div className="order-2 lg:order-1">
            <motion.div 
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {showThreedModel ? (
                // عرض النموذج ثلاثي الأبعاد
                <div className="mb-8">
                  <FetusThreedModel weekNumber={weekNumber} className="min-h-[350px]" />
                  <div className="mt-4 text-center">
                    <Button
                      variant="outline"
                      onClick={() => setShowThreedModel(false)}
                      className="text-kidmam-purple border-kidmam-purple/50 hover:bg-kidmam-purple/10"
                    >
                      العودة إلى العرض التقليدي
                    </Button>
                  </div>
                </div>
              ) : (
                // عرض المؤشر الدائري التقليدي
                <>
                  {/* Circular Progress */}
                  <div className="relative w-72 h-72 mx-auto">
                    <svg width="300" height="300" viewBox="0 0 100 100" className="transform -rotate-90">
                      {/* Background Circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="rgba(226, 232, 240, 0.6)"
                        strokeWidth="8"
                      />
                      {/* Progress Circle */}
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        strokeDasharray="282.7"
                        initial={{ strokeDashoffset: 282.7 }}
                        animate={{ 
                          strokeDashoffset: 282.7 - (282.7 * progressPercentage / 100) 
                        }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        strokeLinecap="round"
                      />
                      {/* Gradient Definition */}
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#9b6dff" />
                          <stop offset="100%" stopColor="#4fd1c5" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Center Content */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <div className="relative">
                        <motion.div
                          key={weekNumber}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="mb-2"
                        >
                          <span className="text-5xl font-bold gradient-text">{weekNumber}</span>
                        </motion.div>
                        <p className="text-muted-foreground text-sm">من أصل {totalWeeks} أسبوع</p>
                        <p className="text-sm font-medium mt-2">الثلث {fetusDevelopment.trimester}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Baby Icon with Animation */}
                  <motion.div 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="bg-white dark:bg-kidmam-dark p-4 rounded-full shadow-lg border border-kidmam-purple/30">
                      <Baby className="h-8 w-8 text-kidmam-purple" />
                    </div>
                  </motion.div>
                  
                  {/* زر عرض النموذج ثلاثي الأبعاد */}
                  <div className="text-center mt-24">
                    <Button
                      onClick={() => setShowThreedModel(true)}
                      className="bg-gradient-to-r from-kidmam-purple to-kidmam-teal text-white"
                    >
                      <Cube className="h-4 w-4 mr-2" />
                      عرض نموذج ثلاثي الأبعاد
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
            
            {/* Week Controls */}
            <div className="mt-8 max-w-md mx-auto">
              <div className="flex items-center justify-between mb-4">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={decreaseWeek}
                  disabled={weekNumber <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="text-center">
                  <span className="text-lg font-medium">الأسبوع {weekNumber}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={increaseWeek}
                  disabled={weekNumber >= totalWeeks}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <Slider
                value={[weekNumber]}
                min={1}
                max={totalWeeks}
                step={1}
                onValueChange={(value) => setWeekNumber(value[0])}
                className="my-4"
              />
              
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>الأسبوع 1</span>
                <span>الأسبوع {totalWeeks}</span>
              </div>
            </div>
          </div>
          
          {/* Development Information */}
          <div className="order-1 lg:order-2">
            <Card className="glass-card">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <motion.div
                    key={`title-${weekNumber}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold mb-4">
                      طفلك في الأسبوع {weekNumber}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      تعرفي على تطور طفلك وما يحدث في هذه المرحلة من الحمل
                    </p>
                  </motion.div>
                  
                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <motion.div
                      key={`size-${weekNumber}`}
                      className="bg-muted/40 p-4 rounded-lg text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <p className="text-sm text-muted-foreground mb-1">الحجم</p>
                      <p className="text-xl font-bold gradient-text">{fetusDevelopment.size}</p>
                    </motion.div>
                    
                    <motion.div
                      key={`weight-${weekNumber}`}
                      className="bg-muted/40 p-4 rounded-lg text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <p className="text-sm text-muted-foreground mb-1">الوزن</p>
                      <p className="text-xl font-bold gradient-text">{fetusDevelopment.weight}</p>
                    </motion.div>
                  </div>
                  
                  {/* Development Highlights */}
                  <div>
                    <h4 className="font-medium mb-3">أبرز التطورات</h4>
                    <ul className="space-y-2">
                      {fetusDevelopment.highlights.map((highlight, index) => (
                        <motion.li
                          key={`highlight-${weekNumber}-${index}`}
                          className="flex items-start"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                        >
                          <span className="inline-block w-2 h-2 mt-2 mr-2 bg-kidmam-purple rounded-full"></span>
                          <span>{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Call to Action */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  >
                    <Button className="w-full bg-gradient-to-r from-kidmam-purple to-kidmam-teal text-white">
                      عرض التفاصيل الكاملة
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PregnancyTracker;
