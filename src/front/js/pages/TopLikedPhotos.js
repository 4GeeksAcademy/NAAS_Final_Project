import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { PhotoCard } from "../component/PhotoCard";
import { PhotoCardRanking } from "../component/PhotoCardRanking";

export const TopLikedPhotos = () => {
  const { store, actions } = useContext(Context);

  // Ordena las fotos por cantidad de likes en orden descendente
  const sortedPhotos = [...store.top];

  // Ordena las fotos por cantidad de likes en orden descendente
  sortedPhotos.sort((a, b) => b.likes - a.likes);

  // Toma las primeras 10 fotos después de ordenarlas
  const topTenPhotos = sortedPhotos.slice(0, 10);

  // Cuando el componente se monta, carga los datos de testData1 en el almacén
  useEffect(() => {
    actions.loadTestData1();
}, []);

  return (
    <div className="container d-flex-column mobile-column vista">
      <h1 className="text-center color-text">Top 10 Fotos Más Votadas</h1>
      <div className="m-2">
        {topTenPhotos.map((photo, index) => (
          <div key={index} className="container d-flex mobile-column justify-content-center">
            {/* Mostrar cada foto usando el componente PhotoCard */}
            <PhotoCardRanking
              photo={photo.photo}
              name={photo.name}
              index={photo.index}
              likes={photo.likes}
              photoUrl={photo.photoUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
