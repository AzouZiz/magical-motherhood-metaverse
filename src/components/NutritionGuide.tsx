
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Utensils, AlertCircle, Calendar } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const NutritionGuide = () => {
  const nutritionTips = [
    { 
      title: "الفواكه الغنية بالحديد", 
      description: "تناولي العنب والمشمش والتوت لزيادة مستويات الحديد", 
      trimester: "الثاني"
    },
    { 
      title: "الكالسيوم للعظام القوية", 
      description: "حافظي على تناول منتجات الألبان ومشتقاتها للجنين", 
      trimester: "الثالث"
    },
    { 
      title: "البروتينات الصحية", 
      description: "الأسماك والبقوليات غنية بالأوميغا 3 والبروتينات", 
      trimester: "الأول"
    }
  ];

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow border-kidmam-teal/20">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <Utensils className="w-5 h-5 text-kidmam-teal ml-2" />
          دليل التغذية التفاعلي
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {nutritionTips.map((tip, index) => (
            <div key={index} className="p-2 rounded-md hover:bg-kidmam-light/20 transition-colors">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-kidmam-dark">{tip.title}</h3>
                <Badge variant="outline" className="bg-kidmam-teal/10 text-kidmam-teal border-kidmam-teal/20">
                  الثلث {tip.trimester}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{tip.description}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <Button variant="outline" className="flex items-center text-sm">
            <Calendar className="w-4 h-4 ml-1" />
            خطة غذائية مخصصة
          </Button>
          <Button variant="outline" className="flex items-center text-sm">
            <AlertCircle className="w-4 h-4 ml-1" />
            استشارة تغذية
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionGuide;
