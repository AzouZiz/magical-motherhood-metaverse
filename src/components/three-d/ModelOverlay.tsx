
import React from 'react';
import { motion } from 'framer-motion';

type ModelOverlayProps = {
  showInWomb: boolean;
  weekNumber: number;
};

export const ModelOverlay: React.FC<ModelOverlayProps> = ({ showInWomb, weekNumber }) => {
  if (!showInWomb) return null;
  
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs">
        Virtual Womb View
      </div>
      
      <motion.div 
        className="absolute bottom-4 right-4 w-24 h-24 bg-black/30 rounded-md backdrop-blur-sm p-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-white text-xs mb-1">Heart Rate</div>
        <div className="text-green-400 text-lg font-bold">{100 + Math.floor(weekNumber * 1.5)} BPM</div>
        <div className="w-full h-1 bg-gray-700 mt-2">
          <motion.div 
            className="h-full bg-green-500"
            initial={{ width: 0 }}
            animate={{ width: "70%" }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>
      </motion.div>
      
      {/* Scan line effect */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-1 bg-blue-400/30"
        animate={{ 
          top: ["0%", "100%", "0%"],
        }}
        transition={{ 
          duration: 8, 
          ease: "linear",
          repeat: Infinity,
        }}
      />
    </div>
  );
};
