// Eventos.js
import React, { useContext, useState }from "react"
import { Context } from "../store/appContext"

export const Eventos = () => {
  const { store, actions } = useContext(Context);
  return (
    <div>
      <h3 className="color-text">Eventos</h3>
      {/* Contenido de tu componente de eventos */}
    </div>
  );
};


export const Favoritos = () => {
  const { store, actions } = useContext(Context);
  return (
    <div>
      <h3 className="color-text">Favoritos</h3>
      {/* Contenido de tu componente de eventos */}
    </div>
  );
};