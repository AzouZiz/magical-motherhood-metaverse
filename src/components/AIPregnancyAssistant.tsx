
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Mic, MicOff } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

type Message = {
  id: string;
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'system',
    content: 'مرحبا! أنا مساعدك الشخصي للحمل. أستطيع الإجابة على أسئلتك وتقديم نصائح مفيدة خلال فترة الحمل. كيف يمكنني مساعدتك اليوم؟',
    timestamp: new Date(),
  },
];

const SUGGESTED_QUESTIONS = [
  'ما هي التغذية المناسبة في الثلث الأول من الحمل؟',
  'كيف أتعامل مع غثيان الصباح؟',
  'متى يجب أن أبدأ في تحضير شنطة الولادة؟',
  'ما هي علامات المخاض الحقيقي؟',
  'هل من الآمن ممارسة الرياضة أثناء الحمل؟',
];

const AIPregnancyAssistant = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
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
        // لتبسيط التنفيذ، سنفترض أن التسجيل تم تحويله إلى نص "مثال لسؤال صوتي"
        
        setInput('مثال لسؤال صوتي');
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
        const assistantResponse = getSimulatedResponse(input);
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: assistantResponse,
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('فشل في الحصول على استجابة:', error);
      toast.error('حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.');
      setIsLoading(false);
    }
  };
  
  // منطق الردود المُعدة مسبقًا للعرض التوضيحي
  const getSimulatedResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('تغذية') || lowerQuery.includes('طعام') || lowerQuery.includes('أكل')) {
      return 'في الثلث الأول من الحمل، من المهم تناول نظام غذائي متوازن غني بحمض الفوليك والحديد والكالسيوم. تأكدي من تناول الخضروات الورقية الخضراء، والفواكه، والبروتينات الخالية من الدهون، والحبوب الكاملة. تجنبي الأطعمة غير المطبوخة جيدًا، والأجبان غير المبسترة، والأسماك عالية الزئبق.';
    } else if (lowerQuery.includes('غثيان') || lowerQuery.includes('صباح')) {
      return 'للتعامل مع غثيان الصباح، جربي تناول وجبات صغيرة ومتكررة بدلاً من الوجبات الكبيرة، تناولي البسكويت الجاف قبل النهوض من السرير، اشربي الكثير من السوائل، وتجنبي الروائح القوية. يمكن أيضًا أن يساعد الزنجبيل في تخفيف الغثيان. إذا كان الغثيان شديدًا، استشيري طبيبك حول الأدوية الآمنة.';
    } else if (lowerQuery.includes('شنطة') || lowerQuery.includes('ولادة') || lowerQuery.includes('تحضير')) {
      return 'من الأفضل البدء في تحضير شنطة الولادة في الأسبوع 35-36 من الحمل. تأكدي من تضمين: وثائق مهمة (بطاقة الهوية، التأمين)، ملابس مريحة، أدوات نظافة شخصية، ملابس للمولود، حفاضات، بطانيات، وأي أدوية تتناولينها بانتظام. لا تنسي أيضًا شاحن الهاتف وكاميرا إذا كنت ترغبين في توثيق اللحظات الأولى.';
    } else if (lowerQuery.includes('مخاض') || lowerQuery.includes('علامات')) {
      return 'علامات المخاض الحقيقي تشمل: تقلصات منتظمة تزداد قوة وتكرارًا مع مرور الوقت، نزول ماء الجنين، إفرازات مخاطية مصحوبة بدم (السدادة المخاطية)، وضغط في منطقة الحوض. على عكس المخاض الكاذب، لا تختفي التقلصات الحقيقية بالراحة أو تغيير الوضعية. إذا شعرت بهذه العلامات، اتصلي بطبيبك أو توجهي إلى المستشفى.';
    } else if (lowerQuery.includes('رياضة') || lowerQuery.includes('تمارين')) {
      return 'نعم، ممارسة الرياضة المعتدلة آمنة ومفيدة خلال الحمل للنساء ذوات الحمل الطبيعي. المشي، السباحة، واليوغا المخصصة للحوامل هي خيارات ممتازة. تساعد التمارين على تحسين المزاج، تقليل آلام الظهر، وتحسين النوم. ومع ذلك، تجنبي الرياضات التي تتضمن مخاطر السقوط أو الصدمات. دائمًا استشيري طبيبك قبل بدء أي روتين تمارين جديد.';
    } else {
      return 'شكرًا على سؤالك. للحصول على إجابة دقيقة ومخصصة، أنصحك بمناقشة هذا الأمر مع طبيبك أو القابلة. هل هناك شيء آخر يمكنني مساعدتك به؟';
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

  return (
    <Card className="flex flex-col h-[600px] border-kidmam-teal/20 shadow-md rounded-xl overflow-hidden bg-gradient-to-br from-white to-kidmam-light/30">
      <div className="p-4 bg-gradient-to-r from-kidmam-purple/10 to-kidmam-teal/10 border-b">
        <h2 className="text-xl font-bold text-kidmam-purple flex items-center gap-2">
          <Bot className="h-5 w-5" />
          مساعد الحمل الذكي
        </h2>
        <p className="text-sm text-muted-foreground mt-1">اسألي أي سؤال عن الحمل، والولادة، ورعاية الطفل</p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
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
                </div>
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
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
      
      {/* أسئلة مقترحة */}
      <div className="p-2 border-t border-gray-100">
        <div className="flex gap-2 overflow-x-auto pb-2 mb-2">
          {SUGGESTED_QUESTIONS.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="whitespace-nowrap text-xs hover:bg-kidmam-purple/10"
              onClick={() => handleSuggestedQuestion(question)}
            >
              {question}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="p-3 border-t flex items-center gap-2">
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
          className="rounded-full text-right bg-secondary/50"
          dir="rtl"
        />
        <Button
          onClick={sendMessage}
          disabled={isLoading}
          className="rounded-full"
          variant="default"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default AIPregnancyAssistant;
