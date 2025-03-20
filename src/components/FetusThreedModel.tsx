import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, Text, useGLTF, Sphere } from '@react-three/drei';
import { Mesh, AnimationMixer, Clock, MeshStandardMaterial, SpotLightHelper, Vector3, Color } from 'three';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Expand, 
  Minimize, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut,
  Info,
  Home,
  SunMoon,
  Lightbulb,
  Volume2,
  VolumeX,
  Activity
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Slider } from '@/components/ui/slider';

interface FetusModelProps {
  weekNumber: number;
  position?: [number, number, number];
  scale?: number;
  showDetails?: boolean;
}

const getFetusDevelopmentInfo = (weekNumber: number) => {
  if (weekNumber < 8) {
    return "في هذه المرحلة المبكرة، يكون حجم الجنين صغيراً جداً وتبدأ الأعضاء الداخلية في التكون.";
  } else if (weekNumber < 16) {
    return "في هذه المرحلة، تتشكل ملامح الوجه وتظهر براعم الأطراف وتبدأ حركة الجنين.";
  } else if (weekNumber < 24) {
    return "في هذه المرحلة، يمكن للأم الشعور بحركات الجنين، ويبدأ تطور الرئتين والجلد.";
  } else if (weekNumber < 32) {
    return "في هذه المرحلة، يزداد وزن الجنين بشكل كبير وتستمر في تطور الدماغ والأعضاء.";
  } else {
    return "في هذه المرحلة النهائية، يكون الجنين مكتمل النمو تقريباً ويستعد للولادة.";
  }
};

const Womb = ({ children, weekNumber }: { children: React.ReactNode, weekNumber: number }) => {
  const wombRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const transparencyFactor = weekNumber < 12 ? 0.5 : weekNumber < 24 ? 0.65 : 0.8;
  
  const wombColor = new Color(0xf06292);
  
  useFrame(({ clock }) => {
    if (wombRef.current) {
      const pulse = Math.sin(clock.getElapsedTime() * 0.5) * 0.01;
      wombRef.current.scale.set(1 + pulse, 1 + pulse, 1 + pulse);
    }
  });
  
  return (
    <group>
      <mesh 
        ref={wombRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[2.2, 32, 32, 0, Math.PI * 2, 0, Math.PI]} />
        <meshPhysicalMaterial 
          color={wombColor} 
          transparent 
          opacity={0.3} 
          roughness={0.3}
          metalness={0.2}
          clearcoat={0.5}
          clearcoatRoughness={0.3}
          transmission={0.4}
        />
      </mesh>
      
      <mesh>
        <sphereGeometry args={[2, 32, 32, 0, Math.PI * 2, 0, Math.PI]} />
        <meshPhysicalMaterial 
          color={new Color(0x81d4fa)} 
          transparent 
          opacity={0.2} 
          roughness={0.1}
          metalness={0.0}
          clearcoat={0.8}
          transmission={0.8}
        />
      </mesh>
      
      <mesh>
        <sphereGeometry args={[1.9, 32, 32, 0, Math.PI * 2, 0, Math.PI]} />
        <meshPhysicalMaterial 
          color="#a5d6a7" 
          transparent 
          opacity={0.1} 
          roughness={0.1}
          transmission={0.95}
        />
      </mesh>
      
      <group>
        {hovered && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.25, 2.3, 64]} />
            <meshBasicMaterial color="#64b5f6" transparent opacity={0.8} />
          </mesh>
        )}
        
        {children}
      </group>
      
      <Html position={[1.5, 0.8, 0]} distanceFactor={10} center transform occlude>
        <div className="bg-black/40 backdrop-blur-sm text-cyan-300 p-2 rounded-md text-xs w-40">
          <div className="flex items-center justify-between mb-1">
            <span>نبضات القلب</span>
            <div className="flex items-center">
              <span className="animate-pulse-fast inline-block h-2 w-2 rounded-full bg-red-500 mr-1"></span>
              <span>{Math.round(getHeartbeatRate(weekNumber))}</span>
            </div>
          </div>
          <div className="flex items-center justify-between mb-1">
            <span>الطول</span>
            <span>{Math.round(weekNumber * 1.2)} سم</span>
          </div>
          <div className="flex items-center justify-between">
            <span>الوزن</span>
            <span>{weekNumber < 10 ? `${weekNumber * 3} جم` : `${Math.min(3500, weekNumber * 30)} جم`}</span>
          </div>
        </div>
      </Html>
      
      <Html position={[-1.5, -0.8, 0]} distanceFactor={10} center transform occlude>
        <div className="bg-black/40 backdrop-blur-sm text-cyan-300 p-2 rounded-md text-xs w-40">
          <div className="mb-1 text-center">تحليل الجنين</div>
          <div className="h-20 border border-cyan-500/30 rounded-md p-1 flex flex-col justify-between">
            <div className="flex justify-between">
              <span className="text-cyan-400">الحالة:</span>
              <span className="text-green-400">طبيعية</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyan-400">التطور:</span>
              <span className="text-green-400">سليم</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyan-400">النشاط:</span>
              <div className="flex items-center">
                <span className="w-12 h-1.5 bg-cyan-900/50 rounded-full overflow-hidden flex items-center">
                  <span className="h-full bg-cyan-400 rounded-full animate-pulse-slow" style={{ width: `${60 + Math.min(weekNumber * 1.5, 30)}%` }}></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Html>
      
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[2.22, 0.01, 16, 100]} />
        <meshBasicMaterial color="#64b5f6" transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

