import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Timer = () => {
    const { store, actions } = useContext(Context);
    const initialTimeInSeconds = 7 * 24 * 60 * 60; // 7 días en segundos
    const [timeRemaining, setTimeRemaining] = useState(initialTimeInSeconds);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(prevTime => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeRemaining]);

  const days = Math.floor(timeRemaining / (24 * 60 * 60));
  const hours = Math.floor((timeRemaining % (24 * 60 * 60)) / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="timer">
        <h2>Próximo Evento se cierra en:</h2>
      <div className="d-flex justify-content-between px-3">
        <span>{days}  :</span>
        <span>{hours}  :</span>
        <span>{minutes}  :</span>
        <span>{seconds}  </span>
      </div>
      <div className="d-flex justify-content-between px-3">
        <span>days</span>
        
      </div>
    </div>
  );
};
