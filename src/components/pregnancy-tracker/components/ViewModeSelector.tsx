
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ViewMode } from '../types';

type ViewModeSelectorProps = {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
};

const ViewModeSelector: React.FC<ViewModeSelectorProps> = ({
  viewMode,
  setViewMode,
}) => {
  return (
    <div className="flex justify-center gap-3 mb-6">
      <ToggleGroup 
        type="single" 
        value={viewMode} 
        onValueChange={(value) => value && setViewMode(value as 'realistic' | '3d')}
      >
        <ToggleGroupItem value="realistic" className="px-4">
          واقعي
        </ToggleGroupItem>
        <ToggleGroupItem value="3d" className="px-4">
          ثلاثي الأبعاد
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default ViewModeSelector;
