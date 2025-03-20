import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Gear = ({ id, position, rotation, size, teeth, breakingPoint, destroyed, destructionLevel }) => {
  const meshRef = useRef();
  const initialPosition = useRef(position).current;
  const rotationSpeed = useRef(Math.random() * 0.02 + 0.01).current;
  
  // Create gear geometry
  const gearGeometry = useRef(createGearGeometry(size, teeth)).current;
  
  // Function to create gear geometry with teeth
  function createGearGeometry(radius, teethCount) {
    const shape = new THREE.Shape();
    const outerRadius = radius;
    const innerRadius = radius * 0.7;
    const toothDepth = radius * 0.2;
    
    // Draw the inner circle
    shape.moveTo(innerRadius, 0);
    shape.absarc(0, 0, innerRadius, 0, Math.PI * 2, false);
    
    // Create extrusion settings
    const extrudeSettings = {
      steps: 1,
      depth: radius * 0.3,
      bevelEnabled: true,
      bevelThickness: radius * 0.05,
      bevelSize: radius * 0.05,
      bevelSegments: 3
    };
    
    // Create teeth
    const teethShape = new THREE.Shape();
    for (let i = 0; i < teethCount; i++) {
      const angle = (i / teethCount) * Math.PI * 2;
      const nextAngle = ((i + 1) / teethCount) * Math.PI * 2;
      
      const x1 = Math.cos(angle) * outerRadius;
      const y1 = Math.sin(angle) * outerRadius;
      
      const x2 = Math.cos(angle) * (outerRadius + toothDepth);
      const y2 = Math.sin(angle) * (outerRadius + toothDepth);
      
      const x3 = Math.cos(nextAngle) * (outerRadius + toothDepth);
      const y3 = Math.sin(nextAngle) * (outerRadius + toothDepth);
      
      const x4 = Math.cos(nextAngle) * outerRadius;
      const y4 = Math.sin(nextAngle) * outerRadius;
      
      teethShape.moveTo(x1, y1);
      teethShape.lineTo(x2, y2);
      teethShape.lineTo(x3, y3);
      teethShape.lineTo(x4, y4);
    }
    
    // Combine shapes
    const combinedShape = new THREE.ShapeGeometry([shape, teethShape]);
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }
  
  // Animation and destruction effects
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    if (!destroyed) {
      // Normal rotation when not destroyed
      meshRef.current.rotation.z += delta * rotationSpeed;
    } else {
      // Fall and spin when destroyed
      meshRef.current.position.y -= delta * 2;
      meshRef.current.rotation.x += delta * 2;
      meshRef.current.rotation.z += delta * 3;
    }
    
    // Apply stress/wear effects as destruction level increases
    if (destructionLevel > breakingPoint * 0.7 && !destroyed) {
      // Simulate stress by adding slight wobble
      meshRef.current.position.x = initialPosition[0] + Math.sin(state.clock.elapsedTime * 5) * 0.05;
      meshRef.current.position.y = initialPosition[1] + Math.cos(state.clock.elapsedTime * 4) * 0.05;
    }
  });
  
  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={[0, 0, rotation]}
      castShadow
      receiveShadow
    >
      <primitive object={gearGeometry} attach="geometry" />
      <meshStandardMaterial 
        color={destroyed ? '#8B4513' : '#D4AF37'} 
        metalness={0.8}
        roughness={0.2}
        emissive={destructionLevel > breakingPoint * 0.8 && !destroyed ? '#ff4000' : '#000000'}
        emissiveIntensity={destructionLevel > breakingPoint * 0.8 && !destroyed ? 0.5 : 0}
      />
    </mesh>
  );
};

export default Gear;
