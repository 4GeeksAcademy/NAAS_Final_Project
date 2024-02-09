import React, { useContext,useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { testData3 } from "./testData";

export const PhotoCardEvents = ({ event_id }) => {
    const { store, actions } = useContext(Context)
    const [userNames, setUserNames] = useState({});


    useEffect(() => {
        const fetchEventPhotos = async () => {
            try {
                // Limpia el estado de store.eventPhotos antes de cargar las fotos del nuevo evento
                actions.setEventPhotos([]);

                // Obtén las fotos del nuevo evento
                await actions.getEventPhotos(event_id);
                store.eventPhotos.forEach(photo => {
                    actions.getUserDataById(photo.user_id);
                });
            


            } catch (error) {
                console.error("Error fetching event photos:", error);
            }
        };

        fetchEventPhotos();
    }, [event_id]);

    useEffect(() => {
        // Actualizar el estado userNames cuando se obtengan los datos del usuario
        if (store.userDataById.username) {
            setUserNames(prevState => ({
                ...prevState,
                [store.userDataById.id]: store.userDataById.username
            }));
        }
    }, [store.userDataById]);


    return (
        <div className="d-flex justify-content-center mx-2 bg-gra" style={{ gap: "20px", flexWrap: "wrap" }}>
        {store.eventPhotos.length > 0 ? (
            store.eventPhotos.map((photo, index) => (
                <div className="card mb-2" style={{ width: "17rem" }} key={index}>
                    <img src={photo.img_url} className="card-img-top" alt={photo.name} />
                    <div className="card-body color-back px-3">
                        <h4 className="color-text">{photo.name}</h4>
                        <div className="d-flex align-items-center">
                            <img
                                style={{ width: "20%" }}
                                className="h-25 rounded-circle"
                                src={testData3[1].fotoUrl}
                                alt="Avatar"
                            />
                            <h5 className="card-title p-3 color-text">{userNames[photo.user_id]}</h5>
                        </div>
                        <div className="buttons d-flex justify-content-between mt-1">
                            {/* Botones de Like y Favorito */}
                            <button type="button" className={`btn p-1 border-2`}>
                                <i className={`far fa-thumbs-up `}/> Like
                            </button>
                            <button type="button" className={`btn p-1 border-2`}>
                                <i className="far fa-heart"/> Favorito
                            </button>
                        </div>
                        <div className="d-flex justify-content-between mt-3 color-text">
                            {/* Contadores de Likes y Favoritos */}
                            <p>Likes: </p>
                            <p>Favorites: </p>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <p style={{color: "white"}}>No hay fotos disponibles para este evento</p>
        )}
    </div>
);
}