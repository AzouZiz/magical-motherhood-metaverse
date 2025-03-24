
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Box } from 'lucide-react';
import { getFetalImage } from '../utils/fetusDevelopmentData';
import { FetusDevelopment, ViewMode } from '../types';

type RealisticViewProps = {
  weekNumber: number;
  totalWeeks: number;
  fetusDevelopment: FetusDevelopment;
  progressPercentage: number;
  setViewMode: (mode: ViewMode) => void;
};

const RealisticView: React.FC<RealisticViewProps> = ({
  weekNumber,
  totalWeeks,
  fetusDevelopment,
  progressPercentage,
  setViewMode,
}) => {
  return (
    <>
      <div className="relative w-72 h-72 mx-auto">
        <svg width="300" height="300" viewBox="0 0 100 100" className="transform -rotate-90">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(226, 232, 240, 0.6)"
            strokeWidth="8"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeDasharray="282.7"
            initial={{ strokeDashoffset: 282.7 }}
            animate={{ 
              strokeDashoffset: 282.7 - (282.7 * progressPercentage / 100) 
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9b6dff" />
              <stop offset="100%" stopColor="#4fd1c5" />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <motion.div
            key={weekNumber}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-2 bg-white/90 p-1 border border-kidmam-purple/30 shadow-lg"
          >
            <img 
              src={getFetalImage(weekNumber)} 
              alt={`جنين في الأسبوع ${weekNumber}`} 
              className="w-full h-full object-cover rounded-full"
            />
          </motion.div>
          <p className="text-muted-foreground text-sm">الأسبوع {weekNumber} من أصل {totalWeeks} أسبوع</p>
          <p className="text-sm font-medium mt-2">الثلث {fetusDevelopment.trimester}</p>
        </div>
      </div>
      
      <div className="text-center mt-24">
        <Button
          onClick={() => setViewMode('3d')}
          className="bg-gradient-to-r from-kidmam-purple to-kidmam-teal text-white"
        >
          <Box className="h-4 w-4 mr-2" />
          عرض نموذج ثلاثي الأبعاد
        </Button>
      </div>
    </>
  );
};

export default RealisticView;
