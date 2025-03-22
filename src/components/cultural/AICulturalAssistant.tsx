
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TooltipProvider, TooltipTrigger, TooltipContent, Tooltip } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCultural } from "@/contexts/CulturalContext";
import { Mic, Send, Info, VolumeX, Volume2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { IslamicPattern } from './IslamicPatterns';

// Message types
type MessageRole = 'user' | 'assistant';

interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
  sources?: string[];
  hasQuran?: boolean;
  hasHadith?: boolean;
  isMedical?: boolean;
}

// Suggested questions based on cultural context
const suggestedQuestions = [
  {
    text: "ما هي الأطعمة المناسبة خلال فترة الحمل حسب التقاليد الإسلامية؟",
    category: "nutrition",
  },
  {
    text: "كيف أحافظ على صلاتي خلال الحمل إذا كان الوقوف صعباً علي؟",
    category: "worship",
  },
  {
    text: "هل يمكنني استخدام الأدوية المسكنة أثناء الحمل وما هو البديل الطبيعي؟",
    category: "medical",
  },
  {
    text: "ما هي الأدعية المأثورة للحامل والجنين؟",
    category: "worship",
  },
  {
    text: "كيف يؤثر الصيام في رمضان على الحمل؟",
    category: "worship",
  },
  {
    text: "ما هي علامات خطر الحمل التي يجب أن أنتبه لها؟",
    category: "medical",
  },
];

