
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { FetusByWeek } from './FetusByWeek';
import { VitalStats } from './VitalStats';
import { OrbitControls, Environment } from '@react-three/drei';

type SceneProps = {
  week: number;
  showInWomb: boolean;
};

export const Scene: React.FC<SceneProps> = ({ week, showInWomb }) => {
  // Calculate fetal heart rate based on week
  const calculateHeartRate = (week: number) => {
    // Heart rate ranges from ~100 to ~160 based on gestational age
    if (week < 8) return 100 + Math.floor(week * 5);
    if (week < 12) return 160;
    return 160 - Math.floor((week - 12) * 2);
  };
  
  // Vital signs that change with week
  const vitalSigns = {
    heartRate: calculateHeartRate(week),
    oxygenLevel: 95 + Math.floor(Math.random() * 5),
    movement: week < 16 ? "Minimal" : week < 28 ? "Moderate" : "Active"
  };
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {!showInWomb && <Environment preset="apartment" background={false} />}
      
      <FetusByWeek week={week} showInWomb={showInWomb} />
      
      {/* Only show controls if not in womb view */}
      {!showInWomb && <OrbitControls />}
      
      {/* Stats display for vitals */}
      {showInWomb && <VitalStats week={week} vitalSigns={vitalSigns} />}
    </>
  );
};

export default Scene;
