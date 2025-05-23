import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DestructionEffects = ({ level }) => {
  const particleCount = Math.floor(level * 2);
  
  useFrame((state, delta) => {});

  return (
    <>
      {level > 20 && (
        <points>
          <bufferGeometry>
            <bufferAttribute
              attachObject={['attributes', 'position']}
              count={particleCount}
              array={new Float32Array(particleCount * 3).map(() => (Math.random() - 0.5) * 10)}
              itemSize={3}
            />
            <bufferAttribute
              attachObject={['attributes', 'color']}
              count={particleCount}
              array={new Float32Array(particleCount * 3).map(() => Math.random())}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.1}
            vertexColors
            transparent
            opacity={level / 100}
          />
        </points>
      )}
    </>
  );
};

export default DestructionEffects;
