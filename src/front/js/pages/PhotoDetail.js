import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { useParams } from 'react-router-dom';
import { testData1, testData3 } from '../component/testData'

export const PhotoDetail = () => {
    const { store, actions } = useContext(Context);
    const { index } = useParams(); // Obtener el índice de la URL
    const indexInt = parseInt(index);
    const photoData = testData1[indexInt];

    if (!photoData) {
        console.error('No se encontró información para el índice dado');
        return null;
    }

    const { photoUrl, name, photo, likes: initialLikes } = photoData;
    const [photoLikes, setPhotoLikes] = useState(initialLikes); // Estado local para los likes de la foto

    useEffect(() => {
        // Obtener los likes actualizados del contexto global
        const likes = store.likes.find(like => like.index === indexInt);
        if (likes) {
            setPhotoLikes(likes.likes); // Actualizar el estado local con los likes si están disponibles en el contexto global
        }
    }, [store.likes, indexInt]);

    return (
        <div className="container mobile-column vista">
            <div className="row">
                <div className="col-md-12">
                    {/* Imagen de la foto */}
                    <img src={photoUrl} className="img-detail img-fluid" alt="Photo" />
                </div>
            </div>
            <div className="row mt-4 my-3 py-3">
                <div className="col-md-12 color-text my-2 mb-5">
                    {/* Detalles de la foto */}
                    <h2 className="color-text2">Nombre de la foto: {photo}</h2>
                    <h3>Cantidad de votos: {photoLikes}</h3>
                    <div className="container d-flex align-items-center">
                        <img
                            style={{ width: "10%" }}
                            className="h-25 rounded-circle"
                            src={testData3[1].fotoUrl}
                            alt="Avatar"
                        />
                        <h3 className="color-text2 ps-3">Artista {name}</h3>
                    </div>
                    {/* Aquí puedes agregar más detalles según tus necesidades */}
                </div>
                <div className="col-md-12 color-text mb-5 ">
                    <h2 className="mb-2">Descripción: </h2>
                    <h3>
                        En el centro de la fotografía, un paisaje encantador se despliega ante nuestros ojos, capturando la esencia misma de la belleza natural. Los tonos cálidos del atardecer pintan el cielo con pinceladas de naranja, rosa y dorado, creando un espectáculo celestial que se refleja en las tranquilas aguas de un lago sereno.
                    </h3>
                    <h3>
                        Las montañas distantes se perfilan contra el horizonte, envueltas en una suave neblina que añade un toque de misterio a la escena. Sus picos se tiñen de tonos morados y azules a medida que se funden con el cielo, creando un efecto visual fascinante.
                    </h3>
                    <h3>
                        En primer plano, un prado verde y exuberante se extiende hasta la orilla del lago, salpicado de flores silvestres de colores vibrantes. El sol poniente ilumina cada detalle con una luz dorada y suave, realzando los tonos naturales y creando sombras suaves que dan profundidad a la imagen.
                    </h3>
                    <h3>
                        En conjunto, la fotografía evoca una sensación de paz y serenidad, transportando al espectador a un lugar de ensueño donde la belleza de la naturaleza se revela en toda su gloria. Es un momento efímero capturado para la eternidad, que invita a detenerse y contemplar la maravilla del mundo que nos rodea.
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default PhotoDetail;
