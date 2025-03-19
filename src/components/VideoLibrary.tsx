
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Film, CheckCircle, BookOpen } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const VideoLibrary = () => {
  const videos = [
    { 
      title: "تمارين الظهر للحامل", 
      duration: "12:45", 
      category: "تمارين",
      thumbnail: "https://placehold.co/120x68/kidmam/FFF",
      viewed: true
    },
    { 
      title: "تقنيات التنفس أثناء المخاض", 
      duration: "08:30", 
      category: "الولادة",
      thumbnail: "https://placehold.co/120x68/kidmam/FFF",
      viewed: false
    },
    { 
      title: "التغييرات الهرمونية خلال الحمل", 
      duration: "15:20", 
      category: "صحة",
      thumbnail: "https://placehold.co/120x68/kidmam/FFF",
      viewed: false
    }
  ];

  const categories = ["الكل", "تمارين", "تغذية", "الولادة", "صحة", "رعاية الطفل"];

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow border-kidmam-gold/20">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <Film className="w-5 h-5 text-kidmam-gold ml-2" />
          مكتبة الفيديوهات التعليمية
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1 mb-3">
          {categories.map((category, index) => (
            <Badge 
              key={index} 
              variant={index === 0 ? "default" : "outline"}
              className={index === 0 ? "bg-kidmam-gold hover:bg-kidmam-gold/90" : "hover:bg-kidmam-gold/10"}
            >
              {category}
            </Badge>
          ))}
        </div>
        
        <div className="space-y-3">
          {videos.map((video, index) => (
            <div key={index} className="flex gap-3 p-2 rounded-md hover:bg-kidmam-light/20 transition-colors">
              <div className="relative rounded-md overflow-hidden flex-shrink-0">
                <img src={video.thumbnail} alt={video.title} className="w-[120px] h-[68px] object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors">
                  <Play className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-medium text-kidmam-dark flex items-center">
                    {video.title}
                    {video.viewed && <CheckCircle className="w-3 h-3 mr-1 text-green-500" />}
                  </h3>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Badge variant="outline" className="text-[10px] h-4 px-1">
                      {video.category}
                    </Badge>
                    <span className="mx-2">•</span>
                    <span>{video.duration}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-kidmam-gold justify-start h-6 px-1">
                  <BookOpen className="w-3 h-3 ml-1" />
                  <span className="text-xs">ملخص الفيديو</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <Button className="w-full mt-4 bg-kidmam-gold hover:bg-kidmam-gold/90">
          استكشاف المكتبة
        </Button>
      </CardContent>
    </Card>
  );
};

export default VideoLibrary;
