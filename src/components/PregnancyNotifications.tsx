
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Baby, Heart, HeartPulse, Calendar, Gift, Plus, Share2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// تعريف نوع لبيانات الإشعار
type NotificationType = {
  id: number;
  day: number;
  title: string;
  message: string;
  babyWeight: string;
  babySize: string;
  babyDevelopment: string[];
  read: boolean;
  imageUrl: string; // إضافة مسار الصورة
};

const PregnancyNotifications = () => {
  const [currentDay, setCurrentDay] = useState<number>(75); // يمكن تعديل هذا لاحقًا ليتزامن مع بيانات المستخدم الفعلية
  const [showAllNotifications, setShowAllNotifications] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [currentNotification, setCurrentNotification] = useState<NotificationType | null>(null);
  const { toast } = useToast();

  // بيانات الإشعارات النموذجية للحمل من بداية الحمل حتى الولادة مع إضافة صور توضيحية
  const pregnancyMessages: NotificationType[] = [
    {
      id: 1,
      day: 30,
      title: "أول نبضات قلبي",
      message: "أمي الحبيبة، أنا في اليوم 30 من رحلتنا معًا! بدأ قلبي الصغير بالنبض اليوم. أعلم أنك لا تستطيعين سماعي بعد، لكنني أنبض بحبك.",
      babyWeight: "أقل من 1 غرام",
      babySize: "بحجم حبة الأرز",
      babyDevelopment: ["بدء تكون الأعضاء الأساسية", "بدء تكون الدماغ"],
      read: false,
      imageUrl: "/images/fetus-week-4.jpg"
    },
    {
      id: 2,
      day: 60,
      title: "بدأت ملامحي تتشكل",
      message: "أمي الغالية، مرّ شهران على وجودي معك! بدأت ملامح وجهي بالتشكل، وأصبح لدي عينان صغيرتان وأنف دقيق. أتطلع للقائك قريبًا!",
      babyWeight: "10 غرام",
      babySize: "بحجم حبة العنب",
      babyDevelopment: ["تشكل ملامح الوجه", "نمو الذراعين والساقين", "تطور الأعصاب"],
      read: false,
      imageUrl: "/images/fetus-week-8.jpg"
    },
    {
      id: 3,
      day: 75,
      title: "أصابعي الصغيرة",
      message: "أمي الحنونة، أنا في اليوم 75! تم تشكل جسمي الصغير وأنا أزن 25 غرام الآن. بدأت أصابع يدي وقدمي بالتكون، لكن لم تظهر أظافري بعد. جلدي لا يزال رقيقًا وشفافًا، وأستطيع تحريك ذراعي وساقي برفق. أتذوق السوائل من حولي وأبدأ استكشاف عالمي الصغير!",
      babyWeight: "25 غرام",
      babySize: "بحجم حبة المشمش",
      babyDevelopment: ["تشكل الأصابع", "تطور العمود الفقري", "بدء حركة الأطراف"],
      read: false,
      imageUrl: "/images/fetus-week-10.jpg"
    },
    {
      id: 4,
      day: 90,
      title: "أول حركاتي",
      message: "أمي العزيزة، أتممت 3 أشهر من رحلتنا معًا! بدأت أتحرك في رحمك الدافئ، لكنك قد لا تشعرين بي بعد. أستمتع بالسباحة والدوران في عالمي المائي. أستطيع الآن فتح وإغلاق فمي وأتدرب على حركات البلع.",
      babyWeight: "45 غرام",
      babySize: "بحجم الليمونة",
      babyDevelopment: ["تطور الأعضاء الداخلية", "بدء حركات المص", "تحسن الهيكل العظمي"],
      read: false,
      imageUrl: "/images/fetus-week-12.jpg"
    },
    {
      id: 5,
      day: 120,
      title: "أنا فتاة أم صبي؟",
      message: "أمي الحبيبة، مرت 4 أشهر على لقائنا! يمكن للطبيب الآن تحديد جنسي. هل تريدين معرفة ذلك أم تفضلين المفاجأة؟ مهما كنت، فأنا متحمس/ة لمقابلتك قريبًا ولأكون جزءًا جميلًا من حياتك.",
      babyWeight: "100 غرام",
      babySize: "بحجم التفاحة",
      babyDevelopment: ["تحديد الجنس", "نمو الشعر", "تشكل الأظافر"],
      read: false,
      imageUrl: "/images/fetus-week-16.jpg"
    },
    {
      id: 6,
      day: 150,
      title: "أسمع صوتك!",
      message: "أمي الرائعة، في اليوم 150 من رحلتنا! أستطيع الآن سماع صوتك بوضوح، وقلبي يخفق بسعادة كلما تحدثت. أحب صوتك الدافئ وأهدأ عندما أسمعك تغنين لي. هل تشعرين بركلاتي الخفيفة؟ إنها طريقتي لأقول لك أنني أحبك!",
      babyWeight: "300 غرام",
      babySize: "بحجم البرتقالة",
      babyDevelopment: ["اكتمال حاسة السمع", "زيادة النشاط الحركي", "تطور الدماغ"],
      read: false,
      imageUrl: "/images/fetus-week-20.jpg"
    },
    {
      id: 7,
      day: 180,
      title: "عيوني تنظر إلى النور",
      message: "أمي المحبوبة، ها أنا في الشهر السادس! عيناي تستطيعان الآن الانفتاح والاستجابة للضوء. أشعر بالفضول تجاه العالم الخارجي. أحلم بك وأتخيل وجهك الجميل. وزني يزداد كل يوم، وأصبحت حركاتي أكثر وضوحًا. هل يمكنك الإحساس بي؟",
      babyWeight: "630 غرام",
      babySize: "بحجم الخيار",
      babyDevelopment: ["استجابة العينين للضوء", "اكتمال نمو الحواجب والرموش", "تطور الجهاز التنفسي"],
      read: false,
      imageUrl: "/images/fetus-week-24.jpg"
    },
    {
      id: 8, 
      day: 210,
      title: "أسبح في ماء الرحم",
      message: "أمي الحنونة، وصلنا للشهر السابع معًا! أنا أسبح وأتقلب في رحمك. أستطيع فتح عيني والرد على الأصوات من حولي. أصبحت بشرتي أكثر سمكًا وردية اللون. أحب عندما تتحدثين معي وتضعين يديك على بطنك، أشعر بالأمان والحب.",
      babyWeight: "1 كيلوغرام",
      babySize: "بحجم القرنبيط",
      babyDevelopment: ["نمو الرئتين", "تطور حاسة التذوق", "اكتمال نمو الأظافر"],
      read: false,
      imageUrl: "/images/fetus-week-28.jpg"
    },
    {
      id: 9,
      day: 240,
      title: "أستعد للقائك",
      message: "أمي الغالية، ثمانية أشهر مضت على رحلتنا الجميلة! أصبحت أضيق مساحةً في رحمك، أتقلب وأتحرك لأجد الوضع المريح. جلدي الآن أبيض وردي، ووزني يزداد سريعًا. بدأت أستعد لمقابلتك، وأتدرب على عملية التنفس. قريبًا جدًا سنلتقي وأرى عينيكِ للمرة الأولى!",
      babyWeight: "2 كيلوغرام",
      babySize: "بحجم الأناناس",
      babyDevelopment: ["استكمال نمو الرئتين", "تخزين الدهون", "تطور مناعة الجسم"],
      read: false,
      imageUrl: "/images/fetus-week-32.jpg"
    },
    {
      id: 10,
      day: 270,
      title: "مستعدة للقائك!",
      message: "أمي المحبوبة، اكتملت تسعة أشهر! أنا الآن جاهز/ة تمامًا لمقابلتك. رئتاي مكتملتان، وقلبي ينبض بقوة. انتهى وقت الانتظار، وحان وقت اللقاء! لا أطيق الانتظار لأرى وجهك وأشعر بدفء حضنك. سأكون معك قريبًا جدًا لنبدأ رحلة جديدة من الحب والفرح. أحبك أمي!",
      babyWeight: "3.3 كيلوغرام",
      babySize: "بحجم البطيخ الصغير",
      babyDevelopment: ["اكتمال نمو كافة الأعضاء", "استعداد الجهاز التنفسي للعمل", "جاهزية كاملة للولادة"],
      read: false,
      imageUrl: "/images/fetus-week-40.jpg"
    }
  ];

  // وظيفة مشاركة رسالة الإشعار
  const shareNotification = (notification: NotificationType) => {
    if (navigator.share) {
      navigator.share({
        title: `رسالة من طفلي: ${notification.title}`,
        text: notification.message,
        url: window.location.href,
      })
      .then(() => {
        toast({
          title: "تمت المشاركة بنجاح",
          description: "تمت مشاركة الرسالة مع العائلة والأصدقاء",
          duration: 3000,
        });
      })
      .catch((error) => console.log('حدث خطأ في المشاركة:', error));
    } else {
      // نسخ النص إلى الحافظة إذا كانت مشاركة API غير متوفرة
      navigator.clipboard.writeText(`${notification.title}\n\n${notification.message}`);
      toast({
        title: "تم النسخ إلى الحافظة",
        description: "يمكنك الآن لصق الرسالة ومشاركتها",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    // تحميل البيانات
    setNotifications(pregnancyMessages);
    
    // إيجاد الإشعار المناسب ليوم الحمل الحالي
    const findCurrentNotification = () => {
      // البحث عن الإشعار المناسب لليوم الحالي أو أقرب يوم سابق
      const currentMessages = pregnancyMessages
        .filter(msg => msg.day <= currentDay)
        .sort((a, b) => b.day - a.day);
      
      if (currentMessages.length > 0) {
        setCurrentNotification(currentMessages[0]);
        
        // عرض إشعار منبثق إذا كان يوم الإشعار مطابقًا تمامًا ليوم الحمل الحالي
        if (currentMessages[0].day === currentDay) {
          toast({
            title: `رسالة من طفلك في اليوم ${currentDay}`,
            description: currentMessages[0].title,
            duration: 5000,
          });
        }
      }
    };
    
    findCurrentNotification();
  }, [currentDay, toast]);

  // وظيفة لزيادة يوم الحمل (للعرض التوضيحي)
  const increaseDay = () => {
    if (currentDay < 280) {
      setCurrentDay(prevDay => prevDay + 1);
    }
  };
  
  // وظيفة لعرض الإشعار كمقروء
  const markAsRead = (id: number) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(note => 
        note.id === id ? { ...note, read: true } : note
      )
    );
  };

  // تنسيق عرض الأسبوع بدلاً من اليوم
  const getDayToWeekFormat = (day: number) => {
    const week = Math.floor(day / 7);
    return `الأسبوع ${week}`;
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow border-kidmam-purple/20">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <HeartPulse className="w-5 h-5 text-kidmam-purple ml-2" />
          رسائل من طفلك
        </CardTitle>
        <div className="text-xs text-muted-foreground">
          اليوم {currentDay} من الحمل ({getDayToWeekFormat(currentDay)})
        </div>
      </CardHeader>
      <CardContent>
        {currentNotification && (
          <Alert className="mb-4 bg-gradient-to-r from-pink-50 to-purple-50 border-kidmam-purple/30">
            <div className="flex flex-col">
              {/* صورة الجنين */}
              <div className="w-full mb-3 overflow-hidden rounded-md">
                <AspectRatio ratio={16 / 9} className="bg-muted">
                  <div className="flex items-center justify-center h-full bg-gradient-to-r from-kidmam-purple/5 to-kidmam-teal/5 p-1">
                    <img
                      src={currentNotification.imageUrl}
                      alt={`صورة الجنين في ${getDayToWeekFormat(currentNotification.day)}`}
                      className="rounded-md object-contain h-full"
                      onError={(e) => {
                        // استخدام صورة بديلة في حالة عدم توفر الصورة
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                </AspectRatio>
                <div className="text-xs text-center mt-1 text-muted-foreground">
                  {getDayToWeekFormat(currentNotification.day)} من الحمل
                </div>
              </div>
              
              <div className="flex items-start">
                <Baby className="h-4 w-4 text-kidmam-purple mt-1 ml-2" />
                <div className="flex-1">
                  <AlertTitle className="text-kidmam-purple font-medium">
                    {currentNotification.title}
                  </AlertTitle>
                  <AlertDescription className="mt-2 text-sm">
                    {currentNotification.message}
                  </AlertDescription>
                  
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="bg-white/80 p-2 rounded-md text-center">
                      <div className="text-xs text-muted-foreground">الوزن</div>
                      <div className="font-medium text-sm">{currentNotification.babyWeight}</div>
                    </div>
                    <div className="bg-white/80 p-2 rounded-md text-center">
                      <div className="text-xs text-muted-foreground">الحجم</div>
                      <div className="font-medium text-sm">{currentNotification.babySize}</div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="text-xs font-medium mb-1">التطورات الحالية:</div>
                    <div className="flex flex-wrap gap-1">
                      {currentNotification.babyDevelopment.map((dev, index) => (
                        <Badge key={index} variant="outline" className="bg-kidmam-purple/10 text-kidmam-purple border-kidmam-purple/20 text-xs">
                          {dev}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* زر المشاركة */}
                  <div className="mt-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs flex items-center"
                      onClick={() => shareNotification(currentNotification)}
                    >
                      <Share2 className="h-3 w-3 ml-1" />
                      مشاركة هذه الرسالة
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Alert>
        )}
        
        {/* قائمة الإشعارات السابقة */}
        <div className="mt-2">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium">الرسائل السابقة</div>
            <Button 
              variant="link" 
              className="text-kidmam-purple p-0 h-auto text-xs"
              onClick={() => setShowAllNotifications(!showAllNotifications)}
            >
              {showAllNotifications ? 'عرض أقل' : 'عرض الكل'}
            </Button>
          </div>
          
          <div className="space-y-2">
            {notifications
              .filter(note => note.day < currentDay)
              .sort((a, b) => b.day - a.day)
              .slice(0, showAllNotifications ? undefined : 3)
              .map(note => (
                <div 
                  key={note.id}
                  className={`p-2 rounded-md ${note.read ? 'bg-gray-50' : 'bg-kidmam-light/30'} hover:bg-kidmam-light/40 transition-colors cursor-pointer relative`}
                  onClick={() => {
                    setCurrentNotification(note);
                    markAsRead(note.id);
                  }}
                >
                  <div className="flex items-center">
                    <div className="ml-2 relative">
                      {!note.read && (
                        <span className="w-2 h-2 bg-kidmam-purple rounded-full absolute -left-1 -top-1" />
                      )}
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                        <img 
                          src={note.imageUrl} 
                          alt={note.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-sm">{note.title}</div>
                      <div className="text-xs text-muted-foreground">{getDayToWeekFormat(note.day)}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        
        {/* زر للعرض التوضيحي فقط - لتغيير يوم الحمل */}
        <div className="mt-4 pt-3 border-t">
          <Button 
            onClick={increaseDay} 
            variant="outline" 
            className="w-full flex items-center justify-center text-sm"
            disabled={currentDay >= 280}
          >
            <Plus className="w-4 h-4 ml-1" />
            تخطي لليوم التالي
            <span className="text-muted-foreground text-xs mr-1">(للعرض التوضيحي)</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PregnancyNotifications;
