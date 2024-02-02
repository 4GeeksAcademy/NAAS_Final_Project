// Achievements.js
import React, { useContext, useState } from "react"
import { Context } from "../store/appContext"

import "../../styles/logros.css"

export const Logros = () => {
  const { store, actions } = useContext(Context);
  const [hoverAchievement, setHoverAchievement] = useState(null);

  const handleMouseEnter = (achievement) => {
    setHoverAchievement(achievement);
  };

  const handleMouseLeave = () => {
    setHoverAchievement(null);
  };

  return (
    <div className="achievement-container container-fluid">
      {/* Contenido de la sección de logros */}
      <h3 className="color-text d-flex justify-content-center mt-5 mb-2 logros-title">Logros</h3>
      <div className="bg-dark color-text d-flex flex-column align-items-center">
        <div className="tier-container">
          <h4>Tier Iniciado</h4>
          <div className="d-flex justify-content-center">
            <div className="achievement-title" onMouseEnter={() => handleMouseEnter('Nuevo Usuario')} onMouseLeave={() => handleMouseLeave}>
              <h5>Nuevo Usuario</h5>
              <img src="https://i.imgur.com/3mUKHYV.png" alt="new user of Snapify" className="achievement " />
              {hoverAchievement === 'Nuevo Usuario' && (
                <div className="achievement-text">Bienvenido a Snapify. <em>Otorgado al registrarse.</em></div>
              )}
            </div>
            <div className="achievement-title" onMouseEnter={() => handleMouseEnter('Primer SNAP!')} onMouseLeave={() => handleMouseLeave}>
              <h5>Primer SNAP!</h5>
              <img src="https://i.imgur.com/fIScyew.png" alt="first snap" className="achievement" />
              {hoverAchievement === 'Primer SNAP!' && (
                <div className="achievement-text">Da el primer paso. <em>Otorgado al debutar en tu primer concurso.</em></div>
              )}
            </div>
            <div className="achievement-title" onMouseEnter={() => handleMouseEnter('Corazón Emergente')} onMouseLeave={() => handleMouseLeave}>
              <h5>Corazón Emergente</h5>
              <img src="https://i.imgur.com/iDS1yFR.png" alt="shining heart" className="achievement" />
              {hoverAchievement === 'Corazón Emergente' && (
                <div className="achievement-text">Atrae miradas. <em>Otorgado al conseguir 10 "likes" en una sola foto.</em></div>
              )}
            </div>
            <div className="achievement-title" onMouseEnter={() => handleMouseEnter('Influencer Novato')} onMouseLeave={() => handleMouseLeave}>
              <h5>Influencer Novato</h5>
              <img src="https://i.imgur.com/dLIS0G8.png" alt="follow" className="achievement" />
              {hoverAchievement === 'Influencer Novato' && (
                <div className="achievement-text">Bienvenido a la vida pública. <em>Otorgado al acumular 20 seguidores en tu perfil.</em></div>
              )}
            </div>
          </div>
        </div>
        <div className="tier-container">
          <h4>Tier Intermedio</h4>
          <div className="d-flex justify-content-center">
            <div className="achievement-title" onMouseEnter={() => handleMouseEnter('Ingeniero de la Imagen')} onMouseLeave={() => handleMouseLeave}>
              <h5>Ingeniero de la Imagen</h5>
              <img src="https://i.imgur.com/Xi9pu83.png" alt="perspective" className="achievement" />
              {hoverAchievement === 'Ingeniero de la Imagen' && (
                <div className="achievement-text">Experimenta con tu arte. <em>Otorgado al enviar tus fotos a 10 concursos.</em></div>
              )}
            </div>
            <div className="achievement-title" onMouseEnter={() => handleMouseEnter('Ganador de Corazones')} onMouseLeave={() => handleMouseLeave}>
              <h5>Ganador de Corazones</h5>
              <img src="https://i.imgur.com/qKXtxv2.png" alt="several hearts" className="achievement" />
              {hoverAchievement === 'Ganador de Corazones' && (
                <div className="achievement-text">Conquista corazones. <em>Otorgado al obtener 50 "likes" en una única foto.</em></div>
              )}
            </div>
            <div className="achievement-title" onMouseEnter={() => handleMouseEnter('Embajador')} onMouseLeave={() => handleMouseLeave}>
              <h5>Embajador Fotográfico</h5>
              <img src="https://i.imgur.com/shAk6a4.png" alt="ambassador" className="achievement" />
              {hoverAchievement === 'Embajador' && (
                <div className="achievement-text">Lleva tu influencia más allá. <em>Otorgado al alcanzar la impresionante cifra de 50 seguidores.</em></div>
              )}
            </div>
          </div>
        </div>
        <div className="tier-container">
          <h4>Tier Avanzado</h4>
          <div className="d-flex justify-content-center">
            <div className="achievement-title" onMouseEnter={() => handleMouseEnter('King')} onMouseLeave={() => handleMouseLeave}>
              <h5>Rey de Corazones</h5>
              <img src="https://i.imgur.com/g41w1dC.png" alt="king of hearts" className="achievement" />
              {hoverAchievement === 'King' && (
                <div className="achievement-text">Corónate. <em>Otorgado al conseguir 100 "likes" en una sola foto.</em></div>
              )}
            </div>
            <div className="achievement-title" onMouseEnter={() => handleMouseEnter('legion')} onMouseLeave={() => handleMouseLeave}>
              <h5>Lider de la Legión</h5>
              <img src="https://i.imgur.com/XmSFMDv.png" alt="group of people" className="achievement" />
              {hoverAchievement === 'legion' && (
                <div className="achievement-text">Conduce la marcha. <em>Otorgado al alcanzar la impresionante cifra de 100 seguidores.</em></div>
              )}
            </div>
            <div className="achievement-title" onMouseEnter={() => handleMouseEnter('pioneer')} onMouseLeave={() => handleMouseLeave}>
              <h5>Pionero</h5>
              <img src="https://i.imgur.com/VZdxqYf.png" alt="star" className="achievement" />
              {hoverAchievement === 'pioneer' && (
                <div className="achievement-text">Sé un ejemplo a seguir. <em>Otorgado al participar en 30 concursos con consistencia y pasión.</em></div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* ...otros elementos de logros */}
    </div >
  );
};