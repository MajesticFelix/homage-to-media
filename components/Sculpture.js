import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import useDecay from '../hooks/useDecay';
import useInteraction from '../hooks/useInteraction';
import DestructionEffects from './DestructionEffects';
import SculptureModel from './SculptureModel';
import SocialMediaFeed from './SocialMediaFeed';
import soundManager from '../lib/soundManager';
import styles from '../styles/Sculpture.module.css';

const Sculpture = () => {
  const containerRef = useRef(null);
  const [destructionLevel, setDestructionLevel] = useState(0);
  
  // Custom hooks
  const { decayPercentage, timeRemaining } = useDecay(27 * 60); // 27 minutes in seconds
  const { interactionEvents } = useInteraction(containerRef);
  
  // Update destruction level based on decay and interactions
  useEffect(() => {
    const baseDestruction = decayPercentage;
    const interactionBoost = interactionEvents.length * 0.5; // Each interaction adds to destruction
    const newLevel = Math.min(baseDestruction + interactionBoost, 100);
    setDestructionLevel(newLevel);
    
    // Play stress sounds as destruction increases
    if (destructionLevel > 50 && soundManager) {
      soundManager.startStressSound((destructionLevel - 50) / 50);
    }
    
    // Final explosion when completely destroyed
    if (destructionLevel >= 99 && soundManager) {
      soundManager.playExplosion();
    }
    
  }, [decayPercentage, interactionEvents, destructionLevel]);

  return (
    <div 
      ref={containerRef} 
      className={styles.sculptureContainer}
      tabIndex={0}
    >
      <div className={styles.timeRemaining}>
        Time Remaining: {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}
      </div>
      
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <SculptureModel destructionLevel={destructionLevel} />
        <DestructionEffects level={destructionLevel} />
        <OrbitControls />
      </Canvas>
      
      <SocialMediaFeed 
        destructionLevel={destructionLevel} 
        interactionEvents={interactionEvents}
      />
    </div>
  );
};

export default Sculpture;
