import React, { useContext, useEffect, useState } from "react";
import { testData3 } from "./testData";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const PhotoCard = (props) => {
  const { store, actions } = useContext(Context);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

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
    actions.addLikePhoto({
      photo: props.photo,
      name: props.name,
      index: props.index,
      likes: isLiked ? props.likes - 1 : props.likes + 1,
      favorites: props.favorites,
      photoUrl: props.photoUrl,
    });
  };

  useEffect(() => {
    setFavoriteCount(store.cardFavorites[props.index] || 0);
    setLikeCount(store.cardLikes[props.index] || 0);
    setIsLiked(store.likes && store.likes.some((like) => like.index === props.index));
  }, [store.cardFavorites, store.cardLikes, store.likes, props.index]);


  return (
    <div className="d-flex justify-content-center bg-gra">
      <div className="card" style={{ width: "17rem" }}>
        <img src={props.photoUrl} className="card-img-top" alt="Photo" />

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
            <button
              onClick={handleLikeClick}
              type="button"
              className={`btn p-1 border-1 ${isLiked ? "btn-danger" : "btn-outline-success"}`}
            >
              <i className={`far fa-thumbs-up ${isLiked ? "text-danger" : ""}`}></i> Like
            </button>
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
            <p>Likes: {likeCount}</p>

            {/* Contador de Favoritos */}
            <p>Favorites: {favoriteCount}</p>
          </div>

        </div>
      </div>
    </div >
  );
};

PhotoCard.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  favorites: PropTypes.number.isRequired,
  photoUrl: PropTypes.string.isRequired, // Asegúrate de incluir photoUrl en las PropTypes
};


PhotoCard.defaultProps = {
  likes: 0,
  favorites: 0,
};