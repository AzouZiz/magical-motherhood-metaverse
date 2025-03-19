
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Camera, FileText, PlusCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const PregnancyJournal = () => {
  const journalEntries = [
    { 
      week: 12, 
      title: "أول ركلة للجنين", 
      date: "10 مايو 2023",
      hasPhoto: true,
      hasNotes: true
    },
    { 
      week: 16, 
      title: "زيارة الطبيب الشهرية", 
      date: "7 يونيو 2023",
      hasPhoto: true,
      hasNotes: true
    },
    { 
      week: 20, 
      title: "معرفة جنس المولود", 
      date: "5 يوليو 2023",
      hasPhoto: false,
      hasNotes: true
    }
  ];

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow border-kidmam-purple/20">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <BookOpen className="w-5 h-5 text-kidmam-purple ml-2" />
          توثيق رحلة الحمل
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {journalEntries.map((entry, index) => (
            <div key={index} className="p-2 rounded-md hover:bg-kidmam-light/20 transition-colors">
              <div className="flex justify-between">
                <h3 className="font-medium text-kidmam-dark">{entry.title}</h3>
                <Badge className="bg-kidmam-purple/10 text-kidmam-purple border-kidmam-purple/20">
                  الأسبوع {entry.week}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{entry.date}</p>
              <div className="flex gap-2 mt-2">
                {entry.hasPhoto && (
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    <Camera className="w-3 h-3 ml-1" />
                    صور
                  </Badge>
                )}
                {entry.hasNotes && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                    <FileText className="w-3 h-3 ml-1" />
                    ملاحظات
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <Button className="w-full mt-4 bg-kidmam-purple hover:bg-kidmam-purple/90">
          <PlusCircle className="w-4 h-4 ml-1" />
          إضافة ذكرى جديدة
        </Button>
      </CardContent>
    </Card>
  );
};

export default PregnancyJournal;
