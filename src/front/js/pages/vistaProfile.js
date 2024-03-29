import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { PhotoCard } from "../component/PhotoCard";
import { Logros } from "../component/logros";
import { Eventos } from "../component/Eventos";
import { Favoritos } from "../component/Favoritos";

import { PhotosUser } from "../component/photosUser";
import { testData1, testData3 } from "../component/testData";

import PersonalDataForm from "../component/PersonalDataForm";

export const VistaProfile = () => {
  const { store, actions } = useContext(Context);
  const [UserData, setUserData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    phone: "",
    country: "",
    email: ""
  });

  // useEffect para establecer la vista por defecto al montar el componente
  useEffect(() => {
    // Solo establecer la vista por defecto si no hay una vista seleccionada
    if (!store.vistaProfile) {
      actions.setVistaElement("Photos");
    }
  }, [store.vistaProfile]); // Ejecutar el efecto cuando store.vistaProfile cambie

  useEffect(() => {
    const fetchData = async () => {
      try {
        await actions.getUserData();
        setUserData(store.userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [store.dataUser]);



  const renderComponent = () => {
    switch (store.vistaProfile) {
      case "Photos": // Cambiado de "Logros" a "logros"

        return <PhotoCard />;

        

      case "Logros": // Cambiado de "Logros" a "logros"
        return <Logros />;
      case "Eventos": // Cambiado de "Eventos" a "eventos"
        return <Eventos />;
      case "Status": // Cambiado de "Status" a "status"
      // return <Status />;
      
      case "PersonalDataForm": // Cambiado de "Eventos" a "eventos"
      return <PersonalDataForm />;
      case "Favoritos": // Cambiado de "Favoritos" a "favoritos"
      return <Favoritos favorites={store.favorites} />;
      default:
        return null;
    }
  };


  return (
    <div className="container-fluid color-back mobile-column vista">
      <div>
        <img className="banner" src={testData3[2].fotoUrl} alt="Banner" />
      </div>
      <div className="mobile-column d-flex align-items-center justify-content-between">
      <div className="mobile-column d-flex align-items-center">
        <img className="avatar no-mar" src={testData3[1].fotoUrl} alt="Avatar" />
        <div className="">
       <h2 className="color-text">{UserData.firstname }</h2>
        <Link to="/photo-uploader">
                    <button
                        type="button"
                        className="btn brd color-call color-text">
                        <i className="pe-2 fa-solid fa-rocket"></i>Subir foto
                    </button>
                    </Link>
        </div>
      
        <button onClick={() => actions.toggleStatus()}className={`nav-link ${store.statusActive ? 'text-danger' : 'text-success'}`} aria-current="page">
          <i className={`pe-2 fa-solid fa-user-clock ${store.statusActive ? 'text-danger' : 'text-success'}`}></i>Status
        </button>
      </div>
      
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

    </div>
  );
};