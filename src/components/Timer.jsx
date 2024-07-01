import { useEffect, useState } from "react";

export default function Timer({ timeout, onTimeOut }) {
  const [remaingingTine, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const time = setTimeout(onTimeOut, timeout);

    return () => {
      clearTimeout(time);
    };
  }, [timeout, onTimeOut]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress id="question-time" value={remaingingTine} max={timeout} />;
}
