
import React from 'react';
import { DoubleSide } from 'three';
import * as THREE from 'three';

export const WombModel: React.FC = () => {
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
