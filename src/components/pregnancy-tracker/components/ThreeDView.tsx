
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import FetusThreedModel from '../../FetusThreedModel';
import { ViewMode, VisualizationView } from '../types';

type ThreeDViewProps = {
  weekNumber: number;
  visualizationView: VisualizationView;
  setVisualizationView: (view: VisualizationView) => void;
  setViewMode: (mode: ViewMode) => void;
};

const ThreeDView: React.FC<ThreeDViewProps> = ({
  weekNumber,
  visualizationView,
  setVisualizationView,
  setViewMode,
}) => {
  return (
    <div className="mb-8">
      <Alert className="mb-4 bg-kidmam-teal/10 text-kidmam-teal border-kidmam-teal/20">
        <Info className="h-4 w-4" />
        <AlertDescription>
          هذا نموذج توضيحي فقط. للحصول على نماذج واقعية أكثر، سيتم إضافة نماذج مصممة بدقة بواسطة خبراء في المستقبل.
        </AlertDescription>
      </Alert>

      <div className="flex justify-center mb-4">
        <RadioGroup 
          className="flex flex-row gap-4" 
          defaultValue="fetus"
          value={visualizationView}
          onValueChange={(value) => setVisualizationView(value as 'fetus' | 'womb')}
        >
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="fetus" id="fetus" />
            <label htmlFor="fetus" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              الجنين فقط
            </label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="womb" id="womb" />
            <label htmlFor="womb" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              داخل الرحم
            </label>
          </div>
        </RadioGroup>
      </div>
    
      <FetusThreedModel 
        weekNumber={weekNumber} 
        className="min-h-[350px]" 
        showInWomb={visualizationView === 'womb'}
      />
      
      <div className="mt-4 text-center space-y-4">
        <p className="text-muted-foreground text-sm">
          هذا نموذج تقريبي. النماذج الأكثر واقعية تتطلب نماذج ثلاثية الأبعاد مصممة احترافيًا.
        </p>
        <Button
          variant="outline"
          onClick={() => setViewMode('realistic')}
          className="text-kidmam-purple border-kidmam-purple/50 hover:bg-kidmam-purple/10"
        >
          العودة إلى العرض التقليدي
        </Button>
      </div>
    </div>
  );
};

export default ThreeDView;
