import { useState, useEffect } from 'react';

const useDecay = (totalDurationInSeconds) => {
  const [startTime] = useState(Date.now());
  const [timeRemaining, setTimeRemaining] = useState(totalDurationInSeconds);
  const [decayPercentage, setDecayPercentage] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const elapsedTime = (Date.now() - startTime) / 1000;
      const remaining = Math.max(totalDurationInSeconds - elapsedTime, 0);
      const percentage = (elapsedTime / totalDurationInSeconds) * 100;
      
      setTimeRemaining(Math.floor(remaining));
      setDecayPercentage(Math.min(percentage, 100));
      
      if (remaining <= 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTime, totalDurationInSeconds]);

  return { decayPercentage, timeRemaining };
};

export default useDecay;
