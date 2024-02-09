import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const ScrollToTopButton = () => {
    const scroll = () => {
        window.scrollTo({
            top: 0,
            behavior: "auto" // Animación suave al hacer scroll
        });
    };

    return (
        <button className="btn btn-primary" onClick={scroll}>
            Subir al principio
        </button>
    );
};


export const GoBackButton = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Función para volver a la página anterior en el historial
    };

    return (
        <button className="btn btn-outline-light go-back-btn" onClick={goBack}>
            <i className=" pe-2 fa-solid fa-chevron-left"></i>Volver
        </button>
    );
};