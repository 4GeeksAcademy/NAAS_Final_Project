import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const CategoryCard = (props) => {
  const { store, actions } = useContext(Context);

  // Estilo para la imagen de fondo
  const backgroundStyle = {
    backgroundImage: `url(${props.backUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "320px", // Ajusta la altura según sea necesario
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    borderRadius: "20px",
  };

  return (
    <div className="mx-3 color-back">
      <div className="card mb-2 color-back2" style={{ width: "14rem" }}>
        {/* Establecer la imagen de fondo */}
        <div style={backgroundStyle}>{/* Ícono superpuesto */}
            <i className={`rounded-circle fa-solid ${props.icon}`} style={{ fontSize: "100px", color: "white", position: "absolute", zIndex: 999 }}></i></div>
        <div className="card-body color-back px-4" style={{ position: "absolute", bottom: "0", width: "100%" }}>
          <div className="d-flex-column text-center align-items-center">
            
            <h4 className="card-title color-text ">{props.name}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

CategoryCard.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  backUrl: PropTypes.string.isRequired,
};