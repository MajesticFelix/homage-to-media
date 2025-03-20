import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import Gear from './Gear';
import Lever from './Lever';

const SculptureModel = ({ destructionLevel }) => {
  const numberOfGears = 20;
  const numberOfLevers = 10;
  const groupRef = useRef();
  
  // Generate gear data with different properties
  const gears = useMemo(() => {
    return Array.from({ length: numberOfGears }, (_, i) => ({
      id: `gear-${i}`,
      position: [
        Math.random() * 6 - 3,
        Math.random() * 6 - 3,
        Math.random() * 2 - 1
      ],
      rotation: Math.random() * Math.PI * 2,
      size: 0.3 + Math.random() * 0.7,
      teeth: 5 + Math.floor(Math.random() * 15),
      breakingPoint: 20 + Math.random() * 80 // When this gear breaks
    }));
  }, []);
  
  // Generate lever data
  const levers = useMemo(() => {
    return Array.from({ length: numberOfLevers }, (_, i) => ({
      id: `lever-${i}`,
      position: [
        Math.random() * 6 - 3,
        Math.random() * 6 - 3,
        Math.random() * 2 - 1
      ],
      rotation: Math.random() * Math.PI * 2,
      length: 0.8 + Math.random() * 1.2,
      breakingPoint: 30 + Math.random() * 70
    }));
  }, []);
  
  // Animation and destruction logic
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Apply general decay effect to the whole sculpture
      groupRef.current.rotation.y += delta * 0.1;
      
      // As destruction increases, the sculpture becomes more chaotic
      if (destructionLevel > 50) {
        groupRef.current.rotation.x += delta * (destructionLevel - 50) * 0.01;
        groupRef.current.position.y -= delta * (destructionLevel - 50) * 0.005;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {gears.map(gear => (
        <Gear 
          key={gear.id}
          {...gear}
          destroyed={destructionLevel > gear.breakingPoint}
          destructionLevel={destructionLevel}
        />
      ))}
      
      {levers.map(lever => (
        <Lever
          key={lever.id}
          {...lever}
          destroyed={destructionLevel > lever.breakingPoint}
          destructionLevel={destructionLevel}
        />
      ))}
    </group>
  );
};

export default SculptureModel;
