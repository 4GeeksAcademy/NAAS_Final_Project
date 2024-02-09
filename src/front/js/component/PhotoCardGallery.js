import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const PhotoCardGallery = () => {
  const { store, actions } = useContext(Context);
  const [likes, setLikes] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(store.isUserLoggedIn);
  const [likedPhotos, setLikedPhotos] = useState([]);
  const [userNames, setUserNames] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        await actions.getAllPhotosWithData();
        const initialLikes = {};
        store.allPhotosData.forEach(photo => {
          initialLikes[photo.id] = photo.like;
          // Llama a getUserDataById para obtener el nombre de usuario correspondiente a cada foto
          actions.getUserDataById(photo.user_id);
        });
        setLikes(initialLikes);

        const storedLikedPhotos = JSON.parse(localStorage.getItem('likedPhotos'));
        if (storedLikedPhotos) {
          setLikedPhotos(storedLikedPhotos);
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Actualiza el estado userNames cuando se obtengan los datos del usuario
    if (store.userDataById.username) {
      setUserNames(prevState => ({
        ...prevState,
        [store.userDataById.id]: store.userDataById.username
      }));
    }
  }, [store.userDataById]);

  const handleLikeClick = async (photoId) => {
    try {
      if (!likedPhotos.includes(photoId)) {
        setLikedPhotos([...likedPhotos, photoId]);
        localStorage.setItem('likedPhotos', JSON.stringify([...likedPhotos, photoId]));
      }

      setLikes(prevLikes => ({
        ...prevLikes,
        [photoId]: prevLikes[photoId] + 1
      }));

      await actions.updatePhotoLikes(photoId, { like: likes[photoId] + 1 });
    } catch (error) {
      console.error("Error updating photo likes:", error);
    }
  };

  return (
    <div className="photo-card-container">
      {store.allPhotosData.map(photo => (
        <div className="card" key={photo.id}>
          <img src={photo.img_url} className="card-img-top" alt={photo.name} />
          <div className="card-body">
            <h5 className="card-title">{photo.name}</h5>
            {/* Muestra el nombre del propietario obtenido del estado userNames */}
            <p>Owner: {userNames[photo.user_id]}</p>
            {isLoggedIn && (
              <div className="buttons d-flex justify-content-between mt-1">
                {!likedPhotos.includes(photo.id) && (
                  <button
                    onClick={() => handleLikeClick(photo.id)}
                    type="button"
                    className="btn p-1 border-1 btn-outline-success"
                  >
                    Like ({likes[photo.id]})
                  </button>
                )}
              </div>
            )}
            <p>Votos: {photo.like}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
