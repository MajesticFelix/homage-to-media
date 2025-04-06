import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Lever = ({ id, position, rotation, length, breakingPoint, destroyed, destructionLevel }) => {
  const meshRef = useRef();
  const pivotRef = useRef();
  const initialPosition = useRef(position).current;
  const swingDirection = useRef(Math.random() > 0.5 ? 1 : -1).current;
  const swingSpeed = useRef(Math.random() * 0.5 + 0.3).current;
  const swingAmount = useRef(Math.random() * 0.3 + 0.1).current;

  useFrame((state, delta) => {
    if (!pivotRef.current || !meshRef.current) return;
    
    if (!destroyed) {
      const swingAngle = Math.sin(state.clock.elapsedTime * swingSpeed) * swingAmount * swingDirection;
      pivotRef.current.rotation.z = rotation + swingAngle;
      
      if (destructionLevel > breakingPoint * 0.7) {
        const stressIntensity = (destructionLevel - (breakingPoint * 0.7)) / (breakingPoint * 0.3);
        const erraticMovement = Math.sin(state.clock.elapsedTime * 10) * stressIntensity * 0.2;
        pivotRef.current.rotation.z += erraticMovement;
        
        pivotRef.current.position.x = initialPosition[0] + Math.sin(state.clock.elapsedTime * 8) * stressIntensity * 0.05;
        pivotRef.current.position.y = initialPosition[1] + Math.cos(state.clock.elapsedTime * 7) * stressIntensity * 0.05;
      }
    } else {
      pivotRef.current.position.y -= delta * 2;
      pivotRef.current.rotation.x += delta;
      pivotRef.current.rotation.z += delta * 2;
    }
    
    if (meshRef.current.material) {
      if (destructionLevel > breakingPoint * 0.8 && !destroyed) {
        meshRef.current.material.emissive.set('#ff4000');
        meshRef.current.material.emissiveIntensity = (destructionLevel - (breakingPoint * 0.8)) / (breakingPoint * 0.2) * 0.7;
      }
      
      if (destroyed) {
        meshRef.current.material.color.set('#8B4513');
        meshRef.current.material.emissiveIntensity = 0;
      }
    }
  });

  return (
    <group ref={pivotRef} position={position}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial 
          color="#A0A0A0" 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      <mesh 
        ref={meshRef} 
        position={[0, length / 2, 0]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[0.1, length, 0.1]} />
        <meshStandardMaterial 
          color={destroyed ? '#8B4513' : '#B87333'} 
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      <mesh 
        position={[0, length, 0]} 
        castShadow 
        receiveShadow
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color={destroyed ? '#8B4513' : '#D4AF37'} 
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
};

export default Lever;
