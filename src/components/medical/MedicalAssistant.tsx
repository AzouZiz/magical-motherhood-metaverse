
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Info, HeartPulse } from 'lucide-react';
import { TooltipProvider, TooltipTrigger, TooltipContent, Tooltip } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  category?: 'nutrition' | 'symptoms' | 'medication' | 'general';
}

const MedicalAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // سوف يتم استبداله بمنطق فعلي للاتصال بواجهة برمجة التطبيقات الطبية
  const generateMedicalResponse = (query: string): Message => {
    let category: 'nutrition' | 'symptoms' | 'medication' | 'general' = 'general';
    let response = '';

    if (query.includes('تغذية') || query.includes('طعام') || query.includes('غذاء')) {
      category = 'nutrition';
      response = 'التغذية السليمة أثناء الحمل تشمل تناول الأطعمة الغنية بالفيتامينات والمعادن مثل الخضروات الورقية، والفواكه، والبروتينات الصحية. من المهم زيادة تناول حمض الفوليك والحديد والكالسيوم.';
    } else if (query.includes('ألم') || query.includes('أعراض') || query.includes('وجع')) {
      category = 'symptoms';
      response = 'الألم البسيط أمر شائع أثناء الحمل، لكن أي ألم شديد أو مستمر يجب مراجعة الطبيب فورًا. تشمل الأعراض الطبيعية الغثيان الصباحي، وآلام الظهر الخفيفة، وتقلصات الساق.';
    } else if (query.includes('دواء') || query.includes('علاج')) {
      category = 'medication';
      response = 'يجب عدم تناول أي دواء دون استشارة الطبيب أثناء الحمل. حتى الأدوية التي لا تستلزم وصفة طبية قد تشكل خطرًا على الجنين. راجعي طبيبك قبل تناول أي مسكن ألم أو مضاد حيوي.';
    } else {
      response = 'مرحبًا بك في المساعد الطبي. يمكنني مساعدتك في الإجابة على أسئلتك الطبية المتعلقة بالحمل والأمومة. تذكري دائمًا أن استشارة الطبيب هي الخيار الأفضل للحالات الفردية.';
    }

    return {
      id: Math.random().toString(36).substring(2, 9),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
      category
    };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substring(2, 9),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // محاكاة تأخير الشبكة
    setTimeout(() => {
      const assistantResponse = generateMedicalResponse(userMessage.content);
      setMessages(prev => [...prev, assistantResponse]);
      setIsLoading(false);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="border-kidmam-teal/30 shadow-md">
      <CardHeader className="bg-gradient-to-r from-soothing-lightTeal/40 to-soothing-lightBlue/20">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <HeartPulse className="w-5 h-5 mr-2 text-kidmam-teal" />
            المساعد الطبي
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                أجيب عن الأسئلة الطبية المتعلقة بالحمل والأمومة
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>
          استشارة طبية ذكية لصحة الأم والجنين
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="space-y-4 mb-4 max-h-[300px] overflow-y-auto p-1">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <HeartPulse className="h-10 w-10 text-kidmam-teal/40 mx-auto mb-3" />
              <p className="text-muted-foreground">
                مرحبًا، يمكنني مساعدتك في الإجابة على أسئلتك الطبية. ما الذي تودين معرفته؟
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user' 
                      ? 'bg-kidmam-teal text-white rounded-br-none' 
                      : 'bg-muted rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  
                  {message.role === 'assistant' && message.category && (
                    <div className="mt-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          message.category === 'nutrition' 
                            ? 'bg-green-100 text-green-800 border-green-200' 
                            : message.category === 'symptoms' 
                              ? 'bg-amber-100 text-amber-800 border-amber-200'
                              : message.category === 'medication'
                                ? 'bg-blue-100 text-blue-800 border-blue-200'
                                : 'bg-gray-100 text-gray-800 border-gray-200'
                        }`}
                      >
                        {message.category === 'nutrition' 
                          ? 'تغذية' 
                          : message.category === 'symptoms' 
                            ? 'أعراض'
                            : message.category === 'medication'
                              ? 'أدوية'
                              : 'معلومات عامة'
                        }
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted max-w-[80%] rounded-lg p-3 rounded-bl-none">
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <div className="w-2 h-2 rounded-full bg-kidmam-teal/40 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-kidmam-teal/40 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-kidmam-teal/40 animate-bounce" style={{ animationDelay: '400ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex items-end space-x-2 rtl:space-x-reverse mt-4">
          <div className="flex-1 relative">
            <Textarea
              placeholder="اكتب سؤالك الطبي هنا..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[60px] resize-none pr-12"
              dir="auto"
            />
            <Button 
              className="absolute bottom-1 right-1 h-8 w-8 p-0"
              disabled={!inputMessage.trim() || isLoading}
              onClick={handleSendMessage}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="text-xs text-muted-foreground">
        هذا المساعد يقدم معلومات عامة ولا يغني عن زيارة الطبيب
      </CardFooter>
    </Card>
  );
};

export default MedicalAssistant;
