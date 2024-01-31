
import React, { useContext } from "react"
import { Context } from "../store/appContext"
import { Timer } from "../component/Timer";
import "../../styles/events.css"



export const Eventos = () => {
  const { store, actions } = useContext(Context);
  return (
    <div className="events">
      <div className="event-container">
        <div className="info-container">
          <h3>Nombre del evento</h3>
          <p className="color-text2">Categoria</p>
        </div>
        <div className="btn-container">
          <div className="btn-icon">
            <button className="btn color-call">
            <i className="fa-solid fa-plus" style={{ color: "#ffffff" }} />
              Ver evento
            </button>
          </div>
          <div className="btn-icon">
            <button className="btn color-call">
              <i className="fa-regular fa-circle-xmark" style={{ color: "#ffffff" }}></i>
            Dar de baja
            </button>
          </div>
        </div>
      </div>
      <Timer eventEndDate={"2024-2-1"} />
    </div>
  );
};
