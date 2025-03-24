
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MessageSource {
  text: string;
}

export interface MessageProps {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  sources?: string[];
  hasQuran?: boolean;
  hasHadith?: boolean;
  isMedical?: boolean;
}

export const ChatMessage: React.FC<{ message: MessageProps }> = ({ message }) => {
  return (
    <div
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
  );
};
