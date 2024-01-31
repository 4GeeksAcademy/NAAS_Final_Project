// Achievements.js
import React, { useContext } from "react"
import { Context } from "../store/appContext"

import "../../styles/logros.css"

export const Logros = () => {
  const { store, actions } = useContext(Context);
  return (
    <div>
      {/* Contenido de la sección de logros */}
      <h3 className="color-text d-flex justify-content-center">Logros</h3>

      <div className="bg-dark color-text d-flex justify-content-evenly flex-wrap pt-3">
        <img src="https://i.imgur.com/3mUKHYV.png" alt="new user of Snapify" className="first-achievement" />
        <img src="https://i.imgur.com/fIScyew.png" alt="first snap" className="second-achievement" />
        <img src="https://i.imgur.com/iDS1yFR.png" alt="shining heart" className="third-achievement" />
        <img src="https://i.imgur.com/dLIS0G8.png" alt="follow" className="fourth-achievement" />
        <img src="https://i.imgur.com/Xi9pu83.png" alt="perspective" className="fifth-achievement" />
        <img src="https://i.imgur.com/qKXtxv2.png" alt="several hearts" className="sixth-achievement" />
        <img src="https://i.imgur.com/shAk6a4.png" alt="ambassador" className="seventh-achievement" />
        <img src="https://i.imgur.com/g41w1dC.png" alt="king of hearts" className="eighth-achievement" />
        <img src="https://i.imgur.com/XmSFMDv.png" alt="group of people" className="ninth-achievement" />
        <i className="medal fa-solid fa-medal"></i>
        <i className="medal fa-solid fa-medal"></i>
        <i className="medal fa-solid fa-medal"></i>
      </div>
      {/* ...otros elementos de logros */}
    </div>
  );
};