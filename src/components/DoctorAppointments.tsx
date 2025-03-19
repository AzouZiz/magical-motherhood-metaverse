
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, PlusCircle, Bell } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { ar } from 'date-fns/locale';

const DoctorAppointments = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const appointments = [
    { 
      doctor: "د. سارة أحمد", 
      specialty: "طبيبة نساء وتوليد", 
      date: "15 يونيو 2023", 
      time: "10:30 صباحاً",
      reminder: true
    },
    { 
      doctor: "د. خالد محمود", 
      specialty: "أخصائي تغذية", 
      date: "22 يونيو 2023", 
      time: "12:00 مساءً",
      reminder: true
    }
  ];

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow border-kidmam-rose/20">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <Clock className="w-5 h-5 text-kidmam-rose ml-2" />
          مواعيد الطبيب والتذكيرات
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {appointments.map((appointment, index) => (
            <div key={index} className="p-3 rounded-md border border-kidmam-rose/10 hover:border-kidmam-rose/30 transition-colors">
              <div className="flex justify-between">
                <h3 className="font-medium text-kidmam-dark">{appointment.doctor}</h3>
                <Badge variant="outline" className={`${appointment.reminder ? 'bg-kidmam-rose/10 text-kidmam-rose' : 'bg-muted/30'}`}>
                  {appointment.reminder ? <Bell className="w-3 h-3 ml-1" /> : null}
                  تذكير
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{appointment.specialty}</p>
              <div className="flex items-center justify-between mt-2 text-sm">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 ml-1 text-kidmam-rose/70" />
                  {appointment.date}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 ml-1 text-kidmam-rose/70" />
                  {appointment.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t border-border/30">
        <Button variant="outline" size="sm" className="text-sm">
          <PlusCircle className="w-4 h-4 ml-1" />
          موعد جديد
        </Button>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="text-sm">
              <Calendar className="w-4 h-4 ml-1" />
              عرض التقويم
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              locale={ar}
              className="rounded-md border"
            />
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  );
};

export default DoctorAppointments;
