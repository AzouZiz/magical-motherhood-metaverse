
import { motion } from 'framer-motion';
import { Sparkles, Compass, Map, Trees, Castle, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const VirtualWorld = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // هذه الوظيفة ستعرض رسالة عندما تكون الميزة قيد التطوير
  const handleFeatureClick = (featureName: string) => {
    toast({
      title: "قريباً",
      description: `ميزة "${featureName}" قيد التطوير وستكون متاحة قريباً!`,
    });
  };

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
