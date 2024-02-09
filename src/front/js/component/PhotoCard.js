import React, { useContext, useEffect, useState } from "react";
import { testData3 } from "./testData";
import PropTypes from "prop-types";
import { Context } from "../store/appContext"
import { Link } from "react-router-dom";

export const PhotoCard = (props) => {
  const { store, actions } = useContext(Context);
  const [favoriteCount, setFavoriteCount] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(store.isUserLoggedIn);

  useEffect(() => {
    setFavoriteCount(store.cardFavorites[props.index] || 0);
    setIsLiked(store.likes && store.likes.some((like) => like.index === props.index));
    setIsLoggedIn(store.isUserLoggedIn);
  }, [store.cardFavorites, store.likes, props.index, store.isUserLoggedIn]);

  const handleFavoriteClick = () => {
    actions.addFavoritePhoto({
      photo: props.photo,
      name: props.name,
      index: props.index,
      photoUrl: props.photoUrl,
      likes: props.likes,
      favorites: props.favorites + 1,
    });
  };

  const handleLikeClick = () => {
    if (!isLiked && !isOwnPhoto()) { // Verifica si la imagen es del usuario actual
      actions.addLikePhoto({
        photo: props.photo,
        name: props.name,
        index: props.index,
        likes: props.likes + 1,
        favorites: props.favorites,
        photoUrl: props.photoUrl,
      });
      setIsLiked(true);
    }
  };

  // Función para verificar si la imagen es del usuario actual
  const isOwnPhoto = () => {
    return store.userData.id === props.userId;
  };

  useEffect(() => {
    const fetchUserDataAndPhotos = async () => {
      try {
        const userId = store.userData.id;
        if (!userId) {
          console.error("User ID not found");
          return;
        }
        await actions.getUserPhotosData(userId);
      } catch (error) {
        console.error("Error fetching user data and photos:", error);
      }
    };
    if (store.userData.id) {
      fetchUserDataAndPhotos();
    } else {
      actions.getUserData();
    }
  }, [store.userData.id]);

  return (
    <div className="d-flex justify-content-center bg-gra mx-5">
      {store.userPhotosData.map((photo, index) => (
        <div key={index} className="card m-5 photo-card">
          <Link to={`/photo-detail/${encodeURIComponent(index)}`} className="photo-link">
            <img src={photo.img_url} className="card-img-top photo" alt={`Photo ${index}`} />
          </Link>
          <div className="card-body color-back px-3">
            <h4 className="m-0 color-text">{photo.name} </h4>
            <div className="d-flex align-items-center">
              <img
                style={{ width: "20%" }}
                className="h-25 rounded-circle"
                src={testData3[1].fotoUrl}
                alt="Avatar"
              />
              <h5 className="card-title p-3 color-text ">{store.userData.username}</h5>
            </div>
            
            <div className="d-flex justify-content-between mt-1 color-text">
              <p>Votos: {photo.like}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

PhotoCard.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  favorites: PropTypes.number.isRequired,
  photoUrl: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired, // Agrega la prop userId
};


