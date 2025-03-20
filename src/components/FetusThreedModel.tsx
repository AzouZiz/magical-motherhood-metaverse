import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useHelper, Html, Text } from '@react-three/drei';
import { Mesh, AnimationMixer, Clock, MeshStandardMaterial, SpotLightHelper, Vector3 } from 'three';
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
  VolumeX
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

// المعلومات التفصيلية للجنين حسب المرحلة
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

// مكون إضاءة متقدمة للنموذج
const AdvancedLighting = ({ enabled = true }) => {
  const spotLightRef = useRef(null);
  
  // تبديل نوع الإضاءة حسب خيار المستخدم
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
      />
      <spotLight 
        position={[-10, -10, -10]} 
        angle={0.3} 
        penumbra={1} 
        intensity={0.8} 
        color="#e1e1ff" 
        castShadow 
      />
    </>
  );
};

// الكائن الافتراضي للجنين
const DefaultFetus = ({ weekNumber, position = [0, 0, 0], scale = 1, showDetails = false }: FetusModelProps) => {
  // استخدام الإشارة المرجعية للتحكم في دوران النموذج
  const meshRef = useRef<Mesh>(null);
  
  // تعديل حجم الجنين بناءً على أسبوع الحمل
  const fetusScale = 0.2 + (weekNumber / 40) * 0.8;
  
  // تغيير لون النموذج بناءً على العمر
  const color = weekNumber < 12 
    ? '#ffb6c1' // وردي فاتح للأسابيع المبكرة
    : weekNumber < 28 
      ? '#e8beac' // لون بشرة فاتح للثلث الثاني
      : '#d4a592'; // لون بشرة أكثر نضجاً للثلث الثالث

  // تغيير شكل النموذج بناءً على العمر
  const getGeometry = () => {
    if (weekNumber < 8) {
      // شكل بسيط جداً في المراحل المبكرة (تشبه الكرة)
      return (
        <sphereGeometry args={[0.8, 32, 32]} />
      );
    } else if (weekNumber < 16) {
      // شكل أكثر تعقيداً في المرحلة المتوسطة (تشبه قطرة الماء)
      return (
        <capsuleGeometry args={[0.6, 1.2, 16, 32]} />
      );
    } else {
      // شكل أقرب للجنين البشري في المراحل المتأخرة
      return (
        <group>
          {/* الجسم */}
          <mesh position={[0, -0.1, 0]}>
            <capsuleGeometry args={[0.5, 1.2, 16, 32]} />
            <meshStandardMaterial color={color} />
          </mesh>
          {/* الرأس */}
          <mesh position={[0, 0.8, 0]}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial color={color} />
          </mesh>
          {/* الأطراف - مرئية فقط بعد الأسبوع 20 */}
          {weekNumber >= 20 && (
            <>
              {/* الذراع الأيمن */}
              <mesh position={[0.6, 0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
                <capsuleGeometry args={[0.15, 0.6, 16, 32]} />
                <meshStandardMaterial color={color} />
              </mesh>
              {/* الذراع الأيسر */}
              <mesh position={[-0.6, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
                <capsuleGeometry args={[0.15, 0.6, 16, 32]} />
                <meshStandardMaterial color={color} />
              </mesh>
              {/* الساق اليمنى */}
              <mesh position={[0.3, -0.7, 0]} rotation={[0, 0, Math.PI / 16]}>
                <capsuleGeometry args={[0.15, 0.7, 16, 32]} />
                <meshStandardMaterial color={color} />
              </mesh>
              {/* الساق اليسرى */}
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

  // حركة نبض بسيطة للجنين
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
      
      // حركة نبض بسيطة تعتمد على عمر الجنين
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
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.1} />
      </mesh>

      {/* معلومات تفاعلية تظهر أعلى النموذج عند تفعيل خيار التفاصيل */}
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

interface FetusThreedModelProps {
  weekNumber: number;
  className?: string;
}

// Utility function to calculate heartbeat rate based on week number
const getHeartbeatRate = (weekNumber: number): number => {
  // Heart rate starts high in early pregnancy and gradually decreases
  // - Early pregnancy (weeks 5-9): 170-180 bpm
  // - Mid-pregnancy (weeks 9-13): 150-170 bpm
  // - After week 13: stabilizes around 130-150 bpm
  if (weekNumber < 9) {
    return 175 - (weekNumber - 5) * 2.5; // Gradually decrease from ~175 bpm
  } else if (weekNumber < 13) {
    return 160 - (weekNumber - 9) * 2.5; // Gradually decrease from ~160 bpm
  } else {
    return 140; // Stabilize around 140 bpm
  }
};

const FetusThreedModel = ({ weekNumber, className = "" }: FetusThreedModelProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 5]);
  const [advancedLighting, setAdvancedLighting] = useState(true);
  const [heartbeatPlaying, setHeartbeatPlaying] = useState(false);
  const [heartbeatVolume, setHeartbeatVolume] = useState(80);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // إنشاء عنصر الصوت
  useEffect(() => {
    // إنشاء الصوت فقط عند التركيب الأولي
    audioRef.current = new Audio('/heartbeat.mp3');
    audioRef.current.loop = true;
    
    // التنظيف عند إزالة المكون
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // تحديث معدل ضربات القلب حسب أسبوع الحمل
  useEffect(() => {
    if (audioRef.current) {
      // تغيير معدل التشغيل بناءً على أسبوع الحمل
      const heartRate = getHeartbeatRate(weekNumber);
      const playbackRate = heartRate / 140; // معدل تشغيل نسبي إلى معدل 140 نبضة/دقيقة
      audioRef.current.playbackRate = playbackRate;
      
      // تحديث مستوى الصوت
      audioRef.current.volume = heartbeatVolume / 100;
    }
  }, [weekNumber, heartbeatVolume]);
  
  // تبديل تشغيل/إيقاف الصوت
  useEffect(() => {
    if (audioRef.current) {
      if (heartbeatPlaying) {
        audioRef.current.play().catch(e => console.error("خطأ في تشغيل الصوت:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [heartbeatPlaying]);
  
  // تغيير مستوى الصوت
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = heartbeatVolume / 100;
    }
  }, [heartbeatVolume]);
  
  // زوم للكاميرا
  const zoomIn = () => {
    setCameraPosition(prev => [prev[0], prev[1], Math.max(prev[2] - 1, 2)]);
  };
  
  const zoomOut = () => {
    setCameraPosition(prev => [prev[0], prev[1], Math.min(prev[2] + 1, 10)]);
  };
  
  // إعادة ضبط موضع الكاميرا
  const resetCamera = () => {
    setCameraPosition([0, 0, 5]);
  };

  // تبديل وضع ملء الشاشة
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

  // مراقبة حدث الخروج من وضع ملء الشاشة
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
      className={`relative rounded-xl overflow-hidden border border-kidmam-purple/20 shadow-lg bg-gradient-to-b from-black/80 to-kidmam-purple/20 ${className}`}
      style={{ height: isFullscreen ? '100vh' : '400px' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Canvas 
        shadows 
        camera={{ position: cameraPosition, fov: 50 }}
        dpr={[1, 2]} // تحسين الدقة في الأجهزة عالية الوضوح
      >
        <AdvancedLighting enabled={advancedLighting} />
        <DefaultFetus weekNumber={weekNumber} showDetails={showDetails} />
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
      
      {/* شريط أدوات التحكم */}
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
            
            {/* زر نبضات القلب */}
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
            
            {/* زر قائمة مستوى الصوت */}
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
      
      {/* المنزلق لضبط مستوى الصوت */}
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
      
      {/* معلومات الجنين في الأعلى */}
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
        
        {/* إعلان "اسحب للتدوير" */}
        <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-xs font-medium inline-block animate-pulse-gentle">
          اسحب للتدوير • استخدم عجلة الماوس للتكبير
        </div>
      </div>
      
      {/* تأثير بصري لنبضات القلب */}
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
    </motion.div>
  );
};

export default FetusThreedModel;
