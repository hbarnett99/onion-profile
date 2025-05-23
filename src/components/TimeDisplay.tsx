"use client";

import React, { useState, useEffect } from "react";

interface TimeDisplayProps {
  loaded: boolean;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ loaded }) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`transform transition-all duration-1500 delay-1200 ${
        loaded ? "translate-y-0 opacity-50" : "translate-y-5 opacity-0"
      }`}
    >
      <div className="text-4xl font-mono font-bold">
        {formatTime(currentTime)}
      </div>
    </div>
  );
};

export default TimeDisplay;
