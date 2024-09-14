import React, { useState, useEffect } from 'react';

const Timer = ({ duration, submitQuiz }) => {

  const durationInSeconds = duration * 60;
  const [timeRemaining, setTimeRemaining] = useState(durationInSeconds);

  useEffect(() => {
    if (timeRemaining > 0) {
      const interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      submitQuiz();
      console.log('Finished!');
    }
  }, [timeRemaining]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <>
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
    </>
  );
};

export default Timer;
