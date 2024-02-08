import React, { useContext, useEffect, useState } from "react";
import { testData3 } from "./testData";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const PhotoCardRanking = (props) => {
  const { store, actions } = useContext(Context);
  const [favoriteCount, setFavoriteCount] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setFavoriteCount(store.cardFavorites[props.index] || 0);
    setIsLiked(store.likes && store.likes.some((like) => like.index === props.index));
  }, [store.cardFavorites, store.likes, props.index]);


  return (
    <div className="container d-flex justify-content-beetwen mobile-column">
      <div className="container div-rank mobile-column justify-content-start">
        <Link to={`/photo-detail/${encodeURIComponent(props.index)}`} className="photo-link p-1 m-0">
          <img src={props.photoUrl} className="img-rank mx-5" alt="Photo" />
        </Link>
            <img
              className=" img-rank1 rounded-circle"
              src={testData3[1].fotoUrl}
              alt="Avatar"
              />
            <h4 className="card-title p-1 color-text m-0 mx-2">Artista: {props.name}</h4>
              <div className="container d-flex justify-content-end">

        <h4 className="color-text p-1 m-0">Nombre de la foto: {props.photo}</h4>
            {/* Contador de Likes */}
            <div className="d-flex">
            <h4 className="p-1 m-0 ms-5">Votos: {isLiked ? props.likes + 1 : props.likes}</h4>
              </div>
            </div>
        
        </div>
    </div>
  );
};

PhotoCardRanking.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photoUrl: PropTypes.string.isRequired, // Asegúrate de incluir photoUrl en las PropTypes
};
