import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF, Text, Environment, SpotLight } from '@react-three/drei';
import { TextureLoader, DoubleSide, Color } from 'three';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Define model paths based on week number
const getModelForWeek = (week: number) => {
  if (week <= 8) return "/models/fetus-8-weeks.glb";
  if (week <= 16) return "/models/fetus-16-weeks.glb";
  if (week <= 24) return "/models/fetus-24-weeks.glb";
  if (week <= 32) return "/models/fetus-32-weeks.glb";
  return "/models/fetus-40-weeks.glb";
};

// Placeholder models until real models are available
const FetusByWeek = ({ week, showInWomb }: { week: number, showInWomb: boolean }) => {
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

// This creates a womb-like environment
const WombModel = () => {
  return (
    <group>
      {/* Outer womb wall */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshStandardMaterial 
          color="#8a1538" 
          transparent={true} 
          opacity={0.5} 
          side={DoubleSide}
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>
      
      {/* Inner womb environment with amniotic fluid */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.8, 32, 32]} />
        <meshPhysicalMaterial 
          color="#e8d7ff" 
          transparent={true} 
          opacity={0.2}
          transmission={0.95} // Makes it look watery
          roughness={0}
          clearcoat={1}
          clearcoatRoughness={0}
          ior={1.4} // Similar to water
        />
      </mesh>
      
      {/* Placenta-like structure */}
      <mesh position={[1.8, 1.5, 0]} rotation={[0, Math.PI/3, Math.PI/6]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial 
          color="#AA0114" 
          roughness={1}
        />
      </mesh>
      
      {/* Umbilical cord-like structure */}
      <mesh>
        <tubeGeometry 
          args={[
            new THREE.CatmullRomCurve3([
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(0.5, 0.5, 0.3),
              new THREE.Vector3(1.0, 0.8, 0.5),
              new THREE.Vector3(1.5, 1.2, 0.2),
            ]),
            64, // tubular segments
            0.1, // radius
            8, // radial segments
            false // closed
          ]}
        />
        <meshStandardMaterial color="#9C2C77" />
      </mesh>
    </group>
  );
};

// This represents the fetal model
const FetalModel = ({ week, scale, color, showInWomb }: { week: number, scale: number, color: string, showInWomb: boolean }) => {
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

// Scene component with monitors
const Scene = ({ week, showInWomb }: { week: number, showInWomb: boolean }) => {
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
      {showInWomb && (
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
      )}
    </>
  );
};

type FetusThreedModelProps = {
  weekNumber: number;
  className?: string;
  showInWomb?: boolean;
};

const FetusThreedModel: React.FC<FetusThreedModelProps> = ({ weekNumber, className = "", showInWomb = false }) => {
  return (
    <div className={`relative w-full h-80 ${className}`}>
      <Canvas className="bg-gradient-to-b from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/20 rounded-lg">
        <Scene week={weekNumber} showInWomb={showInWomb} />
      </Canvas>
      
      {/* Overlay elements for the VR experience */}
      {showInWomb && (
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
      )}
    </div>
  );
};

export default FetusThreedModel;