// Simulated response generation
const generateResponse = (question: string): Message => {
  // Simulate AI processing
  let hasQuran = question.includes("دعاء") || question.includes("أدعية") || question.includes("قرآن");
  let hasHadith = question.includes("حديث") || question.includes("السنة") || question.includes("النبي");
  let isMedical = question.includes("صحة") || 
                  question.includes("طبي") || 
                  question.includes("مرض") ||
                  question.includes("ألم") ||
                  question.includes("دواء");
  
  let response = "";
  let sources: string[] = [];
  
  if (question.includes("الأطعمة") || question.includes("التغذية") || question.includes("غذاء")) {
    response = "من الناحية الطبية، ينصح الأطباء بتناول الأطعمة الغنية بالفولات مثل الخضروات الورقية الداكنة والحمضيات والبقوليات. وفي التراث الإسلامي، ورد في السنة النبوية فضل بعض الأطعمة مثل التمر والعسل والحبة السوداء. وقد أشارت دراسات حديثة إلى فوائد التمر للحامل خاصة في الأسابيع الأخيرة من الحمل.";
    sources = ["صحيح البخاري: كتاب الأطعمة", "دراسة جامعة الملك سعود 2019: فوائد التمر للحامل"];
  } else if (question.includes("صلاة") || question.includes("صلاتي")) {
    response = "يمكنك أداء الصلاة جالسة إذا كان الوقوف يسبب لك مشقة أو تعباً شديداً. ذكر الفقهاء أن المشقة تجلب التيسير، والله تعالى يقول: (لا يكلف الله نفساً إلا وسعها). ويمكنك الجمع بين الصلوات عند الحاجة بحسب رأي بعض المذاهب الفقهية.";
    sources = ["سورة البقرة: 286", "فتاوى اللجنة الدائمة للإفتاء: 6/244"];
    hasQuran = true;
  } else if (question.includes("مسكنة") || question.includes("أدوية")) {
    response = "من الناحية الطبية، هناك بعض المسكنات الآمنة أثناء الحمل مثل الباراسيتامول (تحت إشراف الطبيب)، ولكن يجب تجنب مضادات الالتهاب غير الستيرويدية مثل الإيبوبروفين. أما البدائل الطبيعية فتشمل الراحة، والكمادات الدافئة، وتدليك المناطق المؤلمة برفق. ورد في الطب النبوي استخدام الحبة السوداء والعسل لتخفيف بعض الآلام.";
    sources = ["منظمة الصحة العالمية: إرشادات استخدام الأدوية أثناء الحمل", "صحيح مسلم: باب التداوي بالحبة السوداء"];
    isMedical = true;
    hasHadith = true;
  } else if (question.includes("أدعية") || question.includes("دعاء")) {
    response = "من الأدعية المأثورة للحامل: \"اللهم إني أستودعك ما في رحمي، اللهم اجعله خلقاً سوياً، واجعله ذخراً لوالديه\". ويمكن للحامل أن تكثر من الدعاء بما ورد في القرآن على لسان أم مريم: \"رَبِّ إِنِّي نَذَرْتُ لَكَ مَا فِي بَطْنِي مُحَرَّرًا فَتَقَبَّلْ مِنِّي إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ\".";
    sources = ["سورة آل عمران: 35", "موسوعة الأدعية والأذكار: صفحة 120"];
    hasQuran = true;
  } else if (question.includes("رمضان") || question.includes("صيام")) {
    response = "يجوز للحامل الإفطار في رمضان إذا كان الصيام يضر بها أو بجنينها، وذلك لقوله تعالى: (وَعَلَى الَّذِينَ يُطِيقُونَهُ فِدْيَةٌ طَعَامُ مِسْكِينٍ). واختلف العلماء في وجوب القضاء عليها، فذهب جمهور العلماء إلى وجوب القضاء، بينما يرى ابن عباس رضي الله عنهما أنها تطعم عن كل يوم مسكيناً ولا قضاء عليها.";
    sources = ["سورة البقرة: 184", "تفسير القرطبي: 2/278", "صحيح البخاري: كتاب الصوم"];
    hasQuran = true;
    hasHadith = true;
  } else if (question.includes("علامات خطر") || question.includes("مخاطر")) {
    response = "من علامات الخطر التي تستدعي مراجعة الطبيب فوراً: النزيف المهبلي، آلام شديدة في البطن، صداع شديد مع تغيرات في الرؤية، تورم مفاجئ في اليدين أو الوجه، قلة حركة الجنين. وقد حث النبي صلى الله عليه وسلم على المبادرة بالتداوي بقوله: \"تداووا عباد الله، فإن الله لم يضع داء إلا وضع له شفاء\".";
    sources = ["منظمة الصحة العالمية: دليل رعاية الحوامل", "سنن الترمذي: باب ما جاء في الدواء والحث عليه"];
    isMedical = true;
    hasHadith = true;
  } else {
    // Default response
    response = "شكراً على سؤالك. من منظور يجمع بين الطب الحديث والثقافة الإسلامية، يمكنني مساعدتك في مسائل الحمل والأمومة مع احترام الخصوصية الثقافية والدينية. هل لديك سؤال محدد في جانب معين من جوانب الحمل أو رعاية الأطفال؟";
  }
  
  return {
    id: Math.random().toString(36).substring(2, 9),
    content: response,
    role: 'assistant',
    timestamp: new Date(),
    sources,
    hasQuran,
    hasHadith,
    isMedical
  };
};

