import React, { useEffect, useState } from "react";

function CountdownTimer() {
  const targetDate = new Date().getTime() + 30 * 60 * 1000;
  const [timeRemaining, setTimeRemaining] = useState(
    targetDate - new Date().getTime()
  );

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      const currentDate = new Date().getTime();
      const remaining = targetDate - currentDate;
      setTimeRemaining(remaining);

      if (remaining < 0) {
        clearInterval(countdownInterval);
      }
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, []);

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return (
    <>
      {minutes}m {seconds}s
    </>
  );
}

export default CountdownTimer;
