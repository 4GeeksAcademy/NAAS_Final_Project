import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { PhotoCard } from "./PhotoCard";

export const PhotosUser = () => {
    const { store, actions } = useContext(Context);

    /* useEffect(() => {
        actions.getPhotosByUser(); // Llama a la acción para obtener las fotos del usuario
    }, []); */

    return (
        <div className="container">
            <h1>Mis Fotos</h1>
            {/* <div className="row">
                //{store.photosUser.map((photo, index) => (
                    <div key={index} className="col-md-4">
                        <PhotoCard
                            photo={photo}
                            // Pasa las propiedades necesarias al componente PhotoCard
                        />
                    </div>
                ))}
            </div> */}
        </div>
    );
};
