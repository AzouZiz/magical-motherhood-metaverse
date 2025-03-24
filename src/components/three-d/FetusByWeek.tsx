
import React from 'react';
import { WombModel } from './WombModel';
import { FetalModel } from './FetalModel';

type FetusByWeekProps = {
  week: number;
  showInWomb: boolean;
};

export const FetusByWeek: React.FC<FetusByWeekProps> = ({ week, showInWomb }) => {
  const fetalSize = {
    scale: Math.min(1, week * 0.02), // Size increases with gestational age
    color: '#f0c7bf', // Soft pink/flesh tone
  };
  
  return (
    <group>
      {showInWomb ? <WombModel /> : null}
      <FetalModel week={week} scale={fetalSize.scale} color={fetalSize.color} showInWomb={showInWomb} />
      
      {showInWomb && (
        <>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
        </>
      )}
    </group>
  );
};
