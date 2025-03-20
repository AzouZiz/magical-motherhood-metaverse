
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { Mesh, AnimationMixer, Clock, MeshStandardMaterial } from 'three';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Expand, Minimize, RotateCcw } from 'lucide-react';

interface FetusModelProps {
  weekNumber: number;
  position?: [number, number, number];
  scale?: number;
}

// الكائن الافتراضي للجنين - يتم استخدامه كمكان بديل حتى نحصل على نماذج فعلية
const DefaultFetus = ({ weekNumber, position = [0, 0, 0], scale = 1 }: FetusModelProps) => {
  // استخدام الإشارة المرجعية للتحكم في دوران النموذج
  const meshRef = useRef<Mesh>(null);
  
  // تعديل حجم الجنين بناءً على أسبوع الحمل
  const fetusScale = 0.2 + (weekNumber / 40) * 0.8;
  
  // تغيير لون النموذج بناءً على العمر (أسابيع أقل = أكثر وردية، أسابيع أعلى = أكثر بشرية)
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
      
      // حركة نبض بسيطة تعتمد على عمر الجنين (الجنين الأصغر ينبض أسرع)
      const pulseSpeed = 2 - (weekNumber / 40); // سرعة أعلى للأسابيع المبكرة
      const pulseAmount = 0.05 - (weekNumber / 800); // كمية أقل من النبض مع تقدم العمر
      
      meshRef.current.scale.x = fetusScale * (1 + Math.sin(clock.getElapsedTime() * pulseSpeed) * pulseAmount);
      meshRef.current.scale.y = fetusScale * (1 + Math.sin(clock.getElapsedTime() * pulseSpeed) * pulseAmount);
      meshRef.current.scale.z = fetusScale * (1 + Math.sin(clock.getElapsedTime() * pulseSpeed) * pulseAmount);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={[fetusScale * scale, fetusScale * scale, fetusScale * scale]}
    >
      {getGeometry()}
      <meshStandardMaterial color={color} roughness={0.7} metalness={0.1} />
    </mesh>
  );
};

interface FetusThreedModelProps {
  weekNumber: number;
  className?: string;
}

const FetusThreedModel = ({ weekNumber, className = "" }: FetusThreedModelProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

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
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <DefaultFetus weekNumber={weekNumber} />
        
        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={1.5} far={4} />
        <Environment preset="dawn" />
        <OrbitControls 
          autoRotate={isRotating} 
          autoRotateSpeed={1.5} 
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={10}
        />
      </Canvas>
      
      {/* الأزرار الثابتة */}
      <div className="absolute bottom-4 right-4 flex gap-2 z-10">
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-black/40 backdrop-blur-sm border-white/20 text-white hover:bg-black/60"
          onClick={() => setIsRotating(!isRotating)}
        >
          <RotateCcw className={`h-4 w-4 ${isRotating ? 'text-kidmam-teal' : 'text-white'}`} />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-black/40 backdrop-blur-sm border-white/20 text-white hover:bg-black/60"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? 
            <Minimize className="h-4 w-4" /> : 
            <Expand className="h-4 w-4" />
          }
        </Button>
      </div>
      
      {/* المؤشر للمعلومات */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium inline-block">
          الجنين في الأسبوع {weekNumber}
        </div>
      </div>
    </motion.div>
  );
};

export default FetusThreedModel;
