import React, { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Context } from "../store/appContext";
import moment from 'moment';

export const Timer = () => {
  const { store, actions } = useContext(Context);
  const { event_id } = useParams();
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [endDate, setEndDate] = useState(null); // Nuevo estado para endDate

  useEffect(() => {
    const fetchData = async () => {
      await actions.getEvent(event_id);
      updateTimer();
    };

    fetchData();

    const updateTimerInterval = setInterval(() => {
      updateTimer();
    }, 1000);

    return () => clearInterval(updateTimerInterval);

  }, [event_id, store.currentEvent, actions]);

  const updateTimer = () => {
    const event = store.currentEvent;
    if (event && event.end_date) {
      const now = moment();
      const endDateMoment = moment(event.end_date);
      setEndDate(endDateMoment); // Actualizar el estado con endDate
      const timeRemainingInSeconds = endDateMoment.diff(now, 'seconds');
      setTimeRemaining(Math.max(timeRemainingInSeconds, 0));
    } else {
      setEndDate(null); // Actualizar el estado con null si no hay end_date
      setTimeRemaining(0);
    }
  };

  const days = Math.floor(timeRemaining / (24 * 60 * 60));
  const hours = Math.floor((timeRemaining % (24 * 60 * 60)) / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);

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
