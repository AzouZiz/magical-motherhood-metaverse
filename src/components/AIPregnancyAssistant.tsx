
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Mic, MicOff, Moon, Sun, Volume2, Book, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Label } from '@/components/ui/label';

type Message = {
  id: string;
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: Date;
  source?: 'medical' | 'islamic' | 'cultural' | 'nutritional';
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'system',
    content: 'مرحبا! أنا مساعدك الشخصي للحمل. أستطيع الإجابة على أسئلتك وتقديم نصائح مفيدة خلال فترة الحمل. يمكنني تقديم معلومات طبية، ثقافية وإسلامية لمساعدتك في رحلتك. كيف يمكنني مساعدتك اليوم؟',
    timestamp: new Date(),
    source: 'cultural',
  },
];

const SUGGESTED_QUESTIONS = [
  {
    text: 'ما هي التغذية المناسبة في الثلث الأول من الحمل؟',
    source: 'nutritional'
  },
  {
    text: 'كيف أتعامل مع غثيان الصباح؟',
    source: 'medical'
  },
  {
    text: 'ما هي الأدعية المناسبة للحامل؟',
    source: 'islamic'
  },
  {
    text: 'متى يجب أن أبدأ في تحضير شنطة الولادة؟',
    source: 'cultural'
  },
  {
    text: 'ما هي علامات المخاض الحقيقي؟',
    source: 'medical'
  },
  {
    text: 'هل من الآمن ممارسة الرياضة أثناء الحمل؟',
    source: 'medical'
  },
  {
    text: 'ما هي العادات الغذائية التقليدية للحوامل في الثقافة العربية؟',
    source: 'cultural'
  },
  {
    text: 'كيف أحافظ على صلاتي خلال فترة الحمل؟',
    source: 'islamic'
  },
];

// Sources for responses
const SOURCES = {
  medical: {
    name: 'معلومات طبية',
    icon: <Heart className="h-3 w-3 text-red-500" />,
    className: 'bg-gradient-to-br from-red-50 to-white border-red-200 text-gray-800'
  },
  islamic: {
    name: 'معلومات إسلامية',
    icon: <Moon className="h-3 w-3 text-green-600" />,
    className: 'bg-gradient-to-br from-green-50 to-white border-green-200 text-gray-800'
  },
  cultural: {
    name: 'معلومات ثقافية',
    icon: <Book className="h-3 w-3 text-orange-500" />,
    className: 'bg-gradient-to-br from-orange-50 to-white border-orange-200 text-gray-800'
  },
  nutritional: {
    name: 'نصائح غذائية',
    icon: <Sun className="h-3 w-3 text-yellow-500" />,
    className: 'bg-gradient-to-br from-yellow-50 to-white border-yellow-200 text-gray-800'
  },
};