export function AICulturalAssistant() {
  const { direction, locale } = useCultural();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedDialect, setSelectedDialect] = useState('gulf');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Send a message to the AI
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Math.random().toString(36).substring(2, 9),
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    // Simulate AI response with a delay
    setTimeout(() => {
      const aiResponse = generateResponse(userMessage.content);
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
      
      // Read response aloud if audio is enabled
      if (audioEnabled && 'speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(aiResponse.content);
        speech.lang = 'ar-SA';
        window.speechSynthesis.speak(speech);
      }
    }, 1500);
  };
  
  // Handle user pressing Enter to send message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Toggle voice recording
  const handleToggleRecording = () => {
    // This would typically use the Web Speech API for voice recognition
    // For the demo, we'll just simulate recording
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Start recording - simulated
      setTimeout(() => {
        setInputMessage("كيف يؤثر الصيام في رمضان على الحمل؟");
        setIsRecording(false);
      }, 2000);
    }
  };
  
  // Handle selecting a suggested question
  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
    setTimeout(() => handleSendMessage(), 100);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border-kidmam-purple/30">
        <CardHeader className="relative overflow-hidden pb-6">
          <div className="absolute top-0 left-0 w-full h-full">
            <IslamicPattern type="background" className="opacity-10" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-2xl font-amiri">المساعد الثقافي الذكي</CardTitle>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setAudioEnabled(!audioEnabled)}
                      >
                        {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {audioEnabled ? "إيقاف الصوت" : "تفعيل الصوت"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      مساعد يجمع بين المعرفة الطبية والثقافية
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            <CardDescription className="text-muted-foreground">
              أجيب عن استفساراتك حول الحمل والأمومة من منظور طبي وثقافي إسلامي
            </CardDescription>
            
            <Tabs 
              defaultValue="gulf" 
              className="mt-4 w-auto inline-block"
              value={selectedDialect}
              onValueChange={setSelectedDialect}
            >
              <TabsList>
                <TabsTrigger value="gulf">خليجي</TabsTrigger>
                <TabsTrigger value="egyptian">مصري</TabsTrigger>
                <TabsTrigger value="levant">شامي</TabsTrigger>
                <TabsTrigger value="msa">فصحى</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Chat Messages */}
          <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto p-1">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <Sparkles className="h-12 w-12 text-kidmam-purple/50 mx-auto mb-4" />
                <h3 className="text-lg font-medium">كيف يمكنني مساعدتك اليوم؟</h3>
                <p className="text-muted-foreground mt-2 text-sm max-w-md mx-auto">
                  يمكنني الإجابة على أسئلتك حول الحمل والأمومة مع مراعاة الجوانب الثقافية والدينية
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-kidmam-purple text-white rounded-br-none'
                        : 'bg-muted rounded-bl-none'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex items-center mb-2">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src="/images/ai-assistant.png" />
                          <AvatarFallback className="bg-kidmam-teal/20 text-kidmam-teal text-xs">AI</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-foreground font-medium">المساعد الثقافي</span>
                      </div>
                    )}
                    
                    <div 
                      className={`${message.hasQuran ? 'font-amiri text-base leading-relaxed' : 'text-sm'}`}
                    >
                      {message.content}
                    </div>
                    
                    {message.role === 'assistant' && message.sources && message.sources.length > 0 && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        <p className="font-medium">المصادر:</p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          {message.sources.map((source, index) => (
                            <li key={index}>{source}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {message.role === 'assistant' && (
                      <div className="flex items-center mt-2 space-x-2 rtl:space-x-reverse">
                        {message.hasQuran && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                            قرآن
                          </span>
                        )}
                        {message.hasHadith && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                            حديث
                          </span>
                        )}
                        {message.isMedical && (
                          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                            طبي
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted max-w-[80%] rounded-lg p-4 rounded-bl-none">
                  <div className="flex space-x-2 rtl:space-x-reverse items-center">
                    <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '400ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Suggested questions */}
          {messages.length < 2 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">أسئلة مقترحة:</h4>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question.text)}
                    className="px-3 py-1.5 rounded-full text-xs bg-kidmam-purple/10 text-kidmam-purple hover:bg-kidmam-purple/20"
                  >
                    {question.text}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Message input */}
          <div className="flex items-end space-x-2 rtl:space-x-reverse mt-4">
            <Button
              variant="outline"
              size="icon"
              className={`${isRecording ? 'bg-red-100 text-red-500 animate-pulse' : ''}`}
              onClick={handleToggleRecording}
            >
              <Mic className="h-4 w-4" />
            </Button>
            
            <div className="flex-1 relative">
              <Textarea
                placeholder="اكتب سؤالاً..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="min-h-[60px] resize-none pr-12"
                dir="auto"
              />
              <Button 
                className="absolute bottom-1 right-1 h-8 w-8 p-0"
                disabled={!inputMessage.trim()}
                onClick={handleSendMessage}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="text-xs text-muted-foreground">
          هذا المساعد يقدم معلومات عامة ولا يغني عن استشارة الطبيب المختص
        </CardFooter>
      </Card>
    </div>
  );
}

