import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { PhotoCard } from "./PhotoCard";

export const Favoritos = ({ favorites }) => {
  const { store, actions } = useContext(Context);

  const handleLikeClick = (index) => {
    // Incrementa el contador de likes en 1
    const updatedLikes = store.likes.some((like) => like.index === index)
      ? store.likes
      : [...store.likes, { index }];

    const updatedCardLikes = {
      ...store.cardLikes,
      [index]: updatedLikes.filter((like) => like.index === index).length,
    };

    // Actualiza el estado global de likes en el contexto
    actions.addLikePhoto({
      photo: favorites[index].photo,
      name: favorites[index].name,
      index: favorites[index].index,
      likes: favorites[index].likes + 1, // Incrementa el número de likes en 1
      favorites: favorites[index].favorites,
      photoUrl: favorites[index].photoUrl,
    });

    setStore({
      likes: updatedLikes,
      cardLikes: updatedCardLikes,
    });
  };

  return (
    <div className="container mobile-column vista color-text">
      <div className="d-flex justify-content-center m-2">
        <h1>Mis Fotos Favoritas</h1>
      </div>
      <div className="d-flex justify-content-between">
        {favorites.map((fav, index) => (
          <div key={index} className="">
            {/* Pasa la URL de la imagen del favorito al componente PhotoCard */}
            <PhotoCard
              photo={fav.photo}
              name={fav.name}
              index={fav.index}
              likes={fav.likes}
              favorites={fav.favorites}
              photoUrl={fav.photoUrl} // Nueva prop para la URL de la imagen
              // Pasa el contador local
              favoriteCount={store.cardFavorites[fav.index] || 0}
              // Pasa la función para manejar el clic de "Like"
              handleLikeClick={() => handleLikeClick(fav.index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

