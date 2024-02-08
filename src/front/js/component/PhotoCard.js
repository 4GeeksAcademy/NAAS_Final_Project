import React, { useContext, useEffect, useState } from "react";
import { testData3 } from "./testData";
import PropTypes from "prop-types";
import { Context } from "../store/appContext"
import { Link } from "react-router-dom";

export const PhotoCard = (props) => {
  const { store, actions } = useContext(Context);

 

  useEffect(() => {
    const fetchUserDataAndPhotos = async () => {
      try {
        const userId = store.userData.id;
        console.log(store.userData.id)
        if (!userId) {
          console.error("User ID not found");
          return;
        }
        
        await actions.getUserPhotosData(userId);
        console.log(store.userPhotosData);
      } catch (error) {
        console.error("Error fetching user data and photos:", error);
      }
    };
    
    // Si store.userData.id está definido, entonces llamar a fetchUserDataAndPhotos
    if (store.userData.id) {
      fetchUserDataAndPhotos();
    } else {
      // Si userData.id no está definido, llamar a getUserData para obtenerlo
      actions.getUserData();
    }
  }, [store.userData.id]);

  return (

    <div className="d-flex justify-content-center mx-2 bg-gra" style={{gap:"20px", flexWrap: "wrap"}}>
     {store.userPhotosData.map((photo, index) => (
      <div key={index} className="card mb-2" style={{ width: "17rem" }}>
        <img src={photo.img_url} className="card-img-top" alt={`Photo ${index}`} />
        <div className="card-body color-back px-3">
        <h4 className="color-text">{photo.name} </h4>

          <div className="d-flex align-items-center">
            <img
              style={{ width: "20%" }}
              className="h-25 rounded-circle"
              src={testData3[1].fotoUrl}
              alt="Avatar"
            />
            <h5 className="card-title p-3 color-text ">{store.userData.username}</h5>
          </div>
          <div className="buttons d-flex justify-content-between mt-1">
            {/* Botón de Like */}
            <button
              // onClick={handleLikeClick}
              type="button"

              className={`btn p-1 border-2`}

            >
              <i className={`far fa-thumbs-up `}></i> Like
            </button>
            {/* Botón de Favorito */}
            <button
              // onClick={handleFavoriteClick}
              type="button"

              className={`btn p-1 border-2`}

            >
              <i className="far fa-heart"></i> Favorito
            </button>
          </div>

  
          <div className="d-flex justify-content-between mt-3 color-text">

            {/* Contador de Likes */}
            <p>Likes: </p>
  
            {/* Contador de Favoritos */}
            <p>Favorites: </p>
          </div>
        </div>
      </div>
    ))}
  </div>
  
  );
};


// PhotoCard.propTypes = {
//   photo: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   likes: PropTypes.number.isRequired,
//   favorites: PropTypes.number.isRequired,
//   photoUrl: PropTypes.string.isRequired, // Asegúrate de incluir photoUrl en las PropTypes
// };


// PhotoCard.defaultProps = {
//   likes: 0,
//   favorites: 0,
// };

