
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

const MOOD_DATA = [
  { day: 'السبت', value: 70 },
  { day: 'الأحد', value: 65 },
  { day: 'الإثنين', value: 80 },
  { day: 'الثلاثاء', value: 75 },
  { day: 'الأربعاء', value: 60 },
  { day: 'الخميس', value: 85 },
  { day: 'الجمعة', value: 90 },
];

const SLEEP_DATA = [
  { day: 'السبت', hours: 6.5 },
  { day: 'الأحد', hours: 7 },
  { day: 'الإثنين', hours: 8 },
  { day: 'الثلاثاء', hours: 6 },
  { day: 'الأربعاء', hours: 7.5 },
  { day: 'الخميس', hours: 8.5 },
  { day: 'الجمعة', hours: 7 },
];

const TIPS = [
  'تناولي وجبات صغيرة متكررة لتقليل غثيان الصباح',
  'اشربي 8-10 أكواب من الماء يوميًا',
  'مارسي تمارين خفيفة كالمشي لمدة 30 دقيقة يوميًا',
  'تجنبي حمل الأشياء الثقيلة خلال الحمل',
  'احرصي على تناول الفيتامينات الموصى بها من طبيبك',
];

const PregnancyInsightsDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* بطاقة الحالة المزاجية */}
      <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">الحالة المزاجية الأسبوعية</CardTitle>
          <CardDescription>تتبع حالتك المزاجية خلال الأسبوع</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOOD_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="value" stroke="#9b6dff" strokeWidth={2} />
                <CartesianGrid stroke="#f5f5f5" strokeDasharray="5 5" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 100]} hide />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'المزاج']}
                  labelFormatter={(label) => `يوم ${label}`}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4">
            <Label htmlFor="mood-today" className="text-sm mb-2 block">كيف تشعرين اليوم؟</Label>
            <Slider
              id="mood-today"
              defaultValue={[75]}
              max={100}
              step={1}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>😔 متعبة</span>
              <span>😐 محايدة</span>
              <span>😊 سعيدة</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* بطاقة ساعات النوم */}
      <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">ساعات النوم</CardTitle>
          <CardDescription>تتبع نمط نومك خلال الأسبوع</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={SLEEP_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="hours" stroke="#4fd1c5" strokeWidth={2} />
                <CartesianGrid stroke="#f5f5f5" strokeDasharray="5 5" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 12]} />
                <Tooltip 
                  formatter={(value) => [`${value} ساعات`, 'النوم']}
                  labelFormatter={(label) => `يوم ${label}`}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm font-medium">متوسط ساعات نومك: 7.2 ساعة</p>
            <p className="text-xs text-muted-foreground mt-1">الموصى به: 7-9 ساعات يوميًا</p>
          </div>
        </CardContent>
      </Card>

      {/* نصائح صحية */}
      <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">نصائح صحية للأسبوع 24</CardTitle>
          <CardDescription>نصائح مخصصة لك في هذه المرحلة من الحمل</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {TIPS.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-kidmam-teal"></div>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-4 bg-kidmam-light/50 rounded-lg p-3 border border-kidmam-teal/20">
            <p className="text-sm font-medium">تذكير بموعدك القادم</p>
            <p className="text-xs text-muted-foreground mt-1">الثلاثاء، 15 أغسطس، 10:00 صباحًا - فحص الموجات فوق الصوتية</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PregnancyInsightsDashboard;
