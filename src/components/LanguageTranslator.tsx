
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, MessageSquare, RotateCw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LanguageTranslator = () => {
  const [fromLanguage, setFromLanguage] = useState("ar");
  const [toLanguage, setToLanguage] = useState("en");
  
  const languages = [
    { code: "ar", name: "العربية" },
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "es", name: "Español" },
    { code: "ur", name: "اردو" },
    { code: "hi", name: "हिंदी" }
  ];
  
  const commonPhrases = [
    { ar: "أشعر بألم في الظهر", en: "I feel pain in my back" },
    { ar: "متى موعد الولادة المتوقع؟", en: "When is the expected delivery date?" },
    { ar: "هل يمكنني تناول هذا الدواء؟", en: "Can I take this medication?" }
  ];

  const swapLanguages = () => {
    const temp = fromLanguage;
    setFromLanguage(toLanguage);
    setToLanguage(temp);
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow border-kidmam-teal/20">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <Globe className="w-5 h-5 text-kidmam-teal ml-2" />
          الترجمة متعددة اللغات
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-2 mb-4">
          <Select value={fromLanguage} onValueChange={setFromLanguage}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="اختاري اللغة المصدر" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="ghost" size="icon" onClick={swapLanguages}>
            <RotateCw className="w-4 h-4" />
          </Button>
          
          <Select value={toLanguage} onValueChange={setToLanguage}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="اختاري لغة الترجمة" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          {commonPhrases.map((phrase, index) => (
            <div 
              key={index} 
              className="p-2 rounded-md hover:bg-kidmam-light/20 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-kidmam-teal flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-medium">{phrase.ar}</p>
                  <p className="text-xs text-muted-foreground mt-1">{phrase.en}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button className="w-full mt-4">
          المزيد من العبارات الطبية
        </Button>
      </CardContent>
    </Card>
  );
};

export default LanguageTranslator;
