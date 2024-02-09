import React, { useContext, useEffect, useState } from "react";
import { testData3 } from "./testData";
import PropTypes from "prop-types";
import { Context } from "../store/appContext"
import { Link } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap'

export const PhotoCard = (props) => {
  const { store, actions } = useContext(Context);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [photoToDeleteId, setPhotoToDeleteId] = useState(null); 


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
    if (store.userData.id ) {
      fetchUserDataAndPhotos();
    } else {
      // Si userData.id no está definido, llamar a getUserData para obtenerlo
      actions.getUserData();
    }
  }, [store.userData.id]);

   
   const handleShowDeleteModal = (photoId) => {
    setPhotoToDeleteId(photoId);
    setShowDeleteModal(true);
  };


  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setPhotoToDeleteId(null);
  };

 
  const handleDeletePhoto = async () => {
    try {
      await actions.deletePhotoById(photoToDeleteId);
      const updatedUserPhotosData = store.userPhotosData.filter(photo => photo.id !== photoToDeleteId);
      actions.setUserPhotosData(updatedUserPhotosData);
     
      handleCloseDeleteModal();
    } catch (error) {
      console.error('Error deleting photo:', error);
     
    }
  };
  return (

    <div className="d-flex justify-content-center mx-2 bg-gra" style={{gap:"20px", flexWrap: "wrap"}}>
    {store.userPhotosData.length > 0 ? (
     store.userPhotosData.map((photo, index) => (
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
            <button onClick={() => handleShowDeleteModal(photo.id)} className="btn btn-danger">
                    <i className="fa-solid fa-trash-alt"></i>
                  </button>
        </div>
      </div>
    ))) : (
      <div className="text-center mt-5">
                <p style={{color: "white"}}>Aún no tienes fotos subidas</p>
            </div>
    )}
     <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar foto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar esta foto?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeletePhoto}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
  </div>
  
  );
};




