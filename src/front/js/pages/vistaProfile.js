import React, { useContext, useState } from "react";
import { Link, Route } from "react-router-dom";
import { Context } from "../store/appContext";
import banner from "../../img/banner.png";
import avatar from "../../img/avatar.png";
import { PhotoCard } from "../component/photoCard";
import { Logros } from "../component/logros";
import { Eventos } from "../component/eventos";

export const VistaProfile = () => {
  const { store, actions } = useContext(Context);
  const [currentSection, setCurrentSection] = useState("photos"); // Estado por defecto

  // Datos de prueba para las tarjetas
  const testData = [
    { photo: "Nombre foto1", name: "Animakid", index: 1, likes: 10, favorites: 5 },
    { photo: "Nombre foto2", name: "Animakid", index: 2, likes: 15, favorites: 8 },
    { photo: "Nombre foto3", name: "Animakid", index: 3, likes: 20, favorites: 12 },
    { photo: "Nombre foto4", name: "Animakid", index: 4, likes: 8, favorites: 3 },
    { photo: "Nombre foto5", name: "Animakid", index: 5, likes: 12, favorites: 6 },
    { photo: "Nombre foto6", name: "Animakid", index: 6, likes: 18, favorites: 9 },
  ];

  // Función para cambiar la sección actual
  const changeSection = (section) => {
    setCurrentSection(section);
  };

  return (
    <div className="container-fluid color-back">
      <div>
        <img className="banner" src={banner} alt="Banner" />
      </div>
      <div className="d-flex align-items-center">
        <img className="avatar" src={avatar} alt="Avatar" />
        <h2 className="color-text">Animakid</h2>
      </div>
      <ul className="list-group flex-row justify-content-evenly mb-5">
        <li className={`list-group-item d-flex justify-content-between select`}>
          <Link to="#" onClick={() => changeSection("photos")}>
            <span className="select">Fotos</span>
          </Link>
        </li>
        <li className={`list-group-item d-flex justify-content-between select`}>
          <Link to="#" onClick={() => changeSection("eventos")}>
            <span className="select">Eventos</span>
          </Link>
        </li>
        <li className={`list-group-item d-flex justify-content-between select`}>
          <Link to="#" onClick={() => changeSection("logros")}>
            <span className="select">Logros</span>
          </Link>
        </li>
      </ul>
      <div className="bg-dark d-flex justify-content-evenly flex-wrap pt-3">
        {currentSection === "photos" ? (
          // Renderiza las tarjetas de fotos si la sección actual es "photos"
          testData.map((data, index) => <PhotoCard key={index} {...data} />)
        ) : currentSection === "logros" ? (
          // Renderiza la sección de logros si la sección actual es "logros"
          <Logros />
        ) : (
          // Renderiza la sección de eventos si la sección actual es "eventos"
          <Eventos />
        )}
      </div>
      <br />
      <Link to="/">
        <button className="btn btn-primary">Volver a inicio</button>
      </Link>
    </div>
  );
};