const AmnioticBubbles = () => {
  const bubbles = Array(20).fill(null).map((_, i) => ({
    position: [
      (Math.random() - 0.5) * 3,
      (Math.random() - 0.5) * 3,
      (Math.random() - 0.5) * 3
    ],
    scale: Math.random() * 0.1 + 0.02,
    speed: Math.random() * 0.2 + 0.1
  }));
  
  return (
    <group>
      {bubbles.map((bubble, i) => (
        <Bubble key={i} position={bubble.position as [number, number, number]} scale={bubble.scale} speed={bubble.speed} />
      ))}
    </group>
  );
};

const Bubble = ({ position, scale, speed }: { position: [number, number, number], scale: number, speed: number }) => {
  const bubbleRef = useRef<Mesh>(null);
  
  useFrame(({ clock }) => {
    if (bubbleRef.current) {
      bubbleRef.current.position.y += Math.sin(clock.getElapsedTime()) * 0.001 * speed;
      bubbleRef.current.position.x += Math.sin(clock.getElapsedTime() * 0.5) * 0.001 * speed;
      bubbleRef.current.position.z += Math.cos(clock.getElapsedTime() * 0.5) * 0.001 * speed;
    }
  });
  
  return (
    <mesh ref={bubbleRef} position={position}>
      <sphereGeometry args={[scale, 8, 8]} />
      <meshPhysicalMaterial 
        color="#b3e5fc" 
        transparent 
        opacity={0.3} 
        roughness={0.1}
        transmission={0.9}
      />
    </mesh>
  );
};

