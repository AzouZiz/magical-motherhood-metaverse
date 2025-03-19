
import { motion } from 'framer-motion';
import { Sparkles, Compass, Map, Trees, Castle, MessageCircle, Baby, Volume2, Calendar, Heart, Cloud } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from 'react';

const VirtualWorld = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeScene, setActiveScene] = useState<string | null>(null);
  const [animationPlaying, setAnimationPlaying] = useState(false);

  // هذه الوظيفة ستعرض رسالة عندما تكون الميزة قيد التطوير
  const handleFeatureClick = (featureName: string) => {
    toast({
      title: "قريباً",
      description: `ميزة "${featureName}" قيد التطوير وستكون متاحة قريباً!`,
    });
  };

  // عرض مشهد ثلاثي الأبعاد لتطور الجنين
  const handleSceneView = (sceneName: string) => {
    setActiveScene(sceneName);
    setAnimationPlaying(true);
    toast({
      title: "تم تنشيط المشهد",
      description: `تم تفعيل مشهد "${sceneName}". استخدم زر العودة للرجوع إلى القائمة الرئيسية.`,
    });
  };

  // العودة إلى الشاشة الرئيسية من المشهد النشط
  const handleReturnFromScene = () => {
    setAnimationPlaying(false);
    
    // تأخير إزالة المشهد النشط لإكمال التأثير المرئي
    setTimeout(() => {
      setActiveScene(null);
    }, 500);
  };

  // لاختبار معالجة التفاعل مع صوت المستخدم
  useEffect(() => {
    if (activeScene) {
      const timer = setTimeout(() => {
        // محاكاة نتائج تحليل الصوت لتجربة المستخدم
        if (activeScene === 'relaxation') {
          toast({
            title: "تم اكتشاف مستوى التوتر",
            description: "تم تعديل الموسيقى والإضاءة بناءً على مستوى التوتر المكتشف.",
          });
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [activeScene, toast]);

  // عرض مشهد نشط بدلاً من الصفحة الرئيسية
  if (activeScene) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-kidmam-light to-background dark:from-kidmam-dark dark:to-background overflow-hidden">
        <motion.div 
          className="h-screen w-full flex flex-col items-center justify-center p-6 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: animationPlaying ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* خلفية متحركة بتأثير الشفافية */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, index) => (
              <motion.div
                key={index}
                className="absolute rounded-full bg-white/5 backdrop-blur-sm"
                style={{
                  width: Math.random() * 300 + 50,
                  height: Math.random() * 300 + 50,
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                animate={{
                  x: [
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerWidth,
                  ],
                  y: [
                    Math.random() * window.innerHeight,
                    Math.random() * window.innerHeight,
                  ],
                }}
                transition={{
                  duration: Math.random() * 50 + 30,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>
          
          {/* محتوى المشهد النشط */}
          <Card className="w-full max-w-4xl bg-white/80 dark:bg-kidmam-dark/80 backdrop-blur-xl border-kidmam-purple/20 shadow-lg z-10">
            <CardHeader className="text-center border-b border-kidmam-purple/10 pb-4">
              <CardTitle className="text-2xl font-amiri">
                {activeScene === 'fetus' && 'تطور الجنين - مشهد ثلاثي الأبعاد'}
                {activeScene === 'relaxation' && 'جلسة استرخاء افتراضية'}
                {activeScene === 'yoga' && 'تمارين اليوغا للحامل'}
              </CardTitle>
              <CardDescription>
                {activeScene === 'fetus' && 'شاهدي نمو طفلك بدقة عالية في عرض ثلاثي الأبعاد'}
                {activeScene === 'relaxation' && 'استمتعي بجلسة استرخاء كاملة مع مؤثرات صوتية مهدئة'}
                {activeScene === 'yoga' && 'تابعي حركات اليوغا المناسبة لمرحلة الحمل الخاصة بك'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="aspect-video bg-black/10 dark:bg-black/30 rounded-lg overflow-hidden mb-6 relative">
                {/* مشهد تفاعلي لتطور الجنين */}
                {activeScene === 'fetus' && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="relative">
                      <motion.div
                        className="w-40 h-40 rounded-full bg-kidmam-purple/20 absolute z-0"
                        animate={{ 
                          scale: [1, 1.1, 1],
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      />
                      <motion.div
                        className="w-32 h-32 rounded-full bg-kidmam-teal/20 absolute z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        animate={{ 
                          scale: [1, 1.2, 1],
                        }}
                        transition={{ 
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5
                        }}
                      />
                      <motion.div 
                        className="z-10 relative"
                        animate={{ 
                          rotate: [0, 5, 0, -5, 0],
                          y: [0, -5, 0, 5, 0] 
                        }}
                        transition={{ 
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      >
                        <Baby className="h-24 w-24 text-kidmam-purple" />
                      </motion.div>
                      <motion.div
                        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-center bg-white/80 rounded-full px-3 py-1 text-xs font-medium text-kidmam-purple"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      >
                        انقري للتكبير
                      </motion.div>
                    </div>
                  </div>
                )}
                
                {/* مشهد الاسترخاء */}
                {activeScene === 'relaxation' && (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-kidmam-teal/30 to-kidmam-purple/30">
                    <div className="relative">
                      {/* موجات متحركة للاسترخاء */}
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute rounded-full border border-white/30"
                          style={{
                            left: '50%',
                            top: '50%',
                            translateX: '-50%',
                            translateY: '-50%',
                            width: 50 + i * 30,
                            height: 50 + i * 30,
                          }}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.2, 0.5, 0.2],
                          }}
                          transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                      
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="z-10 relative"
                      >
                        <Volume2 className="h-16 w-16 text-white" />
                      </motion.div>
                    </div>
                  </div>
                )}
                
                {/* مشهد اليوغا */}
                {activeScene === 'yoga' && (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-kidmam-gold/30 to-kidmam-rose/30">
                    <div className="text-center">
                      <motion.div
                        animate={{ 
                          y: [0, -10, 0],
                          rotate: [0, 5, 0] 
                        }}
                        transition={{ 
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      >
                        <div className="relative">
                          <div className="absolute top-5 right-5 h-10 w-10 rounded-full bg-kidmam-gold/50 animate-pulse" />
                          <div className="absolute -top-2 -left-2 h-6 w-6 rounded-full bg-kidmam-rose/50 animate-pulse" />
                          <Heart className="h-20 w-20 text-white" />
                        </div>
                      </motion.div>
                      <p className="mt-4 text-white font-medium">تنفسي بعمق وببطء</p>
                    </div>
                  </div>
                )}
                
                {/* تراكب عناصر التحكم */}
                <div className="absolute bottom-4 right-4 flex space-x-2 rtl:space-x-reverse">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white/80 hover:bg-white border-none"
                    onClick={() => handleFeatureClick("تكبير العرض")}
                  >
                    <span className="ml-1">تكبير</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white/80 hover:bg-white border-none"
                    onClick={() => handleFeatureClick("مشاركة")}
                  >
                    <span className="ml-1">مشاركة</span>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">كيفية التفاعل</h3>
                  <p className="text-sm text-muted-foreground">
                    {activeScene === 'fetus' && 'يمكنك استخدام الإيماءات والصوت للتفاعل مع النموذج. جربي القول "تكبير" أو "تدوير النموذج".'}
                    {activeScene === 'relaxation' && 'الجلسة ستتكيف تلقائياً مع مستوى التوتر الذي يتم اكتشافه في صوتك وتعبيرات وجهك.'}
                    {activeScene === 'yoga' && 'ستظهر التمارين المناسبة لأسبوع الحمل الخاص بك. اتبعي الإرشادات الصوتية للحركات الصحيحة.'}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-kidmam-teal/50 text-kidmam-teal"
                    onClick={() => handleFeatureClick("تحميل المشهد")}
                  >
                    <Cloud className="h-4 w-4 ml-2" />
                    تحميل على هاتفك
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-kidmam-rose/50 text-kidmam-rose"
                    onClick={() => handleFeatureClick("الاسترخاء الصوتي")}
                  >
                    <Volume2 className="h-4 w-4 ml-2" />
                    تشغيل الصوت
                  </Button>
                  
                  {activeScene === 'fetus' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-kidmam-gold/50 text-kidmam-gold"
                      onClick={() => handleFeatureClick("التقاط صورة")}
                    >
                      <Calendar className="h-4 w-4 ml-2" />
                      تغيير الأسبوع
                    </Button>
                  )}
                </div>
                
                <Button 
                  className="w-full mt-4"
                  onClick={handleReturnFromScene}
                  variant="outline"
                >
                  العودة إلى عالم أرض الأرحام
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-kidmam-light to-background dark:from-kidmam-dark dark:to-background overflow-x-hidden">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-amiri font-bold mb-4 text-kidmam-purple">
              أرض الأرحام
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              استكشفي عالمنا الافتراضي المليء بالمعرفة والترابط الاجتماعي المخصص للأمهات
            </p>
            <div className="inline-block relative">
              <Sparkles className="h-5 w-5 text-kidmam-gold absolute -top-2 -right-2 animate-pulse" />
              <Button 
                onClick={() => handleFeatureClick("تجربة الواقع المعزز")}
                className="bg-gradient-to-r from-kidmam-purple to-kidmam-teal hover:opacity-90 text-white"
              >
                ابدئي المغامرة في الواقع المعزز
              </Button>
            </div>
          </motion.div>
        </div>

        {/* قسم المشاهد الثلاثية الأبعاد */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="mb-8">
            <h2 className="text-2xl font-amiri font-bold text-kidmam-purple mb-6 text-center">
              تجارب ثلاثية الأبعاد
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card className="hover:shadow-lg hover:border-kidmam-purple/30 transition-all overflow-hidden bg-white/80 backdrop-blur-sm">
                <div className="relative h-48 bg-gradient-to-br from-kidmam-purple/20 to-kidmam-teal/20 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      y: [0, -5, 0], 
                      rotate: [0, 5, 0, -5, 0] 
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    <Baby className="h-16 w-16 text-kidmam-purple" />
                  </motion.div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-amiri">تطور الجنين ثلاثي الأبعاد</CardTitle>
                  <CardDescription>
                    مشاهدة مفصلة لتطور طفلك في كل أسبوع من الحمل بتقنية ثلاثية الأبعاد
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-kidmam-purple/10 hover:bg-kidmam-purple/20 text-kidmam-purple"
                    onClick={() => handleSceneView('fetus')}
                  >
                    استكشاف التطور ثلاثي الأبعاد
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg hover:border-kidmam-teal/30 transition-all overflow-hidden bg-white/80 backdrop-blur-sm">
                <div className="relative h-48 bg-gradient-to-br from-kidmam-teal/20 to-kidmam-purple/20 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1], 
                      opacity: [0.7, 1, 0.7] 
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    <Volume2 className="h-16 w-16 text-kidmam-teal" />
                  </motion.div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-amiri">جلسات الاسترخاء الغامرة</CardTitle>
                  <CardDescription>
                    تمتعي بتجربة استرخاء كاملة مع مؤثرات صوتية وبصرية تساعد على تقليل التوتر
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-kidmam-teal/10 hover:bg-kidmam-teal/20 text-kidmam-teal"
                    onClick={() => handleSceneView('relaxation')}
                  >
                    بدء جلسة استرخاء
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg hover:border-kidmam-gold/30 transition-all overflow-hidden bg-white/80 backdrop-blur-sm">
                <div className="relative h-48 bg-gradient-to-br from-kidmam-gold/20 to-kidmam-rose/20 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, 0] 
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    <Heart className="h-16 w-16 text-kidmam-rose" />
                  </motion.div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-amiri">يوغا الحمل ثلاثية الأبعاد</CardTitle>
                  <CardDescription>
                    تمارين يوغا مخصصة لمراحل الحمل المختلفة مع مدربة افتراضية
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-kidmam-rose/10 hover:bg-kidmam-rose/20 text-kidmam-rose"
                    onClick={() => handleSceneView('yoga')}
                  >
                    بدء جلسة اليوغا
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* العوالم الافتراضية */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="h-full hover:shadow-lg hover:border-kidmam-purple/30 transition-all overflow-hidden bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="mb-3 p-3 inline-block rounded-full bg-kidmam-purple/10">
                  <Trees className="h-8 w-8 text-kidmam-teal" />
                </div>
                <CardTitle className="text-xl font-amiri">غابة النصائح</CardTitle>
                <CardDescription>
                  استكشفي غابة مليئة بأشجار المعرفة التي تنتج ثماراً من النصائح والفيديوهات التعليمية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full border-kidmam-teal/50 text-kidmam-teal hover:bg-kidmam-teal/10"
                  onClick={() => handleFeatureClick("غابة النصائح")}
                >
                  <Compass className="h-4 w-4 ml-2" />
                  استكشاف الغابة
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full hover:shadow-lg hover:border-kidmam-purple/30 transition-all overflow-hidden bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="mb-3 p-3 inline-block rounded-full bg-kidmam-purple/10">
                  <Map className="h-8 w-8 text-kidmam-gold" />
                </div>
                <CardTitle className="text-xl font-amiri">نهر التراث</CardTitle>
                <CardDescription>
                  اكتشفي تقاليد وعادات الحمل العربية التاريخية في رحلة عبر نهر التراث
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full border-kidmam-gold/50 text-kidmam-gold hover:bg-kidmam-gold/10"
                  onClick={() => handleFeatureClick("نهر التراث")}
                >
                  <Compass className="h-4 w-4 ml-2" />
                  العبور في النهر
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="h-full hover:shadow-lg hover:border-kidmam-purple/30 transition-all overflow-hidden bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="mb-3 p-3 inline-block rounded-full bg-kidmam-purple/10">
                  <Castle className="h-8 w-8 text-kidmam-rose" />
                </div>
                <CardTitle className="text-xl font-amiri">قاعة أم النور</CardTitle>
                <CardDescription>
                  احضري مؤتمرات افتراضية في قاعة مستوحاة من قصر الحمراء مع أمهات من جميع أنحاء العالم العربي
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full border-kidmam-rose/50 text-kidmam-rose hover:bg-kidmam-rose/10"
                  onClick={() => handleFeatureClick("قاعة أم النور")}
                >
                  <MessageCircle className="h-4 w-4 ml-2" />
                  حضور جلسة قادمة
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-kidmam-purple/20 mb-12"
        >
          <h2 className="text-2xl font-amiri font-bold text-kidmam-purple mb-4">تجربة الميتافيرس قادمة</h2>
          <p className="mb-4">
            نعمل حالياً على تطوير تجربة ميتافيرس كاملة ستتيح لك:
          </p>
          <ul className="space-y-2 mb-6 pr-5">
            <li className="flex items-start">
              <span className="bg-kidmam-teal/20 text-kidmam-teal p-1 rounded-full flex-shrink-0 ml-2 mt-1">
                <Sparkles className="h-4 w-4" />
              </span>
              <span>إنشاء وتخصيص أفاتار ثلاثي الأبعاد يمثلك أنت وجنينك</span>
            </li>
            <li className="flex items-start">
              <span className="bg-kidmam-purple/20 text-kidmam-purple p-1 rounded-full flex-shrink-0 ml-2 mt-1">
                <Sparkles className="h-4 w-4" />
              </span>
              <span>التفاعل مع أمهات آخريات في بيئة غامرة</span>
            </li>
            <li className="flex items-start">
              <span className="bg-kidmam-gold/20 text-kidmam-gold p-1 rounded-full flex-shrink-0 ml-2 mt-1">
                <Sparkles className="h-4 w-4" />
              </span>
              <span>حضور جلسات تعليمية ومؤتمرات افتراضية مع خبراء</span>
            </li>
          </ul>
          <Button 
            className="bg-gradient-to-r from-kidmam-gold to-kidmam-purple hover:opacity-90 text-white"
            onClick={() => handleFeatureClick("التسجيل المبكر للميتافيرس")}
          >
            سجلي مبكراً للميتافيرس
          </Button>
        </motion.div>

        <div className="text-center mt-8">
          <Button 
            variant="outline"
            onClick={() => navigate('/')}
            className="border-kidmam-purple/50 text-kidmam-purple hover:bg-kidmam-purple/10"
          >
            العودة إلى الصفحة الرئيسية
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VirtualWorld;
