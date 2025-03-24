
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import Scene from './three-d/Scene';
import { ModelOverlay } from './three-d/ModelOverlay';

type FetusThreedModelProps = {
  weekNumber: number;
  className?: string;
  showInWomb?: boolean;
};

const FetusThreedModel: React.FC<FetusThreedModelProps> = ({ 
  weekNumber, 
  className = "", 
  showInWomb = false 
}) => {
  return (
    <div className={`relative w-full h-80 ${className}`}>
      <Canvas className="bg-gradient-to-b from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/20 rounded-lg">
        <Scene week={weekNumber} showInWomb={showInWomb} />
      </Canvas>
      
      {/* Overlay elements for the VR experience */}
      <ModelOverlay showInWomb={showInWomb} weekNumber={weekNumber} />
    </div>
  );
};

export default FetusThreedModel;
