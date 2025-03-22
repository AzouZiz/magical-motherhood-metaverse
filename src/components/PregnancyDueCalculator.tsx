
import { useState, useEffect } from 'react';
import { format, addDays, addWeeks, subWeeks, differenceInDays, isValid, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calendar as CalendarIcon, AlertCircle, Calendar, Baby } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

type DateInfoType = {
  label: string;
  date: Date | null;
  description: string;
  weeks?: string;
  icon?: React.ReactNode;
  color?: string;
};

const PregnancyDueCalculator = () => {
  const [lmpDate, setLmpDate] = useState<Date | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [calculationMethod, setCalculationMethod] = useState<'lmp' | 'conception' | 'ultrasound'>('lmp');
  const [conceptionDate, setConceptionDate] = useState<Date | null>(null);
  const [ultrasoundDate, setUltrasoundDate] = useState<Date | null>(null);
  const [ultrasoundWeeks, setUltrasoundWeeks] = useState<number>(8);
  const [importantDates, setImportantDates] = useState<DateInfoType[]>([]);
  const [currentWeek, setCurrentWeek] = useState<number | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Calculate due date based on LMP
  const calculateFromLMP = (date: Date) => {
    return addDays(date, 280); // 40 weeks from LMP
  };

  // Calculate due date based on conception date
  const calculateFromConception = (date: Date) => {
    return addDays(date, 266); // 38 weeks from conception
  };

  // Calculate due date based on ultrasound date and gestational age
  const calculateFromUltrasound = (date: Date, weeks: number) => {
    const daysPregnant = weeks * 7;
    const conceptionEstimate = subWeeks(date, weeks);
    return addDays(conceptionEstimate, 266); // 38 weeks from conception
  };

  // Calculate important dates based on due date
  const calculateImportantDates = (calculatedDueDate: Date) => {
    if (!calculatedDueDate || !isValid(calculatedDueDate)) return [];

    const dates: DateInfoType[] = [
      {
        label: "بداية الحمل (تقريباً)",
        date: subWeeks(calculatedDueDate, 40),
        description: "تاريخ بداية الحمل التقريبي",
        weeks: "0",
        icon: <Baby className="h-4 w-4 text-kidmam-teal/80" />,
        color: "bg-kidmam-teal/10 text-kidmam-teal border-kidmam-teal/20"
      },
      {
        label: "نهاية الثلث الأول",
        date: subWeeks(calculatedDueDate, 27),
        description: "نهاية 13 أسبوع من الحمل",
        weeks: "13",
        icon: <Calendar className="h-4 w-4 text-kidmam-gold/80" />,
        color: "bg-kidmam-gold/10 text-kidmam-gold border-kidmam-gold/20"
      },
      {
        label: "نهاية الثلث الثاني",
        date: subWeeks(calculatedDueDate, 14),
        description: "نهاية 26 أسبوع من الحمل",
        weeks: "26",
        icon: <Calendar className="h-4 w-4 text-kidmam-rose/80" />,
        color: "bg-kidmam-rose/10 text-kidmam-rose border-kidmam-rose/20"
      },
      {
        label: "موعد الولادة",
        date: calculatedDueDate,
        description: "تاريخ الولادة المتوقع (40 أسبوع)",
        weeks: "40",
        icon: <Baby className="h-4 w-4 text-kidmam-purple/80" />,
        color: "bg-kidmam-purple/10 text-kidmam-purple border-kidmam-purple/20"
      }
    ];

    // Add monthly milestones
    for (let month = 1; month <= 9; month++) {
      if (month !== 3 && month !== 6 && month !== 9) { // Skip months already covered by trimesters
        const weekNum = Math.round(month * 4.33);
        dates.push({
          label: `الشهر ${month}`,
          date: subWeeks(calculatedDueDate, 40 - weekNum),
          description: `${weekNum} أسبوع من الحمل`,
          weeks: `${weekNum}`,
        });
      }
    }

    // Sort by date
    return dates.sort((a, b) => {
      if (a.date && b.date) {
        return a.date.getTime() - b.date.getTime();
      }
      return 0;
    });
  };

  // Calculate current pregnancy week
  const calculateCurrentWeek = (dueDate: Date) => {
    if (!dueDate || !isValid(dueDate)) return null;
    
    const today = new Date();
    const totalDaysInPregnancy = 280; // 40 weeks
    const daysLeft = differenceInDays(dueDate, today);
    
    if (daysLeft < 0) return null; // Already gave birth
    if (daysLeft > totalDaysInPregnancy) return 0; // Not pregnant yet
    
    return Math.floor((totalDaysInPregnancy - daysLeft) / 7);
  };

  // Handle calculation
  const handleCalculate = () => {
    let calculatedDueDate: Date | null = null;

    switch (calculationMethod) {
      case 'lmp':
        if (lmpDate) {
          calculatedDueDate = calculateFromLMP(lmpDate);
        }
        break;
      case 'conception':
        if (conceptionDate) {
          calculatedDueDate = calculateFromConception(conceptionDate);
        }
        break;
      case 'ultrasound':
        if (ultrasoundDate) {
          calculatedDueDate = calculateFromUltrasound(ultrasoundDate, ultrasoundWeeks);
        }
        break;
    }

    setDueDate(calculatedDueDate);
    
    if (calculatedDueDate) {
      setImportantDates(calculateImportantDates(calculatedDueDate));
      setCurrentWeek(calculateCurrentWeek(calculatedDueDate));
    }
  };

  // Format date to Arabic
  const formatDate = (date: Date | null) => {
    if (!date || !isValid(date)) return "غير محدد";
    return format(date, 'dd MMMM yyyy', { locale: ar });
  };

  useEffect(() => {
    // Auto-calculate when inputs change
    if (
      (calculationMethod === 'lmp' && lmpDate) ||
      (calculationMethod === 'conception' && conceptionDate) ||
      (calculationMethod === 'ultrasound' && ultrasoundDate)
    ) {
      handleCalculate();
    }
  }, [lmpDate, conceptionDate, ultrasoundDate, ultrasoundWeeks, calculationMethod]);

  return (
    <Card className="shadow-md border-kidmam-purple/20 transition-all duration-300 hover:shadow-lg overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r from-soothing-lightPurple/50 to-soothing-lightBlue/30">
        <CardTitle className="text-xl font-bold">حاسبة موعد الولادة</CardTitle>
        <CardDescription>
          احسبي موعد ولادتك المتوقع والتواريخ المهمة خلال الحمل
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-4">
        <Tabs defaultValue="lmp" onValueChange={(value) => setCalculationMethod(value as any)}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="lmp">آخر دورة شهرية</TabsTrigger>
            <TabsTrigger value="conception">تاريخ الحمل</TabsTrigger>
            <TabsTrigger value="ultrasound">السونار</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lmp" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="lmp-date">تاريخ أول يوم من آخر دورة شهرية</Label>
              <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-right"
                    onClick={() => setIsDatePickerOpen(true)}
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {lmpDate ? formatDate(lmpDate) : "اختاري التاريخ"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={lmpDate || undefined}
                    onSelect={(date) => {
                      setLmpDate(date);
                      setIsDatePickerOpen(false);
                    }}
                    disabled={(date) => date > new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </TabsContent>
          
          <TabsContent value="conception" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="conception-date">تاريخ الحمل (إذا كنتِ تعرفينه)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-right">
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {conceptionDate ? formatDate(conceptionDate) : "اختاري التاريخ"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={conceptionDate || undefined}
                    onSelect={setConceptionDate}
                    disabled={(date) => date > new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </TabsContent>
          
          <TabsContent value="ultrasound" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ultrasound-date">تاريخ الفحص بالموجات فوق الصوتية</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-right">
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {ultrasoundDate ? formatDate(ultrasoundDate) : "اختاري التاريخ"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={ultrasoundDate || undefined}
                    onSelect={setUltrasoundDate}
                    disabled={(date) => date > new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ultrasound-weeks">عمر الحمل وقت الفحص (بالأسابيع)</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="ultrasound-weeks"
                  type="number"
                  min="4"
                  max="42"
                  value={ultrasoundWeeks}
                  onChange={(e) => setUltrasoundWeeks(parseInt(e.target.value))}
                  className="text-center"
                />
                <span>أسبوع</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Results Section */}
        {dueDate && (
          <div className="mt-6 space-y-4">
            <div className="bg-gradient-to-r from-kidmam-purple/10 to-kidmam-light p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-1">موعد الولادة المتوقع:</h3>
              <p className="text-2xl font-bold text-kidmam-purple">{formatDate(dueDate)}</p>
              
              {currentWeek !== null && (
                <div className="mt-2 flex items-center">
                  <Badge variant="outline" className="bg-kidmam-purple/10 border-kidmam-purple/20">
                    الأسبوع {currentWeek} من الحمل
                  </Badge>
                  {currentWeek <= 13 && <Badge className="mr-2 bg-kidmam-gold/80">الثلث الأول</Badge>}
                  {currentWeek > 13 && currentWeek <= 26 && <Badge className="mr-2 bg-kidmam-teal">الثلث الثاني</Badge>}
                  {currentWeek > 26 && <Badge className="mr-2 bg-kidmam-rose">الثلث الثالث</Badge>}
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">التواريخ المهمة:</h3>
              <div className="space-y-2">
                {importantDates.map((dateInfo, index) => (
                  <div 
                    key={index} 
                    className="p-3 rounded-lg border flex items-start space-x-3 space-x-reverse"
                    style={{ borderColor: 'rgba(179, 157, 219, 0.2)' }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{dateInfo.label}</h4>
                        {dateInfo.weeks && (
                          <Badge 
                            variant="outline" 
                            className={dateInfo.color || "bg-gray-100 border-gray-200"}
                          >
                            {dateInfo.icon}
                            <span className="mr-1">الأسبوع {dateInfo.weeks}</span>
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{formatDate(dateInfo.date)}</p>
                      <p className="text-xs text-gray-500 mt-1">{dateInfo.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-xs text-gray-500 mt-4 border-t pt-4">
              <AlertCircle className="h-4 w-4 inline-block ml-1" />
              <span>ملاحظة: هذه التواريخ تقريبية وقد تختلف بناءً على تقييم طبيبك.</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PregnancyDueCalculator;
