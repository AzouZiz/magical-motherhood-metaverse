
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TooltipProvider, TooltipTrigger, TooltipContent, Tooltip } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCultural } from "@/contexts/CulturalContext";
import { Mic, Send, Info, VolumeX, Volume2, Sparkles } from 'lucide-react';
import { IslamicPattern } from './IslamicPatterns';
import { ChatMessage, MessageProps } from './ChatMessage';
import { SuggestedQuestions, SuggestedQuestionProps } from './SuggestedQuestions';
import { generateResponse, suggestedQuestions } from './responseGenerator';

export function AICulturalAssistant() {
  const { direction, locale } = useCultural();
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedDialect, setSelectedDialect] = useState('gulf');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  
  // التمرير إلى أسفل الرسائل
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // إرسال رسالة إلى الذكاء الاصطناعي
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // إضافة رسالة المستخدم
    const userMessage: MessageProps = {
      id: Math.random().toString(36).substring(2, 9),
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    // محاكاة استجابة الذكاء الاصطناعي مع تأخير
    setTimeout(() => {
      const aiResponse = generateResponse(userMessage.content);
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
      
      // قراءة الاستجابة بصوت عالٍ إذا كان الصوت ممكّناً
      if (audioEnabled && 'speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(aiResponse.content);
        speech.lang = 'ar-SA';
        window.speechSynthesis.speak(speech);
      }
    }, 1500);
  };
  
  // معالجة ضغط المستخدم على Enter لإرسال الرسالة
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // تبديل تسجيل الصوت
  const handleToggleRecording = () => {
    // عادة ما يستخدم واجهة برمجة تطبيقات الكلام للتعرف على الصوت
    // بالنسبة للعرض التوضيحي، سنقوم فقط بمحاكاة التسجيل
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // بدء التسجيل - محاكاة
      setTimeout(() => {
        setInputMessage("كيف يؤثر الصيام في رمضان على الحمل؟");
        setIsRecording(false);
      }, 2000);
    }
  };
  
  // معالجة اختيار سؤال مقترح
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
          {/* رسائل الدردشة */}
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
                <ChatMessage key={message.id} message={message} />
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
          
          {/* أسئلة مقترحة */}
          {messages.length < 2 && (
            <SuggestedQuestions 
              questions={suggestedQuestions} 
              onSelectQuestion={handleSuggestedQuestion} 
              limit={3}
            />
          )}
          
          {/* إدخال الرسالة */}
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
