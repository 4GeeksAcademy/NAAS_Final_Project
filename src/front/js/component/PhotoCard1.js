import React, { useContext, useEffect, useState } from "react";
import { testData3 } from "./testData";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const PhotoCard1 = (props) => {
  const { store, actions } = useContext(Context);
  const [favoriteCount, setFavoriteCount] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(store.isUserLoggedIn); // Obtener el estado de autenticación del almacén

  useEffect(() => {
    setFavoriteCount(store.cardFavorites[props.index] || 0);
    setIsLiked(store.likes && store.likes.some((like) => like.index === props.index));
    
    // Actualizar el estado de isLoggedIn cuando cambie en el almacén
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
    if (!isLiked) {
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

  return (
    <div className="d-flex justify-content-center bg-gra">
      <div className="card photo-card">
        <Link to={`/photo-detail/${encodeURIComponent(props.index)}`} className="photo-link">
          <img src={props.photoUrl} className="card-img-top photo" alt="Photo" />
        </Link>

        <div className="card-body color-back px-3">
          <h4 className="m-0 color-text">{props.photo}</h4>

          <div className="d-flex align-items-center">
            <img
              style={{ width: "20%" }}
              className="h-25 rounded-circle"
              src={testData3[1].fotoUrl}
              alt="Avatar"
            />
            <h5 className="card-title p-3 color-text ">{props.name}</h5>
          </div>
          
          {/* Renderizar los botones solo si el usuario está logueado */}
          {isLoggedIn && (
            <div className="buttons d-flex justify-content-between mt-1">
              {!isLiked && (
                <button
                  onClick={handleLikeClick}
                  type="button"
                  className="btn p-1 border-1 btn-outline-success"
                >
                  <i className="far fa-thumbs-up"></i> Votar
                </button>
              )}
              <button
                onClick={handleFavoriteClick}
                type="button"
                className={`btn p-1 border-1 ${store.favorites.some((fav) => fav.index === props.index)
                  ? "btn-danger"
                  : "btn-outline-success"}`}
              >
                <i className="far fa-heart"></i> Favorito
              </button>
            </div>
          )}

          <div className="d-flex justify-content-between mt-1 color-text">
            <p>Votos: {isLiked ? props.likes + 1 : props.likes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

PhotoCard1.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  favorites: PropTypes.number.isRequired,
  photoUrl: PropTypes.string.isRequired,
};
