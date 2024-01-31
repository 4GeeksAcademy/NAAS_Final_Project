import React, { useState, useContext, useEffect } from "react";
import "../../styles/events.css"
import { Context } from "../store/appContext";

export const Timer = ({eventEndDate}) => {
    const { store, actions } = useContext(Context);

    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const endDate = new Date(eventEndDate).getTime();
      const timeRemainingInSeconds = Math.floor((endDate - now) / 1000);
      return Math.max(timeRemainingInSeconds, 0); //comprobar que no sea un n° negativo
    }

    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining);
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [timeRemaining]);

  const days = Math.floor(timeRemaining / (24 * 60 * 60));
  const hours = Math.floor((timeRemaining % (24 * 60 * 60)) / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  // const seconds = timeRemaining % 60;
  return (
    <div className="timer">
    <p className="lead color-text2">Tiempo Restante:</p>
    <div className="timer-digits">
      <div className="digit">
        <span className="value">{days}</span>
        <span className="label">Días</span>
      </div>
      <div className="points">:</div>
      <div className="digit">
        <span className="value">{hours}</span>
        <span className="label">Horas</span>
      </div>
      <div className="points">:</div>
      <div className="digit">
        <span className="value">{minutes}</span>
        <span className="label">Minutos</span>
      </div>
    </div>
  </div>
  );
};