const AIPregnancyAssistant = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [dialect, setDialect] = useState<'مصري' | 'خليجي' | 'شامي' | 'فصحى'>('فصحى');
  
  // منطق التسجيل الصوتي
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const audioChunks: BlobPart[] = [];
      
      mediaRecorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });
      
      mediaRecorder.addEventListener('stop', async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        
        // هنا يمكن إضافة منطق تحويل الصوت إلى نص باستخدام Whisper API
        toast.info("تم تحويل تسجيلك الصوتي إلى نص", {
          position: "bottom-center",
          duration: 2000,
        });
        
        setInput('كيف يمكنني التعامل مع ألم الظهر خلال الحمل؟');
        setIsRecording(false);
        
        // إيقاف التسجيل وإغلاق المسارات
        stream.getTracks().forEach((track) => track.stop());
      });
      
      mediaRecorder.start();
      setIsRecording(true);
      
      // إيقاف التسجيل تلقائيًا بعد 10 ثوانٍ
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.stop();
        }
      }, 10000);
      
    } catch (error) {
      console.error('فشل في بدء التسجيل:', error);
      toast.error('فشل في بدء التسجيل. تأكد من السماح بالوصول إلى الميكروفون.');
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };
  
  // التمرير التلقائي إلى آخر رسالة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // منطق إرسال الرسالة وتلقي الرد
  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // في هذه المرحلة، يمكنك استخدام خدمة الذكاء الاصطناعي مثل OpenAI API
      // لتبسيط التنفيذ، سنستخدم ردودًا مُعدة مسبقًا
      
      setTimeout(() => {
        const { response, source } = getSimulatedResponse(input);
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response,
          timestamp: new Date(),
          source: source,
        };
        
        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
        
        // قراءة الرد صوتياً إذا كان الوضع غير صامت
        if (!isMuted) {
          speakResponse(response);
        }
      }, 1000);
      
    } catch (error) {
      console.error('فشل في الحصول على استجابة:', error);
      toast.error('حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.');
      setIsLoading(false);
    }
  };
  
  // قراءة النص صوتياً
  const speakResponse = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    window.speechSynthesis.speak(utterance);
  };
  
  // منطق الردود المُعدة مسبقًا للعرض التوضيحي
  const getSimulatedResponse = (query: string): { response: string, source: 'medical' | 'islamic' | 'cultural' | 'nutritional' } => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('تغذية') || lowerQuery.includes('طعام') || lowerQuery.includes('أكل') || lowerQuery.includes('غذائية')) {
      return {
        response: 'في الثلث الأول من الحمل، من المهم تناول نظام غذائي متوازن غني بحمض الفوليك والحديد والكالسيوم. تأكدي من تناول الخضروات الورقية الخضراء، والفواكه، والبروتينات الخالية من الدهون، والحبوب الكاملة. في ثقافتنا العربية، يُنصح بتناول التمر والحليب والزبادي. تجنبي الأطعمة غير المطبوخة جيدًا، والأجبان غير المبسترة، والأسماك عالية الزئبق.',
        source: 'nutritional'
      };
    } else if (lowerQuery.includes('غثيان') || lowerQuery.includes('صباح')) {
      return {
        response: 'للتعامل مع غثيان الصباح، جربي تناول وجبات صغيرة ومتكررة بدلاً من الوجبات الكبيرة، تناولي البسكويت الجاف قبل النهوض من السرير، اشربي الكثير من السوائل، وتجنبي الروائح القوية. يمكن أيضًا أن يساعد الزنجبيل والنعناع في تخفيف الغثيان. في الطب النبوي، يُنصح بشرب العسل مع الماء الدافئ. إذا كان الغثيان شديدًا، استشيري طبيبك حول الأدوية الآمنة.',
        source: 'medical'
      };
    } else if (lowerQuery.includes('شنطة') || lowerQuery.includes('ولادة') || lowerQuery.includes('تحضير')) {
      return {
        response: 'من الأفضل البدء في تحضير شنطة الولادة في الأسبوع 35-36 من الحمل. تأكدي من تضمين: وثائق مهمة (بطاقة الهوية، التأمين)، ملابس مريحة، أدوات نظافة شخصية، ملابس للمولود، حفاضات، بطانيات، وأي أدوية تتناولينها بانتظام. حسب تقاليدنا العربية، يمكنك إضافة بعض العطور الخفيفة، والكحل للمولود. لا تنسي المصحف أو تطبيق القرآن على هاتفك، وسجادة صلاة خفيفة، وشاحن الهاتف وكاميرا إذا كنت ترغبين في توثيق اللحظات الأولى.',
        source: 'cultural'
      };
    } else if (lowerQuery.includes('مخاض') || lowerQuery.includes('علامات')) {
      return {
        response: 'علامات المخاض الحقيقي تشمل: تقلصات منتظمة تزداد قوة وتكرارًا مع مرور الوقت، نزول ماء الجنين، إفرازات مخاطية مصحوبة بدم (السدادة المخاطية)، وضغط في منطقة الحوض. على عكس المخاض الكاذب، لا تختفي التقلصات الحقيقية بالراحة أو تغيير الوضعية. يمكنك قراءة آيات من سورة مريم والاستعانة بالدعاء "اللهم هون علي ما أنا فيه". إذا شعرت بهذه العلامات، اتصلي بطبيبك أو توجهي إلى المستشفى.',
        source: 'medical'
      };
    } else if (lowerQuery.includes('رياضة') || lowerQuery.includes('تمارين')) {
      return {
        response: 'نعم، ممارسة الرياضة المعتدلة آمنة ومفيدة خلال الحمل للنساء ذوات الحمل الطبيعي. المشي، السباحة، ويوغا الحوامل هي خيارات ممتازة. تساعد التمارين على تحسين المزاج، تقليل آلام الظهر، وتحسين النوم. ومع ذلك، تجنبي الرياضات التي تتضمن مخاطر السقوط أو الصدمات. تذكري أن النبي محمد ﷺ حث على العناية بالجسد والصحة. دائمًا استشيري طبيبك قبل بدء أي روتين تمارين جديد.',
        source: 'medical'
      };
    } else if (lowerQuery.includes('أدعية') || lowerQuery.includes('دعاء') || lowerQuery.includes('قرآن') || lowerQuery.includes('إسلام')) {
      return {
        response: 'هناك العديد من الأدعية المأثورة للحامل، منها: "اللهم إني أستودعك ما في رحمي فاحفظه من الشيطان الرجيم"، "رب هب لي من لدنك ذرية طيبة إنك سميع الدعاء". كما يُستحب قراءة سورة مريم وسورة يوسف. يمكنك أيضًا الدعاء بصلاح الذرية: "رب اجعلني مقيم الصلاة ومن ذريتي ربنا وتقبل دعاء". داومي على الأذكار الصباحية والمسائية، واحرصي على الصلاة في وقتها مع مراعاة وضعك الصحي.',
        source: 'islamic'
      };
    } else if (lowerQuery.includes('عادات') || lowerQuery.includes('تقاليد') || lowerQuery.includes('ثقاف')) {
      return {
        response: 'تختلف العادات والتقاليد المرتبطة بالحمل بين الدول العربية، لكن هناك بعض العادات المشتركة مثل: إعداد وليمة للاحتفال بالحمل تسمى "النفاس" أو "السبوع" بعد الولادة، تجنب الخروج ليلاً في الشهور الأولى من الحمل، استخدام البخور والعطور لتهدئة الحامل، تقديم التمر والحلويات للزائرين. في بعض المناطق، تُعلق الأمهات الحوامل الخرز الأزرق لحماية الجنين من العين. كما أن هناك أطعمة تقليدية مثل "العصيدة" و"التلبينة" التي تُقدم للحامل لتقوية جسمها.',
        source: 'cultural'
      };
    } else if (lowerQuery.includes('ظهر') || lowerQuery.includes('ألم')) {
      return {
        response: 'آلام الظهر شائعة خلال الحمل بسبب زيادة الوزن وتغير مركز الجاذبية. للتخفيف منها: حافظي على وضعية جلوس سليمة، استخدمي وسادة داعمة أثناء النوم، مارسي تمارين لتقوية عضلات الظهر بعد استشارة طبيبك، ارتدي أحذية مريحة ذات كعب منخفض، تجنبي رفع الأشياء الثقيلة. يمكنك أيضًا الاستفادة من التدليك الخفيف للظهر بزيت الزيتون أو زيت اللوز الدافئ، وهي من العلاجات التقليدية المعروفة في ثقافتنا العربية.',
        source: 'medical'
      };
    } else if (lowerQuery.includes('صلا') || lowerQuery.includes('صيام') || lowerQuery.includes('رمضان') || lowerQuery.includes('عبادة')) {
      return {
        response: 'يمكنك الحفاظ على صلاتك خلال الحمل مع بعض التسهيلات: إذا كنت لا تستطيعين السجود، يمكنك الإيماء بالرأس بدلاً من ذلك. إذا كنت تجدين صعوبة في الوقوف، يمكنك الصلاة جالسة. بالنسبة للصيام في رمضان، إذا كان الصيام يشكل خطراً على صحتك أو صحة جنينك، فيمكنك الإفطار ثم القضاء لاحقاً بعد الولادة. استشيري طبيبك حول الصيام. تذكري أن الله تعالى يقول: "يُرِيدُ اللّهُ بِكُمُ الْيُسْرَ وَلاَ يُرِيدُ بِكُمُ الْعُسْرَ".',
        source: 'islamic'
      };
    } else {
      return {
        response: 'شكرًا على سؤالك. للحصول على إجابة دقيقة ومخصصة، أنصحك بمناقشة هذا الأمر مع طبيبك أو القابلة. هل هناك شيء آخر يمكنني مساعدتك به؟',
        source: 'cultural'
      };
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isMuted) {
      toast.success("تم تفعيل القراءة الصوتية", {
        position: "bottom-center",
        duration: 2000,
      });
    } else {
      toast.info("تم إيقاف القراءة الصوتية", {
        position: "bottom-center",
        duration: 2000,
      });
    }
  };

  return (
    <Card className="flex flex-col h-[600px] border-kidmam-teal/20 shadow-md rounded-xl overflow-hidden bg-gradient-to-br from-white to-kidmam-light/30 relative">
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 pointer-events-none arab-pattern-bg opacity-20"></div>
      
      {/* Header with cultural styling */}
      <div className="p-4 bg-gradient-to-r from-kidmam-purple/10 to-kidmam-teal/10 border-b relative z-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-kidmam-purple to-kidmam-teal"></div>
        <h2 className="text-xl font-bold text-kidmam-purple flex items-center gap-2 font-amiri">
          <Bot className="h-5 w-5" />
          المساعدة الثقافية الذكية للحمل
        </h2>
        <p className="text-sm text-muted-foreground mt-1 font-tajawal">
          اسألي أي سؤال طبي، ثقافي، أو إسلامي متعلق بالحمل والأمومة
        </p>
        
        {/* Cultural Settings */}
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6 rounded-full"
              onClick={toggleMute}
            >
              <Volume2 className={`h-3 w-3 ${isMuted ? 'text-muted-foreground' : 'text-kidmam-purple'}`} />
            </Button>
            <span>القراءة الصوتية</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="dialect" className="text-xs">اللهجة:</Label>
            <select
              id="dialect"
              value={dialect}
              onChange={(e) => setDialect(e.target.value as 'مصري' | 'خليجي' | 'شامي' | 'فصحى')}
              className="text-xs bg-transparent border-none"
            >
              <option value="فصحى">فصحى</option>
              <option value="مصري">مصري</option>
              <option value="خليجي">خليجي</option>
              <option value="شامي">شامي</option>
            </select>
          </div>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4 relative z-10">
        <div className="space-y-4">
          {messages.map((msg) => {
            const source = msg.source ? SOURCES[msg.source] : null;
            
            return (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.role === 'system'
                      ? 'bg-kidmam-light border border-kidmam-teal/20 text-gray-800'
                      : msg.role === 'user'
                      ? 'bg-kidmam-purple text-white'
                      : source
                      ? source.className
                      : 'bg-kidmam-teal/10 border border-kidmam-teal/30 text-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {msg.role === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                    <span className="text-xs opacity-75">
                      {msg.role === 'user' ? 'أنت' : 'المساعد'}
                    </span>
                    
                    {/* Source indicator for assistant messages */}
                    {msg.role === 'assistant' && source && (
                      <div className="flex items-center gap-1 text-xs opacity-75 border-r pr-1 mr-1 border-current">
                        {source.icon}
                        <span>{source.name}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            );
          })}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-kidmam-teal/10 border border-kidmam-teal/30">
                <div className="flex items-center gap-2">
                  <span className="animate-pulse flex space-x-1 items-center">
                    <span className="h-2 w-2 bg-kidmam-teal rounded-full"></span>
                    <span className="h-2 w-2 bg-kidmam-teal rounded-full animation-delay-200"></span>
                    <span className="h-2 w-2 bg-kidmam-teal rounded-full animation-delay-400"></span>
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* أسئلة مقترحة - Enhance with cultural themes */}
      <div className="p-2 border-t border-gray-100 relative z-10 bg-white/80">
        <div className="flex flex-wrap gap-2 pb-2 overflow-hidden">
          {SUGGESTED_QUESTIONS.map((question, index) => {
            const source = question.source ? SOURCES[question.source] : null;
            
            return (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className={`whitespace-nowrap text-xs hover:bg-kidmam-purple/10 border ${
                  source ? `border-${source.name === 'معلومات طبية' ? 'red' : source.name === 'معلومات إسلامية' ? 'green' : source.name === 'معلومات ثقافية' ? 'orange' : 'yellow'}-200` : ''
                }`}
                onClick={() => handleSuggestedQuestion(question.text)}
              >
                {source && (
                  <span className="mr-1">{source.icon}</span>
                )}
                {question.text}
              </Button>
            );
          })}
        </div>
      </div>
      
      {/* Enhanced input area with cultural styling */}
      <div className="p-3 border-t flex items-center gap-2 bg-white relative z-10">
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full ${isRecording ? 'bg-red-100 text-red-500' : ''}`}
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </Button>
        <Input
          placeholder="اكتبي سؤالك هنا..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="rounded-full text-right bg-secondary/50 font-tajawal"
          dir="rtl"
        />
        <Button
          onClick={sendMessage}
          disabled={isLoading}
          className="rounded-full bg-gradient-to-r from-kidmam-purple to-kidmam-teal text-white"
          variant="default"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Cultural attribution */}
      <div className="text-center text-xs text-muted-foreground pb-1 pt-0 bg-white relative z-10">
        <span className="font-amiri">كِدْمام - المساعدة الثقافية الإسلامية</span>
      </div>
    </Card>
  );
};

export default AIPregnancyAssistant;
