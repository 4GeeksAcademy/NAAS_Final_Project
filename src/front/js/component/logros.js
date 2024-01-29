// Achievements.js
import React, { useContext }from "react"
import { Context } from "../store/appContext"

export const Logros = () => {
  const { store, actions } = useContext(Context);
  return (
    <div>
      {/* Contenido de la sección de logros */}
      <h3 className="color-text d-flex justify-content-center">Logros</h3>
      
      <div className="bg-dark color-text d-flex justify-content-evenly flex-wrap pt-3">
      <i className="medal fa-solid fa-medal"></i>
      <i className="medal fa-solid fa-medal"></i>
      <i className="medal fa-solid fa-medal"></i>
      <i className="medal fa-solid fa-medal"></i>
      <i className="medal fa-solid fa-medal"></i>
      <i className="medal fa-solid fa-medal"></i>
      <i className="medal fa-solid fa-medal"></i>
      <i className="medal fa-solid fa-medal"></i>
      <i className="medal fa-solid fa-medal"></i>
      <i className="medal fa-solid fa-medal"></i>
      <i className="medal fa-solid fa-medal"></i>
      <i className="medal fa-solid fa-medal"></i>
      </div>
      {/* ...otros elementos de logros */}
    </div>
  );
};
