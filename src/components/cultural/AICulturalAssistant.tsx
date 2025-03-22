
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Mic, StopCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from '@/components/ui/avatar';
import { Tooltip } from '@/components/ui/tooltip';
import { useToast } from "@/hooks/use-toast";
import { useCultural } from '@/contexts/CulturalContext';
import { HennaBorder, AmiriText, IslamicPattern } from './IslamicPatterns';
import { useIslamicDate } from '@/hooks/useIslamicDate';

// Types for the cultural assistant
type MessageType = 'user' | 'assistant';
type MessageContentType = 'text' | 'cultural' | 'medical' | 'fatwa';

interface Message {
  id: string;
  type: MessageType;
  content: string;
  contentType: MessageContentType;
  timestamp: Date;
  sources?: {
    text: string;
    link?: string;
  }[];
}

// Suggested questions based on the user's selected region
const suggestedQuestions: Record<string, string[]> = {
  'gulf': [
    'ما هي الأكلات المناسبة للحامل في الشهر الخامس؟',
    'هل الحناء مضرة للحامل؟',
    'ما حكم استخدام مسكنات الألم أثناء الحمل؟',
    'ما هي أفضل التمارين الآمنة للحامل في الثلث الثاني؟'
  ],
  'levant': [
    'ما هي عادات الحمل المنتشرة في بلاد الشام؟',
    'هل يمكنني تناول المنسف خلال الحمل؟',
    'ما هي أفضل الأعشاب الآمنة للحامل؟',
    'كيف أتعامل مع الوحام في الشهور الأولى؟'
  ],
  'north-africa': [
    'ما رأي الطب في استخدام البخور أثناء الحمل؟',
    'هل الكسكس مفيد للحامل؟',
    'هل علاجات العطارة الشعبية آمنة خلال الحمل؟',
    'ما هي عادات الحمل في المغرب العربي؟'
  ],
  'general': [
    'ما الأطعمة المناسبة للحامل في الشهر الخامس؟',
    'هل هناك تمارين خاصة للحامل تخفف آلام الظهر؟',
    'هل تؤثر القراءة للجنين على نموه الذهني؟',
    'ما حكم استخدام الأدوية أثناء الحمل؟'
  ]
};

