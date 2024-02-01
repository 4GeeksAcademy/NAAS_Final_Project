import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import banner from "../../img/banner.png";
import avatar from "../../img/avatar.png";
import { PhotoCard } from "../component/PhotoCard";
import { Logros } from "../component/logros";
import { Eventos, Status, Favoritos } from "../component/Eventos";
import { testData1 } from "../component/testData";

export const VistaProfile = () => {
  const { store, actions } = useContext(Context);


  // useEffect para establecer la vista por defecto al montar el componente
  useEffect(() => {
    // Solo establecer la vista por defecto si no hay una vista seleccionada
    if (!store.vistaProfile) {
      actions.setVistaElement("Photos");
    }
  }, [store.vistaProfile]); // Ejecutar el efecto cuando store.vistaProfile cambie


  const renderComponent = () => {
    switch (store.vistaProfile) {
      case "Photos": // Cambiado de "Logros" a "logros"
        return (testData1.map((data, index) => <PhotoCard key={index} {...data} />));
      case "Logros": // Cambiado de "Logros" a "logros"
        return <Logros />;
      case "Eventos": // Cambiado de "Eventos" a "eventos"
        return <Eventos />;
      case "Status": // Cambiado de "Status" a "status"
      // return <Status />;
      case "Favoritos": // Cambiado de "Favoritos" a "favoritos"
      // return <Favoritos />;
      default:
        return null;
    }
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
          <Link to="#" onClick={() => actions.setVistaElement("Photos")}>
            <span className="select">Fotos</span>
          </Link>
        </li>
        <li className={`list-group-item d-flex justify-content-between select`}>
          <Link to="#" onClick={() => actions.setVistaElement("Eventos")}>
            <span className="select">Eventos</span>
          </Link>
        </li>
        <li className={`list-group-item d-flex justify-content-between select`}>
          <Link to="#" onClick={() => actions.setVistaElement("Logros")}>
            <span className="select">Logros</span>
          </Link>
        </li>
      </ul>
      <div className="bg-dark d-flex justify-content-evenly flex-wrap pt-3">
        {renderComponent()}
      </div>
      <br />
      <Link to="/">
        <button className="btn btn-primary">Volver a inicio</button>
      </Link>
    </div>
  );
};