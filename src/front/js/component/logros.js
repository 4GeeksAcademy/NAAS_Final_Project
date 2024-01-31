// Achievements.js
import React, { useContext } from "react"
import { Context } from "../store/appContext"

import "../../styles/logros.css"

export const Logros = () => {
  const { store, actions } = useContext(Context);
  return (
    <div className="achievement-container">
      {/* Contenido de la sección de logros */}
      <h3 className="color-text d-flex justify-content-center">Logros</h3>
      <div className="bg-dark color-text d-flex flex-column align-items-center">
        <div className="tier-container">
          <h4>Tier Iniciado</h4>
          <div className="d-flex justify-content-center">
            <div className="achievement-title">
              <h5>Nuevo Usuario</h5>
              <img src="https://i.imgur.com/3mUKHYV.png" alt="new user of Snapify" className="achievement " />
            </div>
            <div className="achievement-title">
              <h5>Primer SNAP!</h5>
              <img src="https://i.imgur.com/fIScyew.png" alt="first snap" className="achievement" />
            </div>
            <div className="achievement-title">
              <h5>Corazón Emergente</h5>
              <img src="https://i.imgur.com/iDS1yFR.png" alt="shining heart" className="achievement" />
            </div>
            <div className="achievement-title">
              <h5>Influencer Novato</h5>
              <img src="https://i.imgur.com/dLIS0G8.png" alt="follow" className="achievement" />
            </div>
          </div>
        </div>
        <div className="tier-container">
          <h4>Tier Intermedio</h4>
          <div className="d-flex justify-content-center">
            <div className="achievement-title">
              <h5>Ingeniero de la Imagen</h5>
              <img src="https://i.imgur.com/Xi9pu83.png" alt="perspective" className="achievement" />
            </div>
            <div className="achievement-title">
              <h5>Ganador de Corazones</h5>
              <img src="https://i.imgur.com/qKXtxv2.png" alt="several hearts" className="achievement" />
            </div>
            <div className="achievement-title">
              <h5>Embajador Fotográfico</h5>
              <img src="https://i.imgur.com/shAk6a4.png" alt="ambassador" className="achievement" />
            </div>
          </div>
        </div>
        <div className="tier-container">
          <h4>Tier Avanzado</h4>
          <div className="d-flex justify-content-center">
            <div className="achievement-title">
              <h5>Rey de Corazones</h5>
              <img src="https://i.imgur.com/g41w1dC.png" alt="king of hearts" className="achievement" />
            </div>
            <div className="achievement-title">
              <h5>Lider de la Legión</h5>
              <img src="https://i.imgur.com/XmSFMDv.png" alt="group of people" className="achievement" />
            </div>
            <div className="achievement-title">
              <h5>Pionero</h5>
              <img src="https://i.imgur.com/VZdxqYf.png" alt="star" className="achievement" />
            </div>
          </div>
        </div>
      </div>
      {/* ...otros elementos de logros */}
    </div>
  );
};