const DefaultFetus = ({ weekNumber, position = [0, 0, 0], scale = 1, showDetails = false }: FetusModelProps) => {
  const meshRef = useRef<Mesh>(null);
  
  const fetusScale = 0.2 + (weekNumber / 40) * 0.8;
  
  const color = weekNumber < 12 
    ? '#ffb6c1' 
    : weekNumber < 28 
      ? '#e8beac' 
      : '#d4a592';
  
  const getGeometry = () => {
    if (weekNumber < 8) {
      return (
        <sphereGeometry args={[0.8, 32, 32]} />
      );
    } else if (weekNumber < 16) {
      return (
        <capsuleGeometry args={[0.6, 1.2, 16, 32]} />
      );
    } else {
      return (
        <group>
          <mesh position={[0, -0.1, 0]}>
            <capsuleGeometry args={[0.5, 1.2, 16, 32]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh position={[0, 0.8, 0]}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial color={color} />
          </mesh>
          {weekNumber >= 20 && (
            <>
              <mesh position={[0.6, 0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
                <capsuleGeometry args={[0.15, 0.6, 16, 32]} />
                <meshStandardMaterial color={color} />
              </mesh>
              <mesh position={[-0.6, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
                <capsuleGeometry args={[0.15, 0.6, 16, 32]} />
                <meshStandardMaterial color={color} />
              </mesh>
              <mesh position={[0.3, -0.7, 0]} rotation={[0, 0, Math.PI / 16]}>
                <capsuleGeometry args={[0.15, 0.7, 16, 32]} />
                <meshStandardMaterial color={color} />
              </mesh>
              <mesh position={[-0.3, -0.7, 0]} rotation={[0, 0, -Math.PI / 16]}>
                <capsuleGeometry args={[0.15, 0.7, 16, 32]} />
                <meshStandardMaterial color={color} />
              </mesh>
            </>
          )}
        </group>
      );
    }
  };

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
      
      const pulseSpeed = 2 - (weekNumber / 40);
      const pulseAmount = 0.05 - (weekNumber / 800);
      
      meshRef.current.scale.x = fetusScale * (1 + Math.sin(clock.getElapsedTime() * pulseSpeed) * pulseAmount);
      meshRef.current.scale.y = fetusScale * (1 + Math.sin(clock.getElapsedTime() * pulseSpeed) * pulseAmount);
      meshRef.current.scale.z = fetusScale * (1 + Math.sin(clock.getElapsedTime() * pulseSpeed) * pulseAmount);
    }
  });

  return (
    <>
      <mesh
        ref={meshRef}
        position={position}
        scale={[fetusScale * scale, fetusScale * scale, fetusScale * scale]}
        castShadow
        receiveShadow
      >
        {getGeometry()}
        <meshPhysicalMaterial 
          color={color} 
          roughness={0.7} 
          metalness={0.1}
          clearcoat={0.3}
          clearcoatRoughness={0.25}
        />
      </mesh>

      {showDetails && (
        <Html position={[0, 2, 0]} center distanceFactor={10}>
          <div className="bg-black/70 text-white p-2 rounded-md text-xs w-40 text-center pointer-events-none">
            {getFetusDevelopmentInfo(weekNumber)}
          </div>
        </Html>
      )}
    </>
  );
};

const AdvancedLighting = ({ enabled = true }) => {
  const spotLightRef = useRef(null);
  
  if (!enabled) {
    return (
      <ambientLight intensity={0.8} />
    );
  }
  
  return (
    <>
      <ambientLight intensity={0.4} />
      <spotLight 
        ref={spotLightRef}
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={1.5} 
        castShadow 
        color="#e1f5fe"
      />
      <spotLight 
        position={[-10, -10, -10]} 
        angle={0.3} 
        penumbra={1} 
        intensity={0.8} 
        color="#e1e1ff" 
        castShadow 
      />
      <pointLight position={[0, 0, 5]} intensity={0.6} color="#4fc3f7" />
    </>
  );
};

const getHeartbeatRate = (weekNumber: number): number => {
  if (weekNumber < 9) {
    return 175 - (weekNumber - 5) * 2.5;
  } else if (weekNumber < 13) {
    return 160 - (weekNumber - 9) * 2.5;
  } else {
    return 140;
  }
};

const MedicalMarkers = ({ weekNumber }: { weekNumber: number }) => {
  return (
    <group>
      <Html position={[0, -2.3, 0]} center transform>
        <div className="bg-black/60 backdrop-blur-sm text-cyan-300 px-3 py-1 rounded-md text-xs w-auto whitespace-nowrap">
          <div className="flex items-center gap-2">
            <Activity className="h-3 w-3" />
            <span>مسح الجنين - الأسبوع {weekNumber}</span>
          </div>
        </div>
      </Html>
      
      {weekNumber > 12 && (
        <>
          <mesh position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.01, 0.01, 3, 8]} />
            <meshBasicMaterial color="#4fc3f7" transparent opacity={0.3} />
          </mesh>
          
          <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 3, 8]} />
            <meshBasicMaterial color="#4fc3f7" transparent opacity={0.3} />
          </mesh>
        </>
      )}
    </group>
  );
};

