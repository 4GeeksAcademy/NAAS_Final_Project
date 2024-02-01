import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { PhotoCard } from "../component/photoCard";
import { testData1, testData4, testData5 } from "../component/testData";

export const Galeria = () => {
  const { store, actions } = useContext(Context);

  // Combina los datos de testData1, testData4 y testData5 en un solo array
  const allPhotos = [...testData1, ...testData4, ...testData5];

  return (
    <div>
      <h1>Galeria</h1>
      <div className="bg-dark d-flex justify-content-evenly flex-wrap pt-3">
        {allPhotos.map((data, index) => (
          <PhotoCard key={index} {...data} />
        ))}
      </div>
    </div>
  );
};