export const AICulturalAssistant: React.FC = () => {
  const { toast } = useToast();
  const { locale, direction, region, dialect, religiousPreference, theme } = useCultural();
  const { islamicDate } = useIslamicDate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      const initialGreeting: Message = {
        id: 'initial-greeting',
        type: 'assistant',
        content: locale === 'ar' 
          ? 'مرحبًا بك في المساعد الثقافي الذكي من كدمام. كيف يمكنني مساعدتك في رحلة الحمل الخاصة بك؟'
          : 'Welcome to Kidmam\'s Cultural AI Assistant. How can I help you with your pregnancy journey?',
        contentType: 'text',
        timestamp: new Date()
      };
      setMessages([initialGreeting]);
    }
  }, [locale, messages.length]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Generate a mock response based on user input
  const generateResponse = (query: string): Promise<Message> => {
    return new Promise((resolve) => {
      // Simulate network request
      setTimeout(() => {
        // Mock responses based on keywords
        const lowerQuery = query.toLowerCase();
        
        // Determine response type based on query content
        let responseType: MessageContentType = 'text';
        if (lowerQuery.includes('حكم') || lowerQuery.includes('fatwa') || lowerQuery.includes('شرع')) {
          responseType = 'fatwa';
        } else if (lowerQuery.includes('أكل') || lowerQuery.includes('food') || lowerQuery.includes('تغذية')) {
          responseType = 'cultural';
        } else if (lowerQuery.includes('ألم') || lowerQuery.includes('pain') || lowerQuery.includes('طبيب')) {
          responseType = 'medical';
        }
        
        // Mock responses based on detected keywords
        let responseContent = '';
        let sources = undefined;
        
        if (responseType === 'fatwa') {
          if (religiousPreference === 'conservative') {
            responseContent = 'وفقاً للفتاوى الشرعية، ينبغي استشارة طبيب مسلم متخصص أولاً. وقد ذكر العلماء أن صحة الأم والجنين من أهم المقاصد الشرعية.';
            sources = [
              { text: 'فتاوى اللجنة الدائمة للبحوث العلمية والإفتاء - رقم 21532' },
              { text: 'موسوعة الفقه الإسلامي، المجلد السابع، صفحة 183' }
            ];
          } else {
            responseContent = 'من الناحية الشرعية، الأمر فيه سعة ويمكنك اتباع التوجيهات الطبية مع الحرص على صحتك وصحة جنينك، فالإسلام دين يسر.';
            sources = [
              { text: 'مجموعة فتاوى معاصرة حول صحة المرأة الحامل' },
              { text: 'توصيات المجلس الإسلامي للإفتاء - 2023' }
            ];
          }
        } else if (responseType === 'cultural') {
          if (region === 'gulf') {
            responseContent = 'من الأطعمة المفيدة للحامل في المنطقة الخليجية: المرق، الهريس، السمك الطازج، والتمور. وينصح بتناول الحليب مع الزعفران والهيل صباحاً.';
          } else if (region === 'levant') {
            responseContent = 'تشتهر منطقة الشام بأطعمة غنية بالعناصر الغذائية مثل الفريكة، والسبانخ، واللبنة البلدية، وزيت الزيتون البكر الممتاز. هذه الأطعمة تقليدية وصحية للحامل.';
          } else if (region === 'north-africa') {
            responseContent = 'الطبخ المغاربي غني بالأعشاب المفيدة للحامل مثل الكمون والكزبرة والزعفران. الكسكس بالخضار والطاجين بلحم الضأن مصادر جيدة للبروتين والحديد.';
          } else {
            responseContent = 'ينصح الأطباء والخبراء بتناول غذاء متوازن يشمل البروتينات والخضروات والفواكه الطازجة. التمور والحليب من الأطعمة المفيدة للحامل في العالم العربي.';
          }
        } else if (responseType === 'medical') {
          responseContent = 'من الناحية الطبية، ينصح باستشارة الطبيب المختص قبل تناول أي مسكنات. يمكن استخدام الباراسيتامول بحذر، وتجنب مضادات الالتهاب غير الستيرويدية مثل الآيبوبروفين خاصة في الثلث الثالث.';
          sources = [
            { text: 'الجمعية الأمريكية لأطباء النساء والتوليد (ACOG) - إرشادات 2023' },
            { text: 'منظمة الصحة العالمية - دليل الرعاية أثناء الحمل' }
          ];
        } else {
          // Default response if no specific category detected
          responseContent = 'شكراً لسؤالك. الحمل رحلة مميزة ومختلفة لكل امرأة. هل يمكنني مساعدتك بمعلومات أكثر تحديداً حول هذا الموضوع؟';
        }
        
        resolve({
          id: `response-${Date.now()}`,
          type: 'assistant',
          content: responseContent,
          contentType: responseType,
          timestamp: new Date(),
          sources
        });
      }, 1500); // Simulate API delay
    });
  };
  
  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    
    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: inputText,
      contentType: 'text',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    setIsLoading(true);
    
    try {
      const response = await generateResponse(inputText);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من معالجة طلبك. يرجى المحاولة مرة أخرى.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle voice recording
  const handleVoiceRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // In a real app, you would process the recorded audio here
      toast({
        title: "تم إيقاف التسجيل",
        description: "جاري معالجة التسجيل الصوتي...",
      });
      
      // Simulate voice recognition result
      setTimeout(() => {
        setInputText("كيف يمكنني التعامل مع آلام الظهر خلال الحمل؟");
      }, 1500);
    } else {
      setIsRecording(true);
      toast({
        title: "جاري التسجيل",
        description: `استخدام اللهجة: ${dialect}. تحدثي بوضوح رجاءً.`,
      });
    }
  };
  
  // Handle selecting a suggested question
  const handleSuggestedQuestion = (question: string) => {
    setInputText(question);
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto border border-primary/20 shadow-lg">
      <CardHeader className="relative overflow-hidden">
        <IslamicPattern type="background" />
        <div className="flex items-center">
          <Avatar className="h-10 w-10 bg-primary/20 text-primary">
            <MessageCircle size={20} />
          </Avatar>
          <div className="ml-4 rtl:mr-4 rtl:ml-0">
            <CardTitle className="font-amiri text-2xl">
              {locale === 'ar' ? 'المساعدة الثقافية الذكية' : 'Cultural AI Assistant'}
            </CardTitle>
            <CardDescription>
              {locale === 'ar' 
                ? `${islamicDate?.formatted || ''} - مساعدك الشخصي المتخصص في شؤون الحمل والأمومة`
                : `${islamicDate?.formatted || ''} - Your personal pregnancy and motherhood assistant`
              }
            </CardDescription>
          </div>
        </div>
        <IslamicPattern type="divider" className="mt-4" />
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="h-96 overflow-y-auto p-4 bg-muted/20">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`relative max-w-[80%] ${
                  message.type === 'user' 
                    ? 'bg-primary/10 text-primary-foreground rounded-t-xl rounded-bl-xl' 
                    : message.contentType === 'cultural'
                      ? 'bg-primary/5 border border-primary/20 rounded-t-xl rounded-br-xl' 
                      : message.contentType === 'medical'
                        ? 'bg-secondary/5 border border-secondary/20 rounded-t-xl rounded-br-xl'
                        : message.contentType === 'fatwa'
                          ? 'bg-accent/5 border border-accent/20 rounded-t-xl rounded-br-xl'
                          : 'bg-background border border-border rounded-t-xl rounded-br-xl'
                }`}
              >
                {message.contentType === 'fatwa' && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-accent">فتوى</span>
                  </div>
                )}
                
                <div className="p-3">
                  {message.type === 'assistant' && message.contentType === 'cultural' ? (
                    <AmiriText size="md">{message.content}</AmiriText>
                  ) : (
                    <p className={`text-sm ${message.type === 'assistant' && message.contentType === 'fatwa' ? 'font-amiri' : ''}`}>
                      {message.content}
                    </p>
                  )}
                  
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-border/30">
                      <p className="text-xs text-muted-foreground mb-1">المصادر:</p>
                      <ul className="text-xs text-muted-foreground">
                        {message.sources.map((source, index) => (
                          <li key={index} className="mb-1">
                            {source.link ? (
                              <a 
                                href={source.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-primary"
                              >
                                {source.text}
                              </a>
                            ) : (
                              source.text
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="text-[10px] text-muted-foreground px-3 pb-1 text-right rtl:text-left">
                  {new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  }).format(message.timestamp)}
                </div>
              </div>
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start mb-4"
            >
              <div className="bg-background border border-border rounded-xl p-3 max-w-[80%]">
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t">
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">
              {locale === 'ar' ? 'أسئلة مقترحة:' : 'Suggested Questions:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions[region].map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs border-primary/20 hover:bg-primary/10 hover:text-primary"
                  onClick={() => handleSuggestedQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Tooltip content={isRecording ? "إيقاف التسجيل" : "بدء التسجيل الصوتي"}>
              <Button
                variant="outline"
                size="icon"
                className={isRecording ? "text-red-500 animate-pulse" : ""}
                onClick={handleVoiceRecording}
                type="button"
              >
                {isRecording ? <StopCircle size={18} /> : <Mic size={18} />}
              </Button>
            </Tooltip>
            
            <div className="relative flex-1">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={locale === 'ar' ? "اكتبي سؤالك هنا..." : "Type your question here..."}
                className="w-full px-4 py-2 rounded-full border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary focus-visible:outline-none"
                dir="auto"
              />
            </div>
            
            <Button
              onClick={handleSendMessage}
              type="button"
              className="rounded-full bg-primary/90 hover:bg-primary"
              disabled={!inputText.trim() || isLoading}
            >
              <Send size={18} className={direction === 'rtl' ? 'rotate-180' : ''} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
