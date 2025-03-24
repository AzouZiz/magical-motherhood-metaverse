
import { useState } from 'react';
import { motion } from 'framer-motion';
import WeekControls from './components/WeekControls';
import RealisticView from './components/RealisticView';
import ThreeDView from './components/ThreeDView';
import FetusDevelopmentCard from './components/FetusDevelopmentCard';
import ViewModeSelector from './components/ViewModeSelector';
import { getFetusDevelopment } from './utils/fetusDevelopmentData';
import { ViewMode, VisualizationView } from './types';

const PregnancyTracker = () => {
  const [weekNumber, setWeekNumber] = useState(12);
  const [viewMode, setViewMode] = useState<ViewMode>('realistic');
  const [visualizationView, setVisualizationView] = useState<VisualizationView>('fetus');
  const totalWeeks = 40;
  
  const fetusDevelopment = getFetusDevelopment(weekNumber);
  const progressPercentage = (weekNumber / totalWeeks) * 100;

  return (
    <section className="py-16 relative overflow-hidden bg-background" id="pregnancy-tracker">
      <div className="absolute top-0 right-0 w-64 h-64 bg-kidmam-teal/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-kidmam-purple/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">تتبع تطور الحمل</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            تابعي نمو طفلك أسبوعًا بأسبوع مع تقنيات التصور المتقدمة والمعلومات الدقيقة
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <motion.div 
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ViewModeSelector viewMode={viewMode} setViewMode={setViewMode} />
              
              {viewMode === '3d' ? (
                <ThreeDView 
                  weekNumber={weekNumber}
                  visualizationView={visualizationView}
                  setVisualizationView={setVisualizationView}
                  setViewMode={setViewMode}
                />
              ) : (
                <RealisticView 
                  weekNumber={weekNumber}
                  totalWeeks={totalWeeks}
                  fetusDevelopment={fetusDevelopment}
                  progressPercentage={progressPercentage}
                  setViewMode={setViewMode}
                />
              )}
            </motion.div>
            
            <WeekControls
              weekNumber={weekNumber}
              setWeekNumber={setWeekNumber}
              totalWeeks={totalWeeks}
            />
          </div>
          
          <div className="order-1 lg:order-2">
            <FetusDevelopmentCard
              weekNumber={weekNumber}
              fetusDevelopment={fetusDevelopment}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PregnancyTracker;
