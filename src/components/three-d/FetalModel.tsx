
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type FetalModelProps = {
  week: number;
  scale: number;
  color: string;
  showInWomb: boolean;
};

export const FetalModel: React.FC<FetalModelProps> = ({ week, scale, color, showInWomb }) => {
  const fetalRef = useRef<THREE.Group>(null);
  const heartbeatAudio = useRef<HTMLAudioElement | null>(null);
  
  // Create heart beat audio
  useEffect(() => {
    heartbeatAudio.current = new Audio('/heartbeat.mp3');
    heartbeatAudio.current.loop = true;
    heartbeatAudio.current.volume = 0.3;
    
    return () => {
      if (heartbeatAudio.current) {
        heartbeatAudio.current.pause();
        heartbeatAudio.current = null;
      }
    };
  }, []);
  
  // Play heartbeat on mount
  useEffect(() => {
    if (heartbeatAudio.current) {
      heartbeatAudio.current.play().catch(e => console.log("Audio play prevented by browser", e));
    }
    
    return () => {
      if (heartbeatAudio.current) {
        heartbeatAudio.current.pause();
      }
    };
  }, []);
  
  // Create subtle pulsating animation
  useFrame(({ clock }) => {
    if (fetalRef.current) {
      const heartbeat = Math.sin(clock.getElapsedTime() * 2) * 0.05;
      fetalRef.current.scale.x = scale * (1 + heartbeat);
      fetalRef.current.scale.y = scale * (1 + heartbeat);
      fetalRef.current.scale.z = scale * (1 + heartbeat);
      
      // Add subtle rotation
      if (!showInWomb) {
        fetalRef.current.rotation.y += 0.003;
      }
    }
  });
  
  // Determine fetus position based on week and womb presence
  const getFetalPosition = () => {
    if (showInWomb) {
      // In later weeks, the fetus is more likely to be in head-down position
      if (week > 30) {
        return [0, -0.5, 0] as [number, number, number];
      } else {
        return [0, 0, 0] as [number, number, number];
      }
    } else {
      return [0, 0, 0] as [number, number, number];
    }
  };
  
  // For early weeks - simple model
  if (week <= 8) {
    return (
      <group 
        ref={fetalRef}
        position={getFetalPosition()}
        rotation={week > 30 && showInWomb ? [Math.PI, 0, 0] : [0, 0, 0]}
      >
        {/* Body */}
        <mesh>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color={color} roughness={0.6} />
        </mesh>
        
        {/* Head forming */}
        <mesh position={[0, 0.25, 0]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color={color} roughness={0.6} />
        </mesh>
        
        {/* Limb buds if after week 5 */}
        {week > 5 && (
          <>
            {/* Arm buds */}
            <mesh position={[0.2, 0, 0]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color={color} roughness={0.6} />
            </mesh>
            <mesh position={[-0.2, 0, 0]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color={color} roughness={0.6} />
            </mesh>
            
            {/* Leg buds */}
            <mesh position={[0.1, -0.25, 0]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color={color} roughness={0.6} />
            </mesh>
            <mesh position={[-0.1, -0.25, 0]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color={color} roughness={0.6} />
            </mesh>
          </>
        )}
      </group>
    );
  }
  
  // For middle weeks - more defined model
  if (week <= 20) {
    return (
      <group 
        ref={fetalRef} 
        position={getFetalPosition()}
        rotation={week > 30 && showInWomb ? [Math.PI, 0, 0] : [0, 0, 0]}
      >
        {/* Body */}
        <mesh>
          <capsuleGeometry args={[0.25, 0.5, 16, 16]} />
          <meshStandardMaterial color={color} roughness={0.6} />
        </mesh>
        
        {/* Head */}
        <mesh position={[0, 0.45, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color={color} roughness={0.6} />
        </mesh>
        
        {/* Eyes */}
        <mesh position={[0.1, 0.5, 0.25]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#203354" roughness={0.3} />
        </mesh>
        <mesh position={[-0.1, 0.5, 0.25]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#203354" roughness={0.3} />
        </mesh>
        
        {/* Arms */}
        <mesh position={[0.35, 0.2, 0]} rotation={[0, 0, -Math.PI/4]}>
          <capsuleGeometry args={[0.07, 0.4, 16, 16]} />
          <meshStandardMaterial color={color} roughness={0.6} />
        </mesh>
        <mesh position={[-0.35, 0.2, 0]} rotation={[0, 0, Math.PI/4]}>
          <capsuleGeometry args={[0.07, 0.4, 16, 16]} />
          <meshStandardMaterial color={color} roughness={0.6} />
        </mesh>
        
        {/* Legs */}
        <mesh position={[0.15, -0.35, 0]} rotation={[0, 0, Math.PI/8]}>
          <capsuleGeometry args={[0.08, 0.4, 16, 16]} />
          <meshStandardMaterial color={color} roughness={0.6} />
        </mesh>
        <mesh position={[-0.15, -0.35, 0]} rotation={[0, 0, -Math.PI/8]}>
          <capsuleGeometry args={[0.08, 0.4, 16, 16]} />
          <meshStandardMaterial color={color} roughness={0.6} />
        </mesh>
      </group>
    );
  }
  
  // For later weeks - more detailed model
  return (
    <group 
      ref={fetalRef} 
      position={getFetalPosition()}
      rotation={week > 30 && showInWomb ? [Math.PI, 0, 0] : [0, 0, 0]}
    >
      {/* Body */}
      <mesh>
        <capsuleGeometry args={[0.35, 0.8, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      
      {/* Face features */}
      {/* Eyes */}
      <mesh position={[0.15, 0.65, 0.35]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#203354" roughness={0.3} />
      </mesh>
      <mesh position={[-0.15, 0.65, 0.35]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#203354" roughness={0.3} />
      </mesh>
      
      {/* Nose */}
      <mesh position={[0, 0.6, 0.38]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      
      {/* Mouth */}
      <mesh position={[0, 0.5, 0.38]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.1, 0.02, 0.01]} />
        <meshStandardMaterial color="#942a44" roughness={0.5} />
      </mesh>
      
      {/* Arms */}
      <mesh position={[0.45, 0.3, 0]} rotation={[0, 0, -Math.PI/4]}>
        <capsuleGeometry args={[0.1, 0.6, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      <mesh position={[-0.45, 0.3, 0]} rotation={[0, 0, Math.PI/4]}>
        <capsuleGeometry args={[0.1, 0.6, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      
      {/* Hands */}
      <mesh position={[0.65, 0.1, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      <mesh position={[-0.65, 0.1, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      
      {/* Legs */}
      <mesh position={[0.2, -0.5, 0]} rotation={[0, 0, Math.PI/8]}>
        <capsuleGeometry args={[0.12, 0.8, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      <mesh position={[-0.2, -0.5, 0]} rotation={[0, 0, -Math.PI/8]}>
        <capsuleGeometry args={[0.12, 0.8, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      
      {/* Feet */}
      <mesh position={[0.25, -1, 0]} rotation={[Math.PI/2, 0, 0]}>
        <capsuleGeometry args={[0.1, 0.2, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      <mesh position={[-0.25, -1, 0]} rotation={[Math.PI/2, 0, 0]}>
        <capsuleGeometry args={[0.1, 0.2, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
    </group>
  );
};
