import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { PhotoCard } from "./photoCard";

export const Favoritos = ({ favorites }) => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <h1>Mis Fotos Favoritas</h1>
      <div className="row d-flex justify-content-between">
        {favorites.map((fav, index) => (
          <div key={index} className="col-md-3 mb-4">
            <PhotoCard
              photo={fav.photo}
              name={fav.name}
              index={fav.index}
              likes={fav.likes}
              favorites={fav.favorites}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
