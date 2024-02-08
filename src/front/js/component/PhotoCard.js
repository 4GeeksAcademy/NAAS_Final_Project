import React, { useContext, useEffect, useState } from "react";
import { testData3 } from "./testData";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const PhotoCard = (props) => {
  const { store, actions } = useContext(Context);
  const [favoriteCount, setFavoriteCount] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setFavoriteCount(store.cardFavorites[props.index] || 0);
    setIsLiked(store.likes && store.likes.some((like) => like.index === props.index));
  }, [store.cardFavorites, store.likes, props.index]);

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
    if (!isLiked) { // Asegurarse de que no se haya dado like antes
      actions.addLikePhoto({
        photo: props.photo,
        name: props.name,
        index: props.index,
        likes: props.likes + 1, // Incrementa el número de likes en 1
        favorites: props.favorites,
        photoUrl: props.photoUrl,
      });

      setIsLiked(true); // Cambia el estado para que el botón de like desaparezca
    }
  };

  return (
    <div className="d-flex justify-content-center bg-gra">
      <div className="card" style={{ width: "17rem" }}>
        <Link to={`/photo-detail/${encodeURIComponent(props.index)}`} className="photo-link">
          <img src={props.photoUrl} className="card-img-top" alt="Photo" />
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
          <div className="buttons d-flex justify-content-between mt-1">
            {/* Botón de Like */}
            {!isLiked && ( // Mostrar botón de Like solo si no está marcado como liked
              <button
                onClick={handleLikeClick}
                type="button"
                className="btn p-1 border-1 btn-outline-success"
              >
                <i className="far fa-thumbs-up"></i> Votar
              </button>
            )}
            {/* Botón de Favorito */}
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

          <div className="d-flex justify-content-between mt-1 color-text">
            {/* Contador de Likes */}
            <p>Likes: {isLiked ? props.likes + 1 : props.likes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

PhotoCard.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  favorites: PropTypes.number.isRequired,
  photoUrl: PropTypes.string.isRequired, // Asegúrate de incluir photoUrl en las PropTypes
};
