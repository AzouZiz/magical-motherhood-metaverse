
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getAIResponse, textToSpeech, startSpeechRecognition } from '@/utils/aiIntegration';

// أنواع البيانات للسياق
interface AIContextType {
  isProcessing: boolean;
  sendPrompt: (prompt: string) => Promise<string>;
  speakText: (text: string, lang?: string) => void;
  startListening: () => void;
  stopListening: () => void;
  isListening: boolean;
  error: string | null;
}

// إنشاء السياق
const AIContext = createContext<AIContextType | undefined>(undefined);

// مزود السياق
export const AIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stopListeningFn, setStopListeningFn] = useState<(() => void) | null>(null);

  // إرسال استفسار إلى الذكاء الاصطناعي
  const sendPrompt = async (prompt: string): Promise<string> => {
    try {
      setIsProcessing(true);
      setError(null);
      
      const response = await getAIResponse({ prompt });
      return response.text;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ أثناء معالجة طلبك';
      setError(errorMessage);
      return `خطأ: ${errorMessage}`;
    } finally {
      setIsProcessing(false);
    }
  };

  // قراءة النص بصوت عالٍ
  const speakText = (text: string, lang = 'ar-SA') => {
    textToSpeech(text, lang);
  };

  // بدء الاستماع للكلام
  const startListening = () => {
    if (isListening) return;
    
    try {
      const stopFn = startSpeechRecognition(
        (text) => {
          console.log('تم التعرف على النص:', text);
          // هنا يمكن معالجة النص المتعرف عليه
        },
        (err) => {
          console.error('خطأ في التعرف على الكلام:', err);
          setError(err.message || 'حدث خطأ أثناء التعرف على الكلام');
          setIsListening(false);
        }
      );
      
      setStopListeningFn(() => stopFn);
      setIsListening(true);
    } catch (err) {
      setError('فشل بدء التعرف على الكلام');
    }
  };

  // إيقاف الاستماع للكلام
  const stopListening = () => {
    if (stopListeningFn) {
      stopListeningFn();
      setStopListeningFn(null);
    }
    setIsListening(false);
  };

  // قيمة السياق
  const contextValue: AIContextType = {
    isProcessing,
    sendPrompt,
    speakText,
    startListening,
    stopListening,
    isListening,
    error
  };

  return (
    <AIContext.Provider value={contextValue}>
      {children}
    </AIContext.Provider>
  );
};

// دالة مساعدة لاستخدام سياق الذكاء الاصطناعي
export const useAI = () => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI يجب استخدامها داخل AIProvider');
  }
  return context;
};
