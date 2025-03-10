
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Sparkles, Utensils, Leaf } from 'lucide-react';

const CulturalSection = () => {
  const [activeTab, setActiveTab] = useState("traditions");
  
  const culturalContent = {
    traditions: [
      {
        title: "الحِجْل المغاربي",
        description: "طقس تقليدي يُمارس في شمال أفريقيا للاحتفال بالحمل، حيث تُزيّن المرأة الحامل بالحناء وتُلبس سوارًا خاصًا (الحِجْل) للحماية والبركة.",
        icon: <Sparkles className="h-5 w-5 text-kidmam-purple" />
      },
      {
        title: "السابوع المصري",
        description: "احتفال يُقام بعد أسبوع من ولادة الطفل، يتضمن رش الملح وإيقاد البخور لطرد العين والحسد، مع غناء أغانٍ تقليدية تُبارك الطفل.",
        icon: <Sparkles className="h-5 w-5 text-kidmam-gold" />
      },
      {
        title: "القماط الشامي",
        description: "عادة قديمة في بلاد الشام تتضمن لف الرضيع بقماش خاص يُعتقد أنه يساعد على استقامة عظامه وحمايته من البرد.",
        icon: <Sparkles className="h-5 w-5 text-kidmam-teal" />
      }
    ],
    nutrition: [
      {
        title: "الحلبة للرضاعة",
        description: "تُستخدم في مختلف أنحاء العالم العربي لتحفيز إدرار الحليب للأمهات المرضعات. تُغلى وتُشرب كمشروب دافئ.",
        icon: <Leaf className="h-5 w-5 text-kidmam-gold" />
      },
      {
        title: "التمر والحليب",
        description: "وصفة غذائية تقليدية للحوامل في الخليج العربي، غنية بالحديد والكالسيوم الضروريين لصحة الأم والجنين.",
        icon: <Utensils className="h-5 w-5 text-kidmam-teal" />
      },
      {
        title: "شوربة العدس",
        description: "طبق شائع في عدة بلدان عربية يُقدم للمرأة بعد الولادة لتعزيز قوتها وتسريع شفائها.",
        icon: <Utensils className="h-5 w-5 text-kidmam-purple" />
      }
    ],
    literature: [
      {
        title: "أناشيد المهد",
        description: "تراث غنائي عريق يتضمن أغانٍ خاصة لتنويم الأطفال، تختلف ألحانها وكلماتها من منطقة لأخرى في العالم العربي.",
        icon: <BookOpen className="h-5 w-5 text-kidmam-purple" />
      },
      {
        title: "قصص الأمثال",
        description: "حكايات تقليدية تُروى للحوامل تتضمن دروسًا وعبرًا عن الأمومة والتربية، تتوارثها الأجيال شفهيًا.",
        icon: <BookOpen className="h-5 w-5 text-kidmam-teal" />
      },
      {
        title: "كتاب تحفة المودود",
        description: "من أقدم الكتب العربية المتخصصة في رعاية المولود وتربيته، كتبه ابن قيم الجوزية في القرن الثامن الهجري.",
        icon: <BookOpen className="h-5 w-5 text-kidmam-gold" />
      }
    ]
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">تراثنا الثقافي</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            استكشفي الموروث الثقافي العربي الغني في رعاية الأمومة والطفولة عبر العصور
          </p>
        </div>

        <Tabs defaultValue="traditions" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="glass-card">
              <TabsTrigger value="traditions" className="data-[state=active]:gradient-text">
                تقاليد وطقوس
              </TabsTrigger>
              <TabsTrigger value="nutrition" className="data-[state=active]:gradient-text">
                تغذية الأمهات
              </TabsTrigger>
              <TabsTrigger value="literature" className="data-[state=active]:gradient-text">
                الأدب والتراث
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-border bg-card p-1">
            <motion.div 
              className="absolute bottom-0 h-1 bg-gradient-to-r from-kidmam-purple to-kidmam-teal rounded-full"
              initial={{ width: "33.33%", left: "0%" }}
              animate={{ 
                width: "33.33%", 
                left: activeTab === "traditions" ? "0%" : 
                      activeTab === "nutrition" ? "33.33%" : "66.66%" 
              }}
              transition={{ duration: 0.3 }}
            />

            <TabsContent value="traditions" className="mt-0 p-4">
              <ScrollArea className="h-[400px] md:h-[320px] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {culturalContent.traditions.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <Card className="h-full glass-card hover:shadow-md transition-all">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <div className="p-2 rounded-full bg-muted/50 mr-3">
                              {item.icon}
                            </div>
                            <h3 className="font-bold text-lg">{item.title}</h3>
                          </div>
                          <p className="text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="nutrition" className="mt-0 p-4">
              <ScrollArea className="h-[400px] md:h-[320px] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {culturalContent.nutrition.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <Card className="h-full glass-card hover:shadow-md transition-all">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <div className="p-2 rounded-full bg-muted/50 mr-3">
                              {item.icon}
                            </div>
                            <h3 className="font-bold text-lg">{item.title}</h3>
                          </div>
                          <p className="text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="literature" className="mt-0 p-4">
              <ScrollArea className="h-[400px] md:h-[320px] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {culturalContent.literature.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <Card className="h-full glass-card hover:shadow-md transition-all">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <div className="p-2 rounded-full bg-muted/50 mr-3">
                              {item.icon}
                            </div>
                            <h3 className="font-bold text-lg">{item.title}</h3>
                          </div>
                          <p className="text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground italic mb-4">
            "تنبع قوة الأمهات من المعرفة التي تتوارثها الأجيال، وفي تراثنا كنوز لا حصر لها"
          </p>
          <div className="inline-flex gap-2 items-center justify-center">
            <div className="h-[1px] w-12 bg-muted-foreground"></div>
            <span className="text-muted-foreground">كيدمام</span>
            <div className="h-[1px] w-12 bg-muted-foreground"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CulturalSection;
