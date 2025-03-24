
import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Plus, Minus } from 'lucide-react';

type WeekControlsProps = {
  weekNumber: number;
  setWeekNumber: (week: number) => void;
  totalWeeks: number;
};

const WeekControls: React.FC<WeekControlsProps> = ({
  weekNumber,
  setWeekNumber,
  totalWeeks,
}) => {
  const increaseWeek = () => {
    if (weekNumber < totalWeeks) {
      setWeekNumber(weekNumber + 1);
    }
  };
  
  const decreaseWeek = () => {
    if (weekNumber > 1) {
      setWeekNumber(weekNumber - 1);
    }
  };

  return (
    <div className="mt-8 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Button 
          variant="outline" 
          size="icon"
          onClick={decreaseWeek}
          disabled={weekNumber <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="text-center">
          <span className="text-lg font-medium">الأسبوع {weekNumber}</span>
        </div>
        <Button 
          variant="outline" 
          size="icon"
          onClick={increaseWeek}
          disabled={weekNumber >= totalWeeks}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <Slider
        value={[weekNumber]}
        min={1}
        max={totalWeeks}
        step={1}
        onValueChange={(value) => setWeekNumber(value[0])}
        className="my-4"
      />
      
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>الأسبوع 1</span>
        <span>الأسبوع {totalWeeks}</span>
      </div>
    </div>
  );
};

export default WeekControls;
