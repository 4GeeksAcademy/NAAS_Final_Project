import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { PhotoCard } from "../component/photoCard";
import { testData1, testData4, testData5, testData6 } from "../component/testData";

export const Galeria = () => {
  const { store, actions } = useContext(Context);

  // Combina los datos de testData1, testData4 y testData5 en un solo array
  const allPhotos = [...testData1, ...testData4, ...testData5, testData6];

  // Define el número de tarjetas por fila y tarjetas por página
  const cardsPerRow = 3;
  const cardsPerPage = 15;

  // Estado para mantener el índice de la página actual
  const [currentPage, setCurrentPage] = useState(1);

  // Calcula el índice de inicio y fin para el lote actual
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  // Filtra las fotos para mostrar solo el lote actual
  const currentPhotos = allPhotos.slice(startIndex, endIndex);

  // Función para cambiar a la siguiente página
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Función para cambiar a la página anterior
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  
  return (
    <div className="container-fluid color-back">
      <div className="container-fluid color-back d-flex-column p-5 color-text">
        <h1 className="text-center pt-2">Navegar En La Galeria</h1>
        <h3 className="text-center pt-2">Explore más de 50.000 Fotografías en nuestra galeria libre</h3>
        <form class=" container-fluid pt-2 pb-5 d-flex w-75 text-center justtify-align-center">
        <input class="form-control m-0" type="search" placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-success ms-3" type="submit">Search</button>
        </form>
      </div>
        <div className="container-fluid color-back2 p-2">
          <div className="row justify-content-center">
            {currentPhotos.map((data, index) => (
              <div key={index} className={`col-md-${12 / cardsPerRow} mb-4`}>
                <PhotoCard {...data} style={{ maxWidth: "100%" }} />
              </div>
            ))}
          </div>
        </div>
        <nav aria-label="Page navigation example" className="p-5">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 && "disabled"}`}>
              <a className="page-link" href="#" tabIndex="-1" aria-disabled="true" onClick={prevPage}>
                Anterior
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" onClick={() => setCurrentPage(1)}>
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" onClick={() => setCurrentPage(2)}>
                2
              </a>
            </li>
            {/* Agrega más elementos de paginación según sea necesario */}
            <li className={`page-item ${endIndex >= allPhotos.length && "disabled"}`}>
              <a className="page-link" href="#" onClick={nextPage}>
                Siguiente
              </a>
            </li>
          </ul>
        </nav>
    </div>
  );
};