
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

// Mood data
const moods = [
  { emoji: '😊', label: 'سعيدة', color: '#FFD54F', tip: 'رائع! حافظي على هذه الطاقة الإيجابية مع تمارين التنفس العميق' },
  { emoji: '😌', label: 'مطمئنة', color: '#81C784', tip: 'الاطمئنان نعمة كبيرة، استمتعي بيومك مع كوب من الشاي الأخضر' },
  { emoji: '😐', label: 'محايدة', color: '#90CAF9', tip: 'يوم عادي؟ جربي المشي لمدة ١٥ دقيقة لتنشيط الدورة الدموية' },
  { emoji: '😔', label: 'حزينة', color: '#9575CD', tip: 'أخبري أحد المقربين عن مشاعرك، المشاركة تخفف الحزن' },
  { emoji: '😢', label: 'متعبة', color: '#F48FB1', tip: 'التعب طبيعي أثناء الحمل، خذي قسطًا من الراحة واستمعي لصوتيات هادئة' }
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const { toast } = useToast();

  const handleMoodSelect = (index: number) => {
    setSelectedMood(index);
    toast({
      title: `شكراً على مشاركة مزاجك: ${moods[index].label}`,
      description: moods[index].tip,
      duration: 5000,
    });
  };

  return (
    <Card className="breathing-card overflow-hidden border-soothing-purple/10">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-center">مزاجي اليوم</CardTitle>
        <CardDescription className="text-center">
          كيف تشعرين اليوم؟ مشاركة مزاجك يساعدنا على تقديم تجربة أفضل لك
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center gap-3 p-4">
          <TooltipProvider>
            {moods.map((mood, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <motion.button
                    className={`mood-option ${selectedMood === index ? 'ring-2' : ''}`}
                    style={{ 
                      boxShadow: selectedMood === index ? `0 0 0 2px ${mood.color}` : 'none',
                      background: selectedMood === index ? `${mood.color}20` : 'transparent'
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleMoodSelect(index)}
                    aria-label={`مزاج ${mood.label}`}
                  >
                    <span role="img" aria-label={mood.label} className="text-3xl">
                      {mood.emoji}
                    </span>
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{mood.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
        
        {selectedMood !== null && (
          <motion.div 
            className="mt-4 p-4 rounded-lg bg-soothing-lightPurple/30 dark:bg-soothing-purple/10 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-medium text-sm">{moods[selectedMood].tip}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-2 text-soothing-purple"
              onClick={() => {
                // Trigger a simulated emotional notification
                toast({
                  title: "نصيحة خاصة بمزاجك",
                  description: `إليك بعض النصائح المناسبة لمزاجك اليوم: ${moods[selectedMood].label}`,
                  duration: 5000,
                });
              }}
            >
              اقتراحات مناسبة لمزاجي
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
