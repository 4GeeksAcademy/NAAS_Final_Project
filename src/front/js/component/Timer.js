import React, { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Context } from "../store/appContext";
import moment from 'moment';

export const Timer = ({ endDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const updateTimer = () => {
      const now = moment();
      const endDateMoment = moment(endDate);
      const timeRemainingInSeconds = endDateMoment.diff(now, 'seconds');
      setTimeRemaining(Math.max(timeRemainingInSeconds, 0));
    };

    // Actualizar el temporizador cada segundo
    const timerInterval = setInterval(updateTimer, 1000);

    // Limpieza del intervalo al desmontar el componente
    return () => clearInterval(timerInterval);

  }, [endDate]);

  const days = Math.floor(timeRemaining / (24 * 60 * 60));
  const hours = Math.floor((timeRemaining % (24 * 60 * 60)) / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="timer" style={{ fontSize: "0.8em" }}>
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
        <div className="points">:</div>
        <div className="digit">
          <span className="value">{seconds}</span>
          <span className="label">Segundos</span>
        </div>
      </div>
    </div>
  );
};
