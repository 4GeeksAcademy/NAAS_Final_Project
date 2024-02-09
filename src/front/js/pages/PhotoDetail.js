import React, { useContext, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import checkTokenAndRedirect from "../utils/checkToken"

const PhotoDetail = () => {
    const { photoUrl, name, description } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = () => {
            const token = sessionStorage.getItem('token'); // Obtener el token aquí
            const isValidToken = checkTokenAndRedirect(token);
            if (!isValidToken) {
                toast.error('¡Debe volver a iniciar sesión!');
                navigate('/login');
            }
        };

        checkToken();
    }, []);

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
