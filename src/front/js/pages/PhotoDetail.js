import React from 'react';
import { useParams } from 'react-router-dom';

const PhotoDetail = () => {
    const { photoUrl, name, description } = useParams();

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    {/* Imagen de la foto */}
                    <img src={decodeURIComponent(photoUrl)} className="img-detail img-fluid" alt="Photo" />
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-12">
                    {/* Detalles de la foto */}
                    <h2>{decodeURIComponent(name)}</h2>
                    <p>{decodeURIComponent(description)}</p>
                    {/* Aquí puedes agregar más detalles según tus necesidades */}
                </div>
            </div>
        </div>
    );
};

export default PhotoDetail;