interface FetusThreedModelProps {
  weekNumber: number;
  className?: string;
}

const FetusThreedModel = ({ weekNumber, className = "" }: FetusThreedModelProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 5]);
  const [advancedLighting, setAdvancedLighting] = useState(true);
  const [heartbeatPlaying, setHeartbeatPlaying] = useState(false);
  const [heartbeatVolume, setHeartbeatVolume] = useState(80);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showVRView, setShowVRView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    audioRef.current = new Audio('/heartbeat.mp3');
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  useEffect(() => {
    if (audioRef.current) {
      const heartRate = getHeartbeatRate(weekNumber);
      const playbackRate = heartRate / 140;
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.volume = heartbeatVolume / 100;
    }
  }, [weekNumber, heartbeatVolume]);
  
  useEffect(() => {
    if (audioRef.current) {
      if (heartbeatPlaying) {
        audioRef.current.play().catch(e => console.error("خطأ في تشغيل الصوت:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [heartbeatPlaying]);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = heartbeatVolume / 100;
    }
  }, [heartbeatVolume]);
  
  const zoomIn = () => {
    setCameraPosition(prev => [prev[0], prev[1], Math.max(prev[2] - 1, 2)]);
  };
  
  const zoomOut = () => {
    setCameraPosition(prev => [prev[0], prev[1], Math.min(prev[2] + 1, 10)]);
  };
  
  const resetCamera = () => {
    setCameraPosition([0, 0, 5]);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`خطأ في تبديل وضع ملء الشاشة: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      className={`relative rounded-xl overflow-hidden border border-kidmam-purple/20 shadow-lg ${showVRView ? 'bg-gradient-to-b from-purple-900/80 to-cyan-900/50' : 'bg-gradient-to-b from-black/80 to-kidmam-purple/20'} ${className}`}
      style={{ height: isFullscreen ? '100vh' : '400px' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-fuchsia-500/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
      </div>
      
      <Canvas 
        shadows 
        camera={{ position: cameraPosition, fov: 50 }}
        dpr={[1, 2]}
        gl={{ alpha: true }}
      >
        <AdvancedLighting enabled={advancedLighting} />
        
        {showVRView ? (
          <>
            <Womb weekNumber={weekNumber}>
              <DefaultFetus weekNumber={weekNumber} showDetails={showDetails} />
            </Womb>
            <AmnioticBubbles />
            <MedicalMarkers weekNumber={weekNumber} />
          </>
        ) : (
          <DefaultFetus weekNumber={weekNumber} showDetails={showDetails} />
        )}
        
        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={1.5} far={4} />
        <Environment preset="dawn" />
        <OrbitControls 
          autoRotate={isRotating} 
          autoRotateSpeed={1.5} 
          enableZoom={true}
          enablePan={false}
          minDistance={2}
          maxDistance={10}
        />
      </Canvas>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10">
        <Card className="bg-black/40 backdrop-blur-md border-white/10">
          <CardContent className="p-3 flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-transparent backdrop-blur-sm border-white/20 text-white hover:bg-white/10"
                    onClick={() => setIsRotating(!isRotating)}
                  >
                    <RotateCcw className={`h-4 w-4 ${isRotating ? 'text-kidmam-teal' : 'text-white'}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{isRotating ? 'إيقاف الدوران' : 'تشغيل الدوران'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-transparent backdrop-blur-sm border-white/20 text-white hover:bg-white/10"
                    onClick={zoomIn}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>تكبير</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-transparent backdrop-blur-sm border-white/20 text-white hover:bg-white/10"
                    onClick={zoomOut}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>تصغير</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-transparent backdrop-blur-sm border-white/20 text-white hover:bg-white/10"
                    onClick={resetCamera}
                  >
                    <Home className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>إعادة ضبط الكاميرا</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-transparent backdrop-blur-sm border-white/20 text-white hover:bg-white/10"
                    onClick={() => setShowDetails(!showDetails)}
                  >
                    <Info className={`h-4 w-4 ${showDetails ? 'text-kidmam-teal' : 'text-white'}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{showDetails ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-transparent backdrop-blur-sm border-white/20 text-white hover:bg-white/10"
                    onClick={() => setAdvancedLighting(!advancedLighting)}
                  >
                    <Lightbulb className={`h-4 w-4 ${advancedLighting ? 'text-kidmam-teal' : 'text-white'}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{advancedLighting ? 'إضاءة بسيطة' : 'إضاءة متقدمة'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-transparent backdrop-blur-sm border-white/20 text-white hover:bg-white/10"
                    onClick={() => setShowVRView(!showVRView)}
                  >
                    <div className={`h-4 w-4 ${showVRView ? 'text-cyan-300' : 'text-white'}`}>
                      VR
                    </div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{showVRView ? 'عرض الجنين فقط' : 'عرض الجنين داخل الرحم'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-transparent backdrop-blur-sm border-white/20 text-white hover:bg-white/10"
                    onClick={() => setHeartbeatPlaying(!heartbeatPlaying)}
                  >
                    {heartbeatPlaying ? (
                      <Volume2 className="h-4 w-4 text-kidmam-gold animate-pulse-slow" />
                    ) : (
                      <VolumeX className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{heartbeatPlaying ? 'إيقاف نبضات القلب' : 'تشغيل نبضات القلب'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {heartbeatPlaying && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="bg-transparent backdrop-blur-sm border-white/20 text-white hover:bg-white/10"
                      onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                    >
                      <span className="text-xs text-kidmam-gold font-bold">{heartbeatVolume}%</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>ضبط مستوى الصوت</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-transparent backdrop-blur-sm border-white/20 text-white hover:bg-white/10"
                    onClick={toggleFullscreen}
                  >
                    {isFullscreen ? 
                      <Minimize className="h-4 w-4" /> : 
                      <Expand className="h-4 w-4" />
                    }
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{isFullscreen ? 'إغلاق ملء الشاشة' : 'ملء الشاشة'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardContent>
        </Card>
      </div>
      
      {showVolumeSlider && heartbeatPlaying && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 bg-black/70 backdrop-blur-md p-4 rounded-lg w-72">
          <p className="text-white text-xs mb-2 text-center">مستوى صوت نبضات القلب</p>
          <div className="flex items-center gap-2">
            <VolumeX className="h-4 w-4 text-white" />
            <Slider
              value={[heartbeatVolume]}
              min={0}
              max={100}
              step={5}
              onValueChange={(values) => setHeartbeatVolume(values[0])}
              className="flex-1"
            />
            <Volume2 className="h-4 w-4 text-white" />
          </div>
          <p className="text-white text-xs mt-2 text-center">
            معدل النبض: {Math.round(getHeartbeatRate(weekNumber))} نبضة في الدقيقة
          </p>
        </div>
      )}
      
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
        <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium inline-block">
          الجنين في الأسبوع {weekNumber}
          {heartbeatPlaying && (
            <span className="mr-2 inline-flex items-center">
              <span className="inline-block h-2 w-2 rounded-full bg-kidmam-gold animate-pulse-fast mr-1"></span>
              {Math.round(getHeartbeatRate(weekNumber))} نبضة/دقيقة
            </span>
          )}
        </div>
        
        <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-xs font-medium inline-block animate-pulse-gentle">
          اسحب للتدوير • استخدم عجلة الماوس للتكبير
        </div>
      </div>
      
      {heartbeatPlaying && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.div 
            className="absolute w-full h-full border-kidmam-gold/20 border-[15px] rounded-full"
            animate={{ 
              scale: [1, 1.05, 1], 
              opacity: [0.5, 0.3, 0.5] 
            }}
            transition={{ 
              duration: 60 / getHeartbeatRate(weekNumber),
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        </div>
      )}
      
      {showVRView && (
        <div className="absolute top-2 right-2 bg-purple-900/80 backdrop-blur-sm text-white/90 px-3 py-1 rounded-lg text-xs font-bold flex items-center">
          <span className="text-cyan-300 mr-1">VR</span>
          عرض متطور
        </div>
      )}
    </motion.div>
  );
};

export default FetusThreedModel;
