
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Baby, Plus, Minus, Box, Eye, EyeOff, Info } from 'lucide-react';
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FetusThreedModel from './FetusThreedModel';
import { Alert, AlertDescription } from "@/components/ui/alert";

const PregnancyTracker = () => {
  const [weekNumber, setWeekNumber] = useState(12);
  const [showThreedModel, setShowThreedModel] = useState(false);
  const [viewMode, setViewMode] = useState<'realistic' | '3d'>('realistic');
  const [visualizationView, setVisualizationView] = useState<'fetus' | 'womb'>('fetus');
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

  const getFetusDevelopment = (week: number) => {
    const developmentStages = {
      size: week < 10 ? `${week * 0.5} سم` : `${Math.min(50, week * 1.2)} سم`,
      weight: week < 10 ? `${week * 3} جرام` : `${Math.min(3500, week * 30)} جرام`,
      highlights: [
        week < 8 ? "تشكل الأعضاء الرئيسية" : "نمو الأطراف والأصابع",
        week < 20 ? "تطور الدماغ والجهاز العصبي" : "نمو الشعر والأظافر",
        week > 25 ? "تطور الرئتين والجهاز التنفسي" : "تشكل ملامح الوجه"
      ],
      trimester: week <= 13 ? "الأول" : week <= 26 ? "الثاني" : "الثالث",
      description: getWeekDescription(week)
    };
    
    return developmentStages;
  };

  // Get detailed description for each week
  const getWeekDescription = (week: number) => {
    const descriptions: Record<number, string> = {
      4: "يبدأ قلب الجنين في النبض وتتشكل الأعضاء الأساسية مثل الدماغ والعمود الفقري.",
      8: "يكتمل تشكل جميع الأعضاء الرئيسية، ويمكن ملاحظة حركة صغيرة للأطراف.",
      12: "يمكن للجنين أن يغلق أصابعه ويفتحها، كما تظهر ملامح الوجه بشكل أوضح.",
      16: "يكتمل نمو الأعضاء التناسلية ويمكن تحديد جنس الجنين، تظهر بصمات الأصابع.",
      20: "يمكن للأم الشعور بحركة الجنين، ويتطور نظام السمع لدى الجنين.",
      24: "تتكون الرئتين وتتطور، ويستطيع الجنين فتح عينيه والإستجابة للأصوات الخارجية.",
      28: "يستطيع الجنين التنفس ولديه فرصة للبقاء على قيد الحياة في حالة الولادة المبكرة.",
      32: "يزداد نمو الدماغ بسرعة، ويزداد وزن الجنين بشكل كبير.",
      36: "يكتمل نمو الرئتين، ويستعد الجنين للولادة.",
      40: "الجنين مكتمل النمو ومستعد للولادة."
    };
    
    // Find the closest week in the descriptions
    const closestWeek = Object.keys(descriptions)
      .map(w => parseInt(w))
      .reduce((prev, curr) => 
        Math.abs(curr - week) < Math.abs(prev - week) ? curr : prev
      );
      
    return descriptions[closestWeek];
  };
  
  const fetusDevelopment = getFetusDevelopment(weekNumber);
  
  const progressPercentage = (weekNumber / totalWeeks) * 100;

  // تحديد صورة الجنين المناسبة حسب الأسبوع
  const getFetalImage = (week: number) => {
    if (week <= 4) return "/images/fetus-week-4.jpg";
    if (week <= 8) return "/images/fetus-week-8.jpg";
    if (week <= 10) return "/images/fetus-week-10.jpg";
    if (week <= 12) return "/images/fetus-week-12.jpg";
    if (week <= 16) return "/images/fetus-week-16.jpg";
    if (week <= 20) return "/images/fetus-week-20.jpg";
    if (week <= 24) return "/images/fetus-week-24.jpg";
    if (week <= 28) return "/images/fetus-week-28.jpg";
    if (week <= 32) return "/images/fetus-week-32.jpg";
    return "/images/fetus-week-40.jpg";
  };

  return (
    <section className="py-16 relative overflow-hidden bg-background" id="pregnancy-tracker">
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
          <div className="order-2 lg:order-1">
            <motion.div 
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center gap-3 mb-6">
                <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'realistic' | '3d')}>
                  <ToggleGroupItem value="realistic" className="px-4">
                    واقعي
                  </ToggleGroupItem>
                  <ToggleGroupItem value="3d" className="px-4">
                    ثلاثي الأبعاد
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              
              {viewMode === '3d' ? (
                <div className="mb-8">
                  <Alert className="mb-4 bg-kidmam-teal/10 text-kidmam-teal border-kidmam-teal/20">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      هذا نموذج توضيحي فقط. للحصول على نماذج واقعية أكثر، سيتم إضافة نماذج مصممة بدقة بواسطة خبراء في المستقبل.
                    </AlertDescription>
                  </Alert>

                  <div className="flex justify-center mb-4">
                    <RadioGroup 
                      className="flex flex-row gap-4" 
                      defaultValue="fetus"
                      value={visualizationView}
                      onValueChange={(value) => setVisualizationView(value as 'fetus' | 'womb')}
                    >
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="fetus" id="fetus" />
                        <label htmlFor="fetus" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          الجنين فقط
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="womb" id="womb" />
                        <label htmlFor="womb" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          داخل الرحم
                        </label>
                      </div>
                    </RadioGroup>
                  </div>
                
                  <FetusThreedModel 
                    weekNumber={weekNumber} 
                    className="min-h-[350px]" 
                    showInWomb={visualizationView === 'womb'}
                  />
                  
                  <div className="mt-4 text-center space-y-4">
                    <p className="text-muted-foreground text-sm">
                      هذا نموذج تقريبي. النماذج الأكثر واقعية تتطلب نماذج ثلاثية الأبعاد مصممة احترافيًا.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setViewMode('realistic')}
                      className="text-kidmam-purple border-kidmam-purple/50 hover:bg-kidmam-purple/10"
                    >
                      العودة إلى العرض التقليدي
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative w-72 h-72 mx-auto">
                    <svg width="300" height="300" viewBox="0 0 100 100" className="transform -rotate-90">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="rgba(226, 232, 240, 0.6)"
                        strokeWidth="8"
                      />
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
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#9b6dff" />
                          <stop offset="100%" stopColor="#4fd1c5" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <motion.div
                        key={weekNumber}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-2 bg-white/90 p-1 border border-kidmam-purple/30 shadow-lg"
                      >
                        <img 
                          src={getFetalImage(weekNumber)} 
                          alt={`جنين في الأسبوع ${weekNumber}`} 
                          className="w-full h-full object-cover rounded-full"
                        />
                      </motion.div>
                      <p className="text-muted-foreground text-sm">الأسبوع {weekNumber} من أصل {totalWeeks} أسبوع</p>
                      <p className="text-sm font-medium mt-2">الثلث {fetusDevelopment.trimester}</p>
                    </div>
                  </div>
                  
                  <div className="text-center mt-24">
                    <Button
                      onClick={() => setViewMode('3d')}
                      className="bg-gradient-to-r from-kidmam-purple to-kidmam-teal text-white"
                    >
                      <Box className="h-4 w-4 mr-2" />
                      عرض نموذج ثلاثي الأبعاد
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
            
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
                      {fetusDevelopment.description}
                    </p>
                  </motion.div>
                  
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
