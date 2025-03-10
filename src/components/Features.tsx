
import { BrainCircuit, Baby, Globe, HeartHandshake, Sparkles, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const Features = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const features = [
    {
      title: "الذكاء الاصطناعي الشمولي",
      description: "7 طبقات ذكاء تشمل الطبي، العاطفي، الثقافي، التنبؤي، الإبداعي، الاجتماعي والروحاني",
      icon: <BrainCircuit className="h-10 w-10 text-kidmam-purple" />,
      action: "استكشاف الذكاء الاصطناعي",
      path: "/profile"
    },
    {
      title: "العالم الافتراضي",
      description: "عالم افتراضي \"أرض الأرحام\" يسمح للمستخدمة بالتجول واستكشاف غابة النصائح ونهر التراث",
      icon: <Globe className="h-10 w-10 text-kidmam-teal" />,
      action: "استكشاف العالم الافتراضي",
      path: "/virtual-world"
    },
    {
      title: "الهوية الرقمية المزدوجة",
      description: "هوية عامة لتفاعلات المجتمع، وهوية سرية مشفرة للبيانات الطبية وتجربة شخصية خاصة",
      icon: <UserCircle className="h-10 w-10 text-kidmam-gold" />,
      action: "إنشاء هويتك",
      path: "/profile"
    },
    {
      title: "نظام الحمل التفاعلي الحي",
      description: "تكامل مع الواقع المادي من خلال شركاء استراتيجيين ومستشفيات ومطاعم ذكية",
      icon: <HeartHandshake className="h-10 w-10 text-kidmam-rose" />,
      action: "الشركاء الاستراتيجيون",
      comingSoon: true
    },
    {
      title: "محتوى اللا محدود",
      description: "نظام يولد محتوى ديناميكي لا يتكرر أبدًا من فيديوهات قصيرة وبودكاست تفاعلي",
      icon: <Sparkles className="h-10 w-10 text-kidmam-purple" />,
      action: "استكشاف المحتوى",
      path: "/community" 
    },
    {
      title: "المعجزة",
      description: "زر خاص يتيح مرة واحدة في الحمل رؤية صورة AI لطفلك مستقبلًا وأغنية مخصصة باللهجة المحلية",
      icon: <Baby className="h-10 w-10 text-kidmam-teal" />,
      action: "اكتشاف المعجزة",
      comingSoon: true
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      }
    })
  };

  const handleAction = (feature: typeof features[0]) => {
    if (feature.comingSoon) {
      toast({
        title: "قريباً",
        description: `ميزة "${feature.title}" قيد التطوير وستكون متاحة قريباً!`,
      });
    } else if (feature.path) {
      navigate(feature.path);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-kidmam-light/30 dark:to-background/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-amiri">
            <span className="text-kidmam-purple">ميزات ثورية</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            تمتع بتجربة لا مثيل لها مع ميزاتنا الفريدة التي تجمع بين التكنولوجيا المتقدمة والثقافة العربية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <Card className="h-full transition-all hover:shadow-lg hover:border-kidmam-purple/50 overflow-hidden group glass-card">
                <CardHeader>
                  <div className="mb-3 p-3 inline-block rounded-full bg-muted group-hover:bg-kidmam-purple/10 transition-colors">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full mt-2"
                    onClick={() => handleAction(feature)}
                  >
                    {feature.action}
                    {feature.comingSoon && <span className="mr-2 text-xs bg-kidmam-purple/20 text-kidmam-purple px-2 py-0.5 rounded-full">قريباً</span>}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
