
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UsersRound, MessageCircle, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MothersSupport = () => {
  const navigate = useNavigate();
  
  const supportGroups = [
    { name: "أمهات المرة الأولى", members: 1243, posts: 567 },
    { name: "دعم الحمل عالي الخطورة", members: 856, posts: 432 },
    { name: "الحامل العاملة", members: 971, posts: 389 }
  ];

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow border-kidmam-purple/20">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <UsersRound className="w-5 h-5 text-kidmam-purple ml-2" />
          مجتمع دعم الأمهات
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {supportGroups.map((group, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-kidmam-light/20 transition-colors">
              <div>
                <h3 className="font-medium text-kidmam-dark">{group.name}</h3>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span className="flex items-center">
                    <UsersRound className="inline-block w-3 h-3 ml-1" />
                    {group.members} عضوة
                  </span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <MessageCircle className="inline-block w-3 h-3 ml-1" />
                    {group.posts} منشور
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-kidmam-purple">
                انضمام
                <Heart className="w-4 h-4 mr-1" />
              </Button>
            </div>
          ))}
        </div>
        <Button 
          className="w-full mt-4 bg-kidmam-purple hover:bg-kidmam-purple/90" 
          onClick={() => navigate('/community')}
        >
          استكشاف المجتمع
        </Button>
      </CardContent>
    </Card>
  );
};

export default MothersSupport;
