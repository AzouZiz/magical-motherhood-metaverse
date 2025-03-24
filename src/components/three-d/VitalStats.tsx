
import React from 'react';
import { Text } from '@react-three/drei';

type VitalStatsProps = {
  week: number;
  vitalSigns: {
    heartRate: number;
    oxygenLevel: number;
    movement: string;
  };
};

export const VitalStats: React.FC<VitalStatsProps> = ({ week, vitalSigns }) => {
  return (
    <>
      <Text
        position={[-2, 2, 0] as [number, number, number]}
        color="#e056fd"
        fontSize={0.2}
        anchorX="left"
        anchorY="top"
      >
        Fetal Heart Rate: {vitalSigns.heartRate} BPM
      </Text>
      <Text
        position={[-2, 1.7, 0] as [number, number, number]}
        color="#e056fd"
        fontSize={0.2}
        anchorX="left"
        anchorY="top"
      >
        Week: {week}
      </Text>
      <Text
        position={[-2, 1.4, 0] as [number, number, number]}
        color="#e056fd"
        fontSize={0.2}
        anchorX="left"
        anchorY="top"
      >
        Movement: {vitalSigns.movement}
      </Text>
    </>
  );
};
