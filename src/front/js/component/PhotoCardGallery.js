import React, { useContext,useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { testData3 } from "./testData";

export const PhotoCardGallery = () => {
    const { store, actions } = useContext(Context)
    const [userNames, setUserNames] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                await actions.getAllPhotosWithData();
                store.allPhotosData.forEach(photo => {
                    actions.getUserDataById(photo.user_id);
                });
            
            } 
            catch (error) {
                console.error("Error fetching photos:", error);
            }
        };
    
        fetchData();
       
    }, []);

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
        {store.allPhotosData.map((photo, index) => (
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
                            <i className={`far fa-thumbs-up `}></i> Like
                        </button>
                        <button type="button" className={`btn p-1 border-2`}>
                            <i className="far fa-heart"></i> Favorito
                        </button>
                    </div>
                    <div className="d-flex justify-content-between mt-3 color-text">
                        {/* Contadores de Likes y Favoritos */}
                        <p>Likes: </p>
                        <p>Favorites: </p>
                    </div>
                </div>
            </div>
        ))}
        {/* Mensaje si no hay fotos subidas */}
        {store.allPhotosData.length === 0 && (
            <div className="text-center mt-5">
                <p style={{ color: "white" }}>Aún no tienes fotos subidas</p>
            </div>
        )}
    </div>
    )
}