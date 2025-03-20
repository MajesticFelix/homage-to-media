import { useState, useEffect } from 'react';
import soundManager from '../lib/soundManager';

const useInteraction = (containerRef) => {
  const [interactionEvents, setInteractionEvents] = useState([]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const element = containerRef.current;
    
    const handleClick = (e) => {
      addInteraction('click', { x: e.clientX, y: e.clientY });
      if (soundManager) soundManager.playRandomDestructionSound();
    };
    
    const handleKeyPress = (e) => {
      addInteraction('keypress', { key: e.key });
      if (soundManager) soundManager.playRandomDestructionSound();
    };
    
    const addInteraction = (type, data) => {
      const newEvent = {
        id: Date.now(),
        type,
        data,
        timestamp: new Date().toISOString(),
      };
      
      setInteractionEvents(prev => [...prev, newEvent]);
    };
    
    // Add event listeners
    element.addEventListener('click', handleClick);
    element.addEventListener('keydown', handleKeyPress);
    
    return () => {
      // Clean up
      element.removeEventListener('click', handleClick);
      element.removeEventListener('keydown', handleKeyPress);
    };
  }, [containerRef]);

  return { interactionEvents };
};

export default useInteraction;